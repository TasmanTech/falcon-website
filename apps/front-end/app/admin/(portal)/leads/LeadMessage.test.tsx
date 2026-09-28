import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/lib/invoice', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/invoice')>()),
  todayInNz: () => '2026-09-28',
}));

const { default: LeadMessage } = await import('./LeadMessage');

describe('LeadMessage', () => {
  it('previews and copies the message', async () => {
    const user = userEvent.setup();
    render(<LeadMessage />);

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
    render(<LeadMessage />);

    await user.type(screen.getByLabelText('Name'), 'Jerry Li');
    await user.click(screen.getByRole('button', { name: 'New Lead' }));
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Date')).toHaveValue('2026-09-28');
  });
});
