import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeadOutcomeModal from './LeadOutcomeModal';

describe('LeadOutcomeModal', () => {
  it('asks for the three prices with a NZ$20 call-out by default', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<LeadOutcomeModal status="closed" leadLabel="Kerry" onConfirm={onConfirm} onCancel={vi.fn()} />);

    expect(screen.getByRole('dialog', { name: 'Close Lead' })).toHaveTextContent('Kerry');
    expect(screen.getByLabelText('Call-out price ($) *')).toHaveValue(20);

    await user.click(screen.getByRole('button', { name: 'Mark Closed' }));
    expect(onConfirm).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText('Paid price ($) *'), '199.99');
    await user.type(screen.getByLabelText('Part price ($) *'), '0');
    await user.clear(screen.getByLabelText('Call-out price ($) *'));
    await user.type(screen.getByLabelText('Call-out price ($) *'), '0');
    await user.click(screen.getByRole('button', { name: 'Mark Closed' }));

    expect(onConfirm).toHaveBeenCalledWith({ status: 'closed', paidPrice: 199.99, partPrice: 0, calloutPrice: 0 });
  });

  it('starts from saved prices', () => {
    render(
      <LeadOutcomeModal
        status="closed"
        initial={{ status: 'closed', paidPrice: 180, partPrice: 35, calloutPrice: 40 }}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByLabelText('Paid price ($) *')).toHaveValue(180);
    expect(screen.getByLabelText('Part price ($) *')).toHaveValue(35);
    expect(screen.getByLabelText('Call-out price ($) *')).toHaveValue(40);
  });

  it('requires a cancellation reason and offers common ones', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<LeadOutcomeModal status="cancelled" onConfirm={onConfirm} onCancel={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Mark Cancelled' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Out of our area' }));
    expect(screen.getByLabelText('Cancellation reason *')).toHaveValue('Out of our area');
    await user.type(screen.getByLabelText('Cancellation reason *'), ' (Pukekohe)');
    await user.click(screen.getByRole('button', { name: 'Mark Cancelled' }));

    expect(onConfirm).toHaveBeenCalledWith({ status: 'cancelled', cancellationReason: 'Out of our area (Pukekohe)' });
  });

  it('closes on Back, the backdrop or Escape', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<LeadOutcomeModal status="cancelled" onConfirm={vi.fn()} onCancel={onCancel} />);

    await user.click(screen.getByRole('button', { name: 'Back' }));
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    await user.keyboard('{Escape}');

    expect(onCancel).toHaveBeenCalledTimes(3);
  });
});
