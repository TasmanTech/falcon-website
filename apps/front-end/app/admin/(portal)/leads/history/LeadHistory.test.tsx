import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));
vi.mock('@/app/actions/auth', () => ({ refreshAccessTokenAction: vi.fn() }));

const fetchLeads = vi.fn();
const updateLeadStatus = vi.fn();
const deleteLead = vi.fn();
vi.mock('@/lib/lead', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/lead')>()),
  fetchLeads: (...args: unknown[]) => fetchLeads(...args),
  updateLeadStatus: (...args: unknown[]) => updateLeadStatus(...args),
  deleteLead: (...args: unknown[]) => deleteLead(...args),
}));

const { default: LeadHistory } = await import('./LeadHistory');

const kerry = {
  id: 'lead-1',
  date: '2026-09-30',
  time: '10:00',
  name: 'Kerry',
  phone: '+64 20 4179 8380',
  address: '2/135 Verbena Road, Birkdale, Auckland',
  jobType: 'Open box without drilling',
  notes: 'Key inside',
  status: 'pending',
  createdAt: '2026-09-28T03:51:00.000Z',
  updatedAt: '2026-09-28T03:51:00.000Z',
};
const page = (items: unknown[]) => ({ items, total: items.length, page: 1, pageSize: 20, token: 't' });

describe('LeadHistory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lists saved leads with their status', async () => {
    fetchLeads.mockResolvedValue(page([kerry]));
    render(<LeadHistory token="t" />);

    expect(await screen.findByText('Kerry')).toBeInTheDocument();
    expect(screen.getByText('30/09/2026 · 10:00am · Open box without drilling')).toBeInTheDocument();
    expect(screen.getByText('Pending', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /\+64 20 4179 8380/ })).toHaveAttribute('href', 'tel:+642041798380');
  });

  it('filters by status', async () => {
    fetchLeads.mockResolvedValue(page([]));
    render(<LeadHistory token="t" />);
    await screen.findByText('No leads have been saved yet.');

    fireEvent.click(screen.getByRole('button', { name: 'Closed' }));

    await waitFor(() =>
      expect(fetchLeads).toHaveBeenLastCalledWith({ search: '', status: 'closed', page: 1 }, 't', expect.any(Function)),
    );
  });

  it('changes a lead status', async () => {
    fetchLeads.mockResolvedValue(page([kerry]));
    updateLeadStatus.mockResolvedValue({ ...kerry, status: 'closed', token: 't' });
    render(<LeadHistory token="t" />);

    fireEvent.change(await screen.findByLabelText('Status for Kerry'), { target: { value: 'closed' } });

    await waitFor(() => expect(screen.getByText('Closed', { selector: 'span' })).toBeInTheDocument());
    expect(updateLeadStatus).toHaveBeenCalledWith('lead-1', 'closed', 't', expect.any(Function));
  });

  it('deletes a lead after confirming', async () => {
    fetchLeads.mockResolvedValue(page([kerry]));
    deleteLead.mockResolvedValue({ token: 't' });
    render(<LeadHistory token="t" />);

    fireEvent.click(await screen.findByRole('button', { name: 'Delete Kerry' }));
    expect(deleteLead).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => expect(screen.queryByText('Kerry')).not.toBeInTheDocument());
    expect(deleteLead).toHaveBeenCalledWith('lead-1', 't', expect.any(Function));
  });

  it('opens a lead for editing', async () => {
    fetchLeads.mockResolvedValue(page([kerry]));
    render(<LeadHistory token="t" />);

    fireEvent.click(await screen.findByRole('button', { name: 'Edit Kerry' }));

    expect(screen.getByRole('heading', { name: 'Edit Lead' })).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveValue('Kerry');
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.getByRole('heading', { name: 'Leads' })).toBeInTheDocument();
  });

  it('shows errors', async () => {
    fetchLeads.mockRejectedValue(new Error('Server unavailable'));
    render(<LeadHistory token="t" />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Server unavailable');
  });
});
