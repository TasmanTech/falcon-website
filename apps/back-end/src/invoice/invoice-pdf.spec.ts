import { describe, it, expect } from '@jest/globals';
import { formatInvoiceDate, formatMoney, renderInvoicePdf } from './invoice-pdf';

describe('invoice-pdf', () => {
  it('formats NZ currency', () => {
    expect(formatMoney(1234.5)).toBe('NZ$1,234.50');
    expect(formatMoney(0)).toBe('NZ$0.00');
  });

  it('formats calendar dates without timezone drift', () => {
    expect(formatInvoiceDate('2026-09-25')).toMatch(/^25 Sept? 2026$/);
  });

  it('renders a multi-page PDF when there are many items', async () => {
    const items = Array.from({ length: 30 }, (_, i) => ({
      title: `Item ${i + 1}`,
      description: 'Supply and fit, including alignment and function testing.',
      quantity: 1,
      rate: 10,
      amount: 10,
    }));
    const pdf = await renderInvoicePdf({
      invoiceNumber: 'FA-260925-ABC',
      invoiceDate: '2026-09-25',
      dueDate: '2026-09-25',
      clientName: 'Jerry Li',
      clientEmail: 'jerry@example.com',
      items,
      subtotal: 300,
      gst: 0,
      total: 300,
    });

    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    const pageCount = (pdf.toString('latin1').match(/\/Type \/Page\b/g) ?? []).length;
    expect(pageCount).toBeGreaterThan(1);
  });
});
