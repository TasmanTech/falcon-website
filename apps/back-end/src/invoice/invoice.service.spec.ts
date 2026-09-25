import { describe, it, expect, beforeAll, beforeEach, afterAll, afterEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as nodemailerModule from 'nodemailer';
import { InvoiceService, slugifyClientName } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './invoice.entity';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let config: Record<string, string | undefined>;
  let storageDir: string;
  const sendMail = jest.fn<(options: Record<string, unknown>) => Promise<object>>(() => Promise.resolve({}));
  const repository = {
    create: jest.fn((data: Partial<Invoice>) => data),
    save: jest.fn((data: Partial<Invoice>) => Promise.resolve({ ...data, id: 'invoice-id' })),
    update: jest.fn<(...args: unknown[]) => Promise<object>>(() => Promise.resolve({})),
    delete: jest.fn<(...args: unknown[]) => Promise<object>>(() => Promise.resolve({})),
    exists: jest.fn(() => Promise.resolve(false)),
    findOne: jest.fn<() => Promise<Partial<Invoice> | null>>(() => Promise.resolve(null)),
    findAndCount: jest.fn<(...args: unknown[]) => Promise<[Invoice[], number]>>(() => Promise.resolve([[], 0])),
  };

  const dto: CreateInvoiceDto = {
    clientName: 'Jerry Li',
    clientEmail: 'jerry@example.com',
    technicianName: 'Ibrahim',
    invoiceDate: '2026-09-25',
    items: [
      { title: 'Service Call', quantity: 1, rate: 20 },
      { title: 'Lockout – Advanced Lock', description: 'Non-destructive entry.', quantity: 1, rate: 250 },
    ],
  };

  beforeAll(() => {
    storageDir = fs.mkdtempSync(path.join(os.tmpdir(), 'falcon-invoices-'));
    process.env.INVOICE_STORAGE_DIR = storageDir;
  });

  afterAll(() => {
    delete process.env.INVOICE_STORAGE_DIR;
    fs.rmSync(storageDir, { recursive: true, force: true });
  });

  beforeEach(async () => {
    config = { SMTP_FROM: 'info@falconaccess.co.nz' };
    jest
      .spyOn(nodemailerModule, 'createTransport')
      .mockReturnValue({ sendMail } as unknown as nodemailerModule.Transporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        { provide: ConfigService, useValue: { get: (key: string) => config[key] } },
        { provide: getRepositoryToken(Invoice), useValue: repository },
      ],
    }).compile();
    service = module.get(InvoiceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generate', () => {
    it('calculates totals server-side and renders a PDF', async () => {
      const { invoice } = await service.generate(dto, 'DRAFT');

      expect(invoice.total).toBe(270);
      expect(invoice.fileName).toBe('Invoice_FalconAccess_Jerry-Li_DRAFT.pdf');
      expect(invoice.pdf.subarray(0, 5).toString()).toBe('%PDF-');
    });

    it('adds 15% GST when requested and a GST number is configured', async () => {
      config.GST_NUMBER = '123-456-789';
      const { invoice } = await service.generate({ ...dto, addGst: true }, 'DRAFT');
      expect(invoice.total).toBe(310.5);
    });

    it('refuses to charge GST without a GST number', async () => {
      await expect(service.generate({ ...dto, addGst: true }, 'DRAFT')).rejects.toThrow(BadRequestException);
    });

    it('rounds line amounts to cents', async () => {
      const { invoice } = await service.generate(
        { ...dto, items: [{ title: 'Labour', quantity: 1.5, rate: 33.33 }] },
        'X',
      );
      expect(invoice.total).toBe(50);
    });
  });

  describe('preview', () => {
    it('numbers the invoice DRAFT and neither stores nor sends it', async () => {
      const result = await service.preview(dto);
      expect(result.invoiceNumber).toBe('DRAFT');
      expect(sendMail).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('send', () => {
    it('stores the PDF and record, emails the client, then marks it emailed', async () => {
      const result = await service.send(dto);

      expect(result.invoiceNumber).toMatch(/^FA-260925-[A-HJ-NP-Z2-9]{3}$/);
      expect(fs.existsSync(path.join(storageDir, result.fileName))).toBe(true);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ invoiceNumber: result.invoiceNumber, total: 270, fileName: result.fileName }),
      );

      const mail = sendMail.mock.calls[0][0] as Record<string, any>;
      expect(mail.to).toBe('jerry@example.com');
      expect(mail.bcc).toBe('info@falconaccess.co.nz');
      expect(mail.text).toContain('NZ$270.00');
      expect(mail.attachments[0]).toMatchObject({ filename: result.fileName, contentType: 'application/pdf' });
      expect(repository.update).toHaveBeenCalledWith('invoice-id', { emailedAt: expect.any(Date) });
    });

    it('removes the record and PDF when the email fails', async () => {
      sendMail.mockRejectedValueOnce(new Error('SMTP down'));

      await expect(service.send(dto)).rejects.toThrow(InternalServerErrorException);

      expect(repository.delete).toHaveBeenCalledWith('invoice-id');
      const fileName = (repository.save.mock.calls[0][0]).fileName as string;
      expect(fs.existsSync(path.join(storageDir, fileName))).toBe(false);
    });

    it('sends nothing when the record cannot be saved', async () => {
      repository.save.mockRejectedValueOnce(new Error('DB down'));
      await expect(service.send(dto)).rejects.toThrow(InternalServerErrorException);
      expect(sendMail).not.toHaveBeenCalled();
    });
  });

  describe('list', () => {
    it('pages newest first and searches name, email and number', async () => {
      await service.list({ search: 'jer', page: 2, pageSize: 10 });

      expect(repository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({ order: { createdAt: 'DESC' }, skip: 10, take: 10 }),
      );
      const { where } = repository.findAndCount.mock.calls[0][0] as { where: unknown[] };
      expect(where).toHaveLength(3);
    });
  });

  describe('getPdf', () => {
    it('returns the stored PDF', async () => {
      fs.writeFileSync(path.join(storageDir, 'stored.pdf'), '%PDF-stored');
      repository.findOne.mockResolvedValueOnce({ invoiceNumber: 'FA-1', fileName: 'stored.pdf', total: 10 });

      const result = await service.getPdf('id');
      expect(result.pdf.toString()).toBe('%PDF-stored');
    });

    it('throws when the invoice does not exist', async () => {
      await expect(service.getPdf('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws when the PDF is missing from storage', async () => {
      repository.findOne.mockResolvedValueOnce({ invoiceNumber: 'FA-2', fileName: 'gone.pdf', total: 10 });
      await expect(service.getPdf('id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('slugifyClientName', () => {
    it('makes names filename-safe', () => {
      expect(slugifyClientName("Jane O'Brien & Sons")).toBe('Jane-OBrien-Sons');
      expect(slugifyClientName('Zoë')).toBe('Zoe');
    });
  });
});
