import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));
vi.mock('@/app/actions/auth', () => ({ refreshAccessTokenAction: vi.fn() }));

const fetchInvoiceHistory = vi.fn();
const fetchStoredInvoicePdf = vi.fn();
const downloadBlob = vi.fn();
vi.mock('@/lib/invoice', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/invoice')>()),
  fetchInvoiceHistory: (...args: unknown[]) => fetchInvoiceHistory(...args),
  fetchStoredInvoicePdf: (...args: unknown[]) => fetchStoredInvoicePdf(...args),
  downloadBlob: (...args: unknown[]) => downloadBlob(...args),
}));

const { default: InvoiceHistory } = await import('./InvoiceHistory');

const jerry = {
  id: 'id-1',
  invoiceNumber: 'FA-260925-ABC',
  clientName: 'Jerry Li',
  clientEmail: 'jerrylee9922@gmail.com',
  invoiceDate: '2026-09-25',
  total: 270,
  emailedAt: '2026-09-25T01:00:00.000Z',
  createdAt: '2026-09-25T01:00:00.000Z',
};

describe('InvoiceHistory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lists sent invoices', async () => {
    fetchInvoiceHistory.mockResolvedValue({ items: [jerry], total: 1, page: 1, pageSize: 20, token: 't' });
    render(<InvoiceHistory token="t" />);

    expect(await screen.findByText('Jerry Li')).toBeInTheDocument();
    expect(screen.getByText('$270.00')).toBeInTheDocument();
    expect(screen.getByText(/FA-260925-ABC · 25\/09\/2026/)).toBeInTheDocument();
  });

  it('shows an empty state', async () => {
    fetchInvoiceHistory.mockResolvedValue({ items: [], total: 0, page: 1, pageSize: 20, token: 't' });
    render(<InvoiceHistory token="t" />);
    expect(await screen.findByText('No invoices have been sent yet.')).toBeInTheDocument();
  });

  it('searches after typing stops', async () => {
    fetchInvoiceHistory.mockResolvedValue({ items: [], total: 0, page: 1, pageSize: 20, token: 't' });
    render(<InvoiceHistory token="t" />);
    await screen.findByText('No invoices have been sent yet.');

    fireEvent.change(screen.getByLabelText('Search invoices'), { target: { value: 'jerry' } });

    await waitFor(() =>
      expect(fetchInvoiceHistory).toHaveBeenLastCalledWith({ search: 'jerry', page: 1 }, 't', expect.any(Function)),
    );
  });

  it('downloads the stored PDF when a row is tapped', async () => {
    fetchInvoiceHistory.mockResolvedValue({ items: [jerry], total: 1, page: 1, pageSize: 20, token: 't' });
    fetchStoredInvoicePdf.mockResolvedValue({ blob: new Blob(), fileName: 'Invoice.pdf', invoiceNumber: 'FA', token: 't' });
    render(<InvoiceHistory token="t" />);

    fireEvent.click(await screen.findByRole('button', { name: /Download FA-260925-ABC for Jerry Li/ }));

    await waitFor(() => expect(downloadBlob).toHaveBeenCalledWith(expect.any(Blob), 'Invoice.pdf'));
    expect(fetchStoredInvoicePdf).toHaveBeenCalledWith('id-1', 't', expect.any(Function));
  });

  it('loads more results', async () => {
    fetchInvoiceHistory
      .mockResolvedValueOnce({ items: [jerry], total: 2, page: 1, pageSize: 20, token: 't' })
      .mockResolvedValueOnce({ items: [{ ...jerry, id: 'id-2', clientName: 'Second' }], total: 2, page: 2, pageSize: 20, token: 't' });
    render(<InvoiceHistory token="t" />);

    fireEvent.click(await screen.findByRole('button', { name: 'Load More' }));

    expect(await screen.findByText('Second')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Load More' })).not.toBeInTheDocument();
  });

  it('shows errors', async () => {
    fetchInvoiceHistory.mockRejectedValue(new Error('Server unavailable'));
    render(<InvoiceHistory token="t" />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Server unavailable');
  });
});
