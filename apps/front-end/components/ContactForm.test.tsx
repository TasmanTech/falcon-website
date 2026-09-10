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

  it('renders form inputs', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Service Needed'), { target: { value: 'general' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Help' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Thank you! We will get back to you shortly.')).toBeInTheDocument();
    });
  });
});
