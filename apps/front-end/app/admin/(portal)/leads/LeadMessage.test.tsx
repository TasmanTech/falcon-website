import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));
vi.mock('@/app/actions/auth', () => ({ refreshAccessTokenAction: vi.fn() }));
vi.mock('@/lib/invoice', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/invoice')>()),
  todayInNz: () => '2026-09-28',
}));
const saveLead = vi.fn();
vi.mock('@/lib/lead', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/lead')>()),
  saveLead: (...args: unknown[]) => saveLead(...args),
}));

const { default: LeadMessage } = await import('./LeadMessage');

describe('LeadMessage', () => {
  it('previews and copies the message', async () => {
    const user = userEvent.setup();
    render(<LeadMessage token="t" />);

    await user.type(screen.getByLabelText('Name'), 'Jerry Li');
    await user.type(screen.getByLabelText('Phone'), '0211234567');
    await user.type(screen.getByLabelText('Address'), '12 Queen Street');

    const preview = screen.getByTestId('lead-preview');
    expect(preview).toHaveTextContent('Date: Mon 28/09/2026');
    expect(preview).toHaveTextContent('Name: Jerry Li');
    expect(preview).toHaveTextContent('Phone: +64 21 123 4567');
    expect(screen.getByRole('link', { name: 'Check on Google Maps' })).toHaveAttribute(
      'href',
      'https://www.google.com/maps/search/?api=1&query=12%20Queen%20Street',
    );

    await user.click(screen.getByRole('button', { name: 'Copy Message' }));
    // userEvent.setup() swaps in a clipboard stub, so read back what was written
    expect(await navigator.clipboard.readText()).toBe(preview.textContent);
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('starts a new lead', async () => {
    const user = userEvent.setup();
    window.scrollTo = vi.fn();
    render(<LeadMessage token="t" />);

    await user.type(screen.getByLabelText('Name'), 'Jerry Li');
    await user.click(screen.getByRole('button', { name: 'New Lead' }));
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Date')).toHaveValue('2026-09-28');
  });

  it('saves the lead as pending by default', async () => {
    const user = userEvent.setup();
    saveLead.mockResolvedValue({ id: 'lead-1', status: 'pending', token: 't' });
    render(<LeadMessage token="t" />);

    await user.type(screen.getByLabelText('Name'), 'KC');
    await user.click(screen.getByRole('button', { name: 'Save Lead' }));

    expect(await screen.findByRole('button', { name: 'Saved to Leads' })).toBeInTheDocument();
    expect(saveLead).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: 'KC', date: '2026-09-28' }),
      'pending',
      undefined,
      't',
      expect.any(Function),
    );
  });

  it('saves a historic lead with a chosen status', async () => {
    const user = userEvent.setup();
    saveLead.mockResolvedValue({ id: 'lead-2', status: 'closed', token: 't' });
    render(<LeadMessage token="t" />);

    await user.click(screen.getByLabelText('Closed'));
    await user.click(screen.getByRole('button', { name: 'Save Lead' }));

    expect(saveLead).toHaveBeenLastCalledWith(expect.anything(), 'closed', undefined, 't', expect.any(Function));
  });

  it('edits a saved lead', async () => {
    const user = userEvent.setup();
    const onSaved = vi.fn();
    const saved = {
      id: 'lead-3', date: '2026-09-30', time: '10:00', name: 'Kerry', phone: null, address: null,
      jobType: 'Open box without drilling', notes: null, status: 'pending' as const, createdAt: '', updatedAt: '',
    };
    saveLead.mockResolvedValue({ ...saved, name: 'Kerry B', token: 't' });
    render(<LeadMessage token="t" editing={saved} onSaved={onSaved} onCancel={vi.fn()} />);

    expect(screen.getByLabelText('Time')).toHaveValue('10:00');
    await user.type(screen.getByLabelText('Name'), ' B');
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));

    expect(saveLead).toHaveBeenLastCalledWith(expect.objectContaining({ name: 'Kerry B' }), 'pending', 'lead-3', 't', expect.any(Function));
    expect(onSaved).toHaveBeenCalledWith(expect.objectContaining({ id: 'lead-3', name: 'Kerry B' }));
  });
});
