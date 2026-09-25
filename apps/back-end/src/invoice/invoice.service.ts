import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ListInvoicesDto } from './dto/list-invoices.dto';
import { Invoice } from './invoice.entity';
import { InvoiceDocument, formatMoney, renderInvoicePdf } from './invoice-pdf';
import { deleteInvoiceFile, readInvoiceFile, writeInvoiceFile } from './invoice-storage';
import { BUSINESS, GST_RATE } from './invoice.constants';

/** A rendered invoice PDF and the metadata the controller needs to serve it. */
export interface GeneratedInvoice {
  invoiceNumber: string;
  fileName: string;
  pdf: Buffer;
  total: number;
}

/** One row in the invoice history list. */
export type InvoiceSummary = Pick<
  Invoice,
  'id' | 'invoiceNumber' | 'clientName' | 'clientEmail' | 'invoiceDate' | 'total' | 'emailedAt' | 'createdAt'
>;

/** A page of invoice history. */
export interface InvoicePage {
  items: InvoiceSummary[];
  total: number;
  page: number;
  pageSize: number;
}

/** Rounds to whole cents. */
function toCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Turns a client name into a filename-safe segment, e.g. "Jane O'Brien" -> "Jane-OBrien".
 *
 * @param {string} clientName - The client's name.
 * @returns {string} The slug, at most 50 characters.
 */
export function slugifyClientName(clientName: string): string {
  return clientName
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

/**
 * Generates Falcon Access invoices as PDFs, emails them to clients, and keeps a history.
 *
 * Sent invoices are recorded in Postgres and their PDFs written to invoice storage
 * (see `invoice-storage.ts`). A copy of every email is also BCC'd to `SMTP_FROM`.
 */
@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST') || 'smtp-relay.gmail.com',
      port: Number(this.configService.get<number>('SMTP_PORT')) || 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('SMTP_FROM'),
        serviceClient: this.configService.get<string>('SERVICE_ACCOUNT_CLIENT_ID'),
        privateKey: this.configService.get<string>('SERVICE_ACCOUNT_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      },
    });
  }

  /**
   * Renders a draft PDF without emailing or storing it, so the admin can check it first.
   *
   * @param {CreateInvoiceDto} dto - The invoice details.
   * @returns {Promise<GeneratedInvoice>} The draft PDF, numbered `DRAFT`.
   */
  async preview(dto: CreateInvoiceDto): Promise<GeneratedInvoice> {
    const { invoice } = await this.generate(dto, 'DRAFT');
    return invoice;
  }

  /**
   * Generates a numbered invoice, stores it, and emails it to the client (BCC to the business).
   * If the email fails, the stored record and PDF are removed so history only holds sent invoices.
   *
   * @param {CreateInvoiceDto} dto - The invoice details.
   * @returns {Promise<GeneratedInvoice>} The sent invoice PDF.
   * @throws {InternalServerErrorException} If the invoice cannot be stored or emailed.
   */
  async send(dto: CreateInvoiceDto): Promise<GeneratedInvoice> {
    const { invoice, document } = await this.generate(dto, await this.generateInvoiceNumber(dto.invoiceDate));

    let record: Invoice;
    try {
      await writeInvoiceFile(invoice.fileName, invoice.pdf);
      record = await this.invoiceRepository.save(
        this.invoiceRepository.create({
          invoiceNumber: document.invoiceNumber,
          clientName: document.clientName,
          clientEmail: document.clientEmail,
          clientPhone: document.clientPhone ?? null,
          jobAddress: document.jobAddress ?? null,
          technicianName: document.technicianName ?? null,
          invoiceDate: document.invoiceDate,
          dueDate: document.dueDate,
          items: document.items,
          subtotal: document.subtotal,
          gst: document.gst,
          total: document.total,
          notes: document.notes ?? null,
          fileName: invoice.fileName,
          emailedAt: null,
        }),
      );
    } catch (error) {
      this.logger.error(`Failed to store invoice ${invoice.invoiceNumber}`, error);
      await deleteInvoiceFile(invoice.fileName).catch(() => undefined);
      throw new InternalServerErrorException('The invoice could not be saved. Nothing was sent; please try again.');
    }

    try {
      await this.transporter.sendMail(this.buildEmail(dto, invoice));
    } catch (error) {
      this.logger.error(`Failed to email invoice ${invoice.invoiceNumber}`, error);
      await this.invoiceRepository.delete(record.id).catch(() => undefined);
      await deleteInvoiceFile(invoice.fileName).catch(() => undefined);
      throw new InternalServerErrorException(
        'The invoice was generated but could not be emailed. Nothing was sent; please try again.',
      );
    }

    await this.invoiceRepository.update(record.id, { emailedAt: new Date() });
    this.logger.log(`Invoice ${invoice.invoiceNumber} sent to ${dto.clientEmail}`);
    return invoice;
  }

  /**
   * Lists sent invoices, newest first, optionally filtered by client name, email or number.
   *
   * @param {ListInvoicesDto} query - Search text and paging.
   * @returns {Promise<InvoicePage>} One page of invoices.
   */
  async list(query: ListInvoicesDto): Promise<InvoicePage> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const search = query.search?.trim();
    const pattern = search ? `%${search.replace(/[\\%_]/g, (c) => `\\${c}`)}%` : undefined;

    const [items, total] = await this.invoiceRepository.findAndCount({
      select: {
        id: true,
        invoiceNumber: true,
        clientName: true,
        clientEmail: true,
        invoiceDate: true,
        total: true,
        emailedAt: true,
        createdAt: true,
      },
      where: pattern
        ? [{ clientName: ILike(pattern) }, { clientEmail: ILike(pattern) }, { invoiceNumber: ILike(pattern) }]
        : undefined,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { items, total, page, pageSize };
  }

  /**
   * Loads a stored invoice PDF for download.
   *
   * @param {string} id - The invoice ID.
   * @returns {Promise<GeneratedInvoice>} The stored PDF.
   * @throws {NotFoundException} If the invoice or its PDF does not exist.
   */
  async getPdf(id: string): Promise<GeneratedInvoice> {
    const record = await this.invoiceRepository.findOne({ where: { id } });
    if (!record) throw new NotFoundException('Invoice not found');

    const pdf = await readInvoiceFile(record.fileName);
    if (!pdf) throw new NotFoundException('The PDF for this invoice is missing from storage');

    return { invoiceNumber: record.invoiceNumber, fileName: record.fileName, pdf, total: record.total };
  }

  /**
   * Calculates line amounts and totals, then renders the PDF.
   *
   * @param {CreateInvoiceDto} dto - The invoice details.
   * @param {string} invoiceNumber - The number to print.
   * @returns {Promise<{ invoice: GeneratedInvoice; document: InvoiceDocument }>} The rendered invoice and its data.
   * @throws {BadRequestException} If GST is requested but no GST number is configured.
   */
  async generate(
    dto: CreateInvoiceDto,
    invoiceNumber: string,
  ): Promise<{ invoice: GeneratedInvoice; document: InvoiceDocument }> {
    const gstNumber = this.configService.get<string>('GST_NUMBER')?.trim() || undefined;
    if (dto.addGst && !gstNumber) {
      throw new BadRequestException('GST cannot be charged until a GST number is configured.');
    }

    const items = dto.items.map((item) => ({
      title: item.title.trim(),
      description: item.description?.trim() || undefined,
      quantity: item.quantity,
      rate: item.rate,
      amount: toCents(item.quantity * item.rate),
    }));
    const subtotal = toCents(items.reduce((sum, item) => sum + item.amount, 0));
    const gst = dto.addGst ? toCents(subtotal * GST_RATE) : 0;
    const invoiceDate = dto.invoiceDate?.slice(0, 10) ?? this.todayInNz();

    const document: InvoiceDocument = {
      invoiceNumber,
      invoiceDate,
      dueDate: dto.dueDate?.slice(0, 10) ?? invoiceDate,
      clientName: dto.clientName.trim(),
      clientEmail: dto.clientEmail.trim(),
      clientPhone: dto.clientPhone?.trim() || undefined,
      jobAddress: dto.jobAddress?.trim() || undefined,
      technicianName: dto.technicianName?.trim() || undefined,
      notes: dto.notes?.trim() || undefined,
      gstNumber,
      items,
      subtotal,
      gst,
      total: toCents(subtotal + gst),
    };

    const pdf = await renderInvoicePdf(document);
    const client = slugifyClientName(document.clientName);
    return {
      document,
      invoice: {
        invoiceNumber,
        fileName: `Invoice_FalconAccess_${client ? `${client}_` : ''}${invoiceNumber}.pdf`,
        pdf,
        total: document.total,
      },
    };
  }

  private buildEmail(dto: CreateInvoiceDto, invoice: GeneratedInvoice): nodemailer.SendMailOptions {
    const from = this.configService.get<string>('SMTP_FROM');
    return {
      from: from ? `"${BUSINESS.tradingName}" <${from}>` : undefined,
      to: dto.clientEmail,
      bcc: from,
      subject: `Invoice ${invoice.invoiceNumber} from ${BUSINESS.tradingName}`,
      text: [
        `Hi ${dto.clientName},`,
        '',
        `Thank you for choosing ${BUSINESS.tradingName}. Please find attached invoice ${invoice.invoiceNumber} for ${formatMoney(invoice.total)}.`,
        '',
        'Payment can be made by bank transfer:',
        `Account name: ${BUSINESS.accountName}`,
        `Account number: ${BUSINESS.accountNumber}`,
        `Reference: ${invoice.invoiceNumber}`,
        '',
        `If you have any questions, call us on ${BUSINESS.phone}.`,
        '',
        'Kind regards,',
        `The ${BUSINESS.tradingName} Team`,
      ].join('\n'),
      attachments: [{ filename: invoice.fileName, content: invoice.pdf, contentType: 'application/pdf' }],
    };
  }

  /**
   * Builds a unique, non-sequential invoice number such as `FA-260925-K7Q`: the invoice
   * date plus three random characters (no 0/O/1/I to avoid ambiguity when read aloud).
   */
  private async generateInvoiceNumber(invoiceDate?: string): Promise<string> {
    const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const date = (invoiceDate?.slice(0, 10) ?? this.todayInNz()).replace(/-/g, '').slice(2);
    for (let attempt = 0; attempt < 10; attempt++) {
      const suffix = Array.from(crypto.randomBytes(3), (byte) => CHARSET[byte % CHARSET.length]).join('');
      const candidate = `FA-${date}-${suffix}`;
      if (!(await this.invoiceRepository.exists({ where: { invoiceNumber: candidate } }))) return candidate;
    }
    return `FA-${date}-${Date.now().toString(36).toUpperCase()}`;
  }

  /** Today's calendar date in New Zealand as `YYYY-MM-DD`. */
  private todayInNz(): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Pacific/Auckland' }).format(new Date());
  }
}
