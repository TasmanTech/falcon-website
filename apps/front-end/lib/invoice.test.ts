import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  PRESET_GROUPS,
  SessionExpiredError,
  calculateTotals,
  createEmptyDraft,
  createItem,
  fetchInvoiceHistory,
  formatDisplayDate,
  getDownloadFileName,
  submitInvoice,
  toInvoicePayload,
  type InvoiceDraft,
} from './invoice';

const draft: InvoiceDraft = {
  ...createEmptyDraft(),
  clientName: ' Jerry Li ',
  clientEmail: 'jerry@example.com',
  technicianName: 'Ibrahim',
  invoiceDate: '2026-09-25',
  items: [
    { id: '1', title: 'Service Call', description: '', quantity: '1', rate: '20' },
    { id: '2', title: 'Lockout – Advanced Lock', description: 'Entry.', quantity: '1', rate: '250' },
  ],
};

function pdfResponse(status = 200): Response {
  return new Response(new Blob(['%PDF-']), {
    status,
    headers: {
      'Content-Disposition': 'attachment; filename="Invoice_FalconAccess_Jerry-Li_FA-260925-ABC.pdf"',
      'X-Invoice-Number': 'FA-260925-ABC',
    },
  });
}

describe('lib/invoice', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calculateTotals matches the worklog and adds GST on request', () => {
    expect(calculateTotals(draft.items, false)).toEqual({ subtotal: 270, gst: 0, total: 270 });
    expect(calculateTotals(draft.items, true)).toEqual({ subtotal: 270, gst: 40.5, total: 310.5 });
  });

  it('createItem copies preset prices, leaving TBD items blank and free items at 0', () => {
    const presets = PRESET_GROUPS.flatMap((group) => group.presets);
    expect(createItem(presets.find((p) => p.title === 'Service Call')).rate).toBe('20');
    expect(createItem(presets.find((p) => p.title === 'Rekey')).rate).toBe('');
    expect(createItem(presets.find((p) => p.free)).rate).toBe('0');
  });

  it('toInvoicePayload trims text, converts numbers and drops empty optionals', () => {
    const payload = toInvoicePayload(draft);
    expect(payload).toMatchObject({ clientName: 'Jerry Li', clientPhone: undefined, addGst: false });
    expect(payload.items[0]).toEqual({ title: 'Service Call', description: undefined, quantity: 1, rate: 20 });
  });

  it('formatDisplayDate uses DD/MM/YYYY', () => {
    expect(formatDisplayDate('2026-09-25')).toBe('25/09/2026');
  });

  it('getDownloadFileName reads Content-Disposition', () => {
    expect(getDownloadFileName(pdfResponse(), 'x.pdf')).toBe('Invoice_FalconAccess_Jerry-Li_FA-260925-ABC.pdf');
    expect(getDownloadFileName(new Response(null), 'x.pdf')).toBe('x.pdf');
  });

  describe('submitInvoice', () => {
    it('sends the invoice with the bearer token and returns the PDF', async () => {
      const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(pdfResponse());

      const result = await submitInvoice('send', draft, 'token', vi.fn());

      expect(result.invoiceNumber).toBe('FA-260925-ABC');
      const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toMatch(/\/invoices$/);
      expect((init.headers as Record<string, string>).Authorization).toBe('Bearer token');
    });

    it('refreshes an expired token once and retries', async () => {
      vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce(new Response(null, { status: 401 }))
        .mockResolvedValueOnce(pdfResponse());
      const refresh = vi.fn().mockResolvedValue('fresh');

      const result = await submitInvoice('preview', draft, 'stale', refresh);

      expect(refresh).toHaveBeenCalledTimes(1);
      expect(result.token).toBe('fresh');
    });

    it('throws SessionExpiredError when the session cannot be refreshed', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(new Response(null, { status: 401 }));
      await expect(submitInvoice('send', draft, 'stale', vi.fn().mockResolvedValue(null))).rejects.toBeInstanceOf(
        SessionExpiredError,
      );
    });

    it('surfaces the back-end error message', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(
        new Response(JSON.stringify({ message: ['clientEmail must be an email'] }), { status: 400 }),
      );
      await expect(submitInvoice('send', draft, 't', vi.fn())).rejects.toThrow('clientEmail must be an email');
    });
  });

  it('fetchInvoiceHistory passes search and paging, and converts totals to numbers', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ items: [{ id: '1', total: '270.00' }], total: 1, page: 2, pageSize: 20 }),
        { status: 200 },
      ),
    );

    const result = await fetchInvoiceHistory({ search: 'jerry', page: 2 }, 't', vi.fn());

    expect(fetchMock.mock.calls[0][0]).toMatch(/\/invoices\?page=2&pageSize=20&search=jerry$/);
    expect(result.items[0].total).toBe(270);
  });
});
