import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));
vi.mock('@/app/actions/auth', () => ({ refreshAccessTokenAction: vi.fn().mockResolvedValue(null) }));

const submitInvoice = vi.fn();
const downloadBlob = vi.fn();
vi.mock('@/lib/invoice', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/invoice')>()),
  submitInvoice: (...args: unknown[]) => submitInvoice(...args),
  downloadBlob: (...args: unknown[]) => downloadBlob(...args),
}));

const { default: InvoiceForm, DRAFT_STORAGE_KEY } = await import('./InvoiceForm');
const { SessionExpiredError } = await import('@/lib/invoice');

async function fillJerrysInvoice() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('Name *'), 'Jerry Li');
  await user.type(screen.getByLabelText('Email *'), 'jerrylee9922@gmail.com');

  await user.click(screen.getByRole('button', { name: /Price List/ }));
  await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Service Call/ }));
  await user.click(screen.getByRole('button', { name: /Price List/ }));
  await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Lockout – Advanced Lock/ }));

  // The advanced lockout was discounted from $369 to $250 on the job sheet
  const rates = screen.getAllByLabelText('Rate ($)');
  await user.clear(rates[1]);
  await user.type(rates[1], '250');
  return user;
}

describe('InvoiceForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
    window.scrollTo = vi.fn();
  });

  it('builds an invoice from the price list with a live total', async () => {
    render(<InvoiceForm token="token" />);
    await fillJerrysInvoice();

    expect(screen.getAllByText('$270.00').length).toBeGreaterThan(0);
  });

  it('asks for at least one item before review', async () => {
    const user = userEvent.setup();
    render(<InvoiceForm token="token" />);
    await user.type(screen.getByLabelText('Name *'), 'Jerry Li');
    await user.type(screen.getByLabelText('Email *'), 'jerry@example.com');
    await user.click(screen.getByRole('button', { name: 'Review' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Add at least one item.');
  });

  it('reviews, sends and offers the PDF', async () => {
    submitInvoice.mockResolvedValue({
      blob: new Blob(['%PDF-']),
      fileName: 'Invoice.pdf',
      invoiceNumber: 'FA-260925-ABC',
      token: 'token',
    });
    render(<InvoiceForm token="token" />);
    const user = await fillJerrysInvoice();

    await user.click(screen.getByRole('button', { name: 'Review' }));
    expect(screen.getByText('Review Invoice')).toBeInTheDocument();
    expect(screen.getByText('jerrylee9922@gmail.com')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Send Invoice/ }));

    await waitFor(() => expect(screen.getByText('Invoice sent')).toBeInTheDocument());
    expect(submitInvoice).toHaveBeenCalledWith('send', expect.objectContaining({ clientName: 'Jerry Li' }), 'token', expect.any(Function));
    expect(window.localStorage.getItem(DRAFT_STORAGE_KEY)).toBeNull();

    await user.click(screen.getByRole('button', { name: /Download PDF/ }));
    expect(downloadBlob).toHaveBeenCalledWith(expect.any(Blob), 'Invoice.pdf');
  });

  it('previews a draft PDF without sending', async () => {
    submitInvoice.mockResolvedValue({ blob: new Blob(), fileName: 'Draft.pdf', invoiceNumber: 'DRAFT', token: 't' });
    render(<InvoiceForm token="token" />);
    const user = await fillJerrysInvoice();
    await user.click(screen.getByRole('button', { name: 'Review' }));
    await user.click(screen.getByRole('button', { name: /Preview PDF/ }));

    await waitFor(() => expect(downloadBlob).toHaveBeenCalledWith(expect.any(Blob), 'Draft.pdf'));
    expect(submitInvoice).toHaveBeenCalledWith('preview', expect.any(Object), 'token', expect.any(Function));
    expect(screen.getByText('Review Invoice')).toBeInTheDocument();
  });

  it('keeps the draft and links to login when the session has ended', async () => {
    submitInvoice.mockRejectedValue(new SessionExpiredError());
    render(<InvoiceForm token="token" />);
    const user = await fillJerrysInvoice();
    await user.click(screen.getByRole('button', { name: 'Review' }));
    await user.click(screen.getByRole('button', { name: /Send Invoice/ }));

    await waitFor(() => expect(screen.getByRole('link', { name: 'Log in again' })).toBeInTheDocument());
    expect(window.localStorage.getItem(DRAFT_STORAGE_KEY)).toContain('Jerry Li');
  });

  it('offers to restore an unsent draft', async () => {
    window.localStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({ clientName: 'Saved Customer', clientEmail: 's@example.com', items: [] }),
    );
    render(<InvoiceForm token="token" />);

    fireEvent.click(screen.getByRole('button', { name: 'Restore' }));
    expect(screen.getByLabelText('Name *')).toHaveValue('Saved Customer');
  });

  it('removes an item', async () => {
    render(<InvoiceForm token="token" />);
    const user = await fillJerrysInvoice();
    await user.click(screen.getByRole('button', { name: 'Remove Service Call' }));
    expect(screen.queryByDisplayValue('Service Call')).not.toBeInTheDocument();
  });
});
