import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { AuthService } from '../auth/auth.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

describe('InvoiceController', () => {
  let controller: InvoiceController;
  const generated = { invoiceNumber: 'FA-260925-ABC', fileName: 'Invoice.pdf', pdf: Buffer.from('%PDF-'), total: 270 };
  const invoiceService = {
    preview: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve({ ...generated, invoiceNumber: 'DRAFT' })),
    send: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve(generated)),
    list: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve({ items: [], total: 0, page: 1, pageSize: 20 })),
    getPdf: jest.fn<(...args: unknown[]) => Promise<unknown>>(() => Promise.resolve(generated)),
  };
  const set = jest.fn();
  const res = { set } as unknown as Response;
  const dto = { clientName: 'Jerry', clientEmail: 'j@example.com', items: [] } as unknown as CreateInvoiceDto;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        { provide: InvoiceService, useValue: invoiceService },
        { provide: AuthService, useValue: { verifyAccessToken: jest.fn() } },
      ],
    }).compile();
    controller = module.get(InvoiceController);
  });

  it('preview returns the draft PDF', async () => {
    const file = await controller.preview(dto, res);

    expect(invoiceService.preview).toHaveBeenCalledWith(dto);
    expect(file).toBeInstanceOf(StreamableFile);
    expect(set).toHaveBeenCalledWith(expect.objectContaining({ 'X-Invoice-Number': 'DRAFT' }));
  });

  it('send emails the invoice and returns the PDF with its number', async () => {
    const file = await controller.send(dto, res);

    expect(invoiceService.send).toHaveBeenCalledWith(dto);
    expect(file.getHeaders()).toMatchObject({
      type: 'application/pdf',
      disposition: 'attachment; filename="Invoice.pdf"',
    });
    expect(set).toHaveBeenCalledWith(expect.objectContaining({ 'X-Invoice-Number': 'FA-260925-ABC' }));
  });

  it('list delegates the query to the service', async () => {
    await expect(controller.list({ search: 'jerry' })).resolves.toMatchObject({ total: 0 });
    expect(invoiceService.list).toHaveBeenCalledWith({ search: 'jerry' });
  });

  it('download returns the stored PDF', async () => {
    const file = await controller.download('0b7e4a8e-5d9c-4f55-9a6b-1c2d3e4f5a6b', res);
    expect(invoiceService.getPdf).toHaveBeenCalledWith('0b7e4a8e-5d9c-4f55-9a6b-1c2d3e4f5a6b');
    expect(file).toBeInstanceOf(StreamableFile);
  });
});
