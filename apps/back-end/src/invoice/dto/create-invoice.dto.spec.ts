import 'reflect-metadata';
import { describe, it, expect } from '@jest/globals';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateInvoiceDto } from './create-invoice.dto';

async function errorsFor(payload: Record<string, unknown>): Promise<string[]> {
  const errors = await validate(plainToInstance(CreateInvoiceDto, payload));
  return errors.map((error) => error.property);
}

describe('CreateInvoiceDto', () => {
  const valid = {
    clientName: 'Jerry Li',
    clientEmail: 'jerry@example.com',
    invoiceDate: '2026-09-25',
    items: [{ title: 'Service Call', quantity: 1, rate: 20 }],
  };

  it('accepts a valid invoice', async () => {
    expect(await errorsFor(valid)).toEqual([]);
  });

  it('requires at least one item', async () => {
    expect(await errorsFor({ ...valid, items: [] })).toContain('items');
  });

  it('rejects an invalid email', async () => {
    expect(await errorsFor({ ...valid, clientEmail: 'not-an-email' })).toContain('clientEmail');
  });

  it('rejects negative rates inside items', async () => {
    expect(await errorsFor({ ...valid, items: [{ title: 'X', quantity: 1, rate: -5 }] })).toContain('items');
  });

  it('rejects dates that are not YYYY-MM-DD', async () => {
    expect(await errorsFor({ ...valid, invoiceDate: '25/09/2026' })).toContain('invoiceDate');
  });
});
