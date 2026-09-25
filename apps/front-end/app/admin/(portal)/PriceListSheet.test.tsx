import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PriceListSheet from './PriceListSheet';

describe('PriceListSheet', () => {
  it('lists job sheet prices, marking TBD and free items', () => {
    render(<PriceListSheet onSelect={vi.fn()} onClose={vi.fn()} />);

    expect(screen.getByRole('button', { name: /Lockout – Advanced Lock.*\$369\.00/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Car Lockout \/ Safe Opening.*TBD/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /90 Days.*Free/ })).toBeInTheDocument();
  });

  it('selects a preset', () => {
    const onSelect = vi.fn();
    render(<PriceListSheet onSelect={onSelect} onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Service Call/ }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ title: 'Service Call', rate: 20 }));
  });

  it('closes on Escape, the close button and the backdrop', () => {
    const onClose = vi.fn();
    render(<PriceListSheet onSelect={vi.fn()} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close price list' }));
    expect(onClose).toHaveBeenCalledTimes(3);
  });
});
