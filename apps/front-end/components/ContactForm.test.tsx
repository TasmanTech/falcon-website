import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';

describe('ContactForm Component', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const fillForm = (phone: string) => {
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: phone } });
    fireEvent.change(screen.getByLabelText('Service Needed'), { target: { value: 'general' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Help' } });
  };

  it('renders form inputs', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeRequired();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('submits form successfully with the phone number', async () => {
    render(<ContactForm />);
    fillForm('021 123 4567');

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText('Thank you! We will get back to you shortly.')).toBeInTheDocument();
    });
    const body = JSON.parse((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body);
    expect(body.phone).toBe('021 123 4567');
  });

  it('blocks submission and shows an error for a non-NZ phone number', () => {
    render(<ContactForm />);
    fillForm('+61 412 345 678');

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(screen.getByText(/Please enter a valid NZ phone number/)).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toHaveAttribute('aria-invalid', 'true');
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
