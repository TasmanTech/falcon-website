import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm Component', () => {
  it('renders correctly', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Service Needed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('can submit the form', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();
    
    await user.type(screen.getByLabelText(/Full Name/i), 'Test User');
    await user.type(screen.getByLabelText(/Email Address/i), 'test@example.com');
    await user.selectOptions(screen.getByLabelText(/Service Needed/i), 'general');
    await user.type(screen.getByLabelText(/Message/i), 'Test message');
    
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    await user.click(submitButton);
    
    expect(submitButton).toHaveTextContent(/Sending.../i);
    expect(submitButton).toBeDisabled();
  });
});
