import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ListInvoicesDto } from './dto/list-invoices.dto';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';
import { GeneratedInvoice, InvoicePage, InvoiceService, InvoiceSummary } from './invoice.service';

/**
 * Admin-only invoice routes. PDF responses expose the invoice number in the
 * `X-Invoice-Number` header.
 */
@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  /**
   * Lists sent invoices, newest first.
   *
   * @param {ListInvoicesDto} query - Optional search text and paging.
   * @returns {Promise<InvoicePage>} One page of invoice history.
   */
  @Get()
  async list(@Query() query: ListInvoicesDto): Promise<InvoicePage> {
    return this.invoiceService.list(query);
  }

  /**
   * Downloads the stored PDF of a sent invoice.
   *
   * @param {string} id - The invoice ID.
   * @param {Response} res - Used to set the download headers.
   * @returns {Promise<StreamableFile>} The PDF.
   */
  @Get(':id/pdf')
  async download(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    return this.toFile(await this.invoiceService.getPdf(id), res);
  }

  /**
   * Marks a sent invoice as paid or unpaid; the stored PDF is updated to match.
   *
   * @param {string} id - The invoice ID.
   * @param {UpdateInvoiceStatusDto} dto - The new status.
   * @returns {Promise<InvoiceSummary>} The updated history row.
   */
  @Patch(':id/status')
  async updateStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateInvoiceStatusDto,
  ): Promise<InvoiceSummary> {
    return this.invoiceService.updateStatus(id, dto.paid);
  }

  /**
   * Deletes an invoice from history. Its PDF stays in storage.
   *
   * @param {string} id - The invoice ID.
   * @returns {Promise<void>}
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.invoiceService.remove(id);
  }

  /**
   * Renders a draft PDF without emailing or storing it.
   *
   * @param {CreateInvoiceDto} dto - The invoice details.
   * @param {Response} res - Used to set the download headers.
   * @returns {Promise<StreamableFile>} The draft PDF.
   */
  @Post('preview')
  @HttpCode(HttpStatus.OK)
  async preview(
    @Body() dto: CreateInvoiceDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    return this.toFile(await this.invoiceService.preview(dto), res);
  }

  /**
   * Generates a numbered invoice, stores it and emails it to the client.
   *
   * @param {CreateInvoiceDto} dto - The invoice details.
   * @param {Response} res - Used to set the download headers.
   * @returns {Promise<StreamableFile>} The sent invoice PDF.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async send(
    @Body() dto: CreateInvoiceDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    return this.toFile(await this.invoiceService.send(dto), res);
  }

  private toFile(invoice: GeneratedInvoice, res: Response): StreamableFile {
    res.set({
      'X-Invoice-Number': invoice.invoiceNumber,
      'Cache-Control': 'no-store',
    });
    return new StreamableFile(invoice.pdf, {
      type: 'application/pdf',
      disposition: `attachment; filename="${invoice.fileName}"`,
    });
  }
}
