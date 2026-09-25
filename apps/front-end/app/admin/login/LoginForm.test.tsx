import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const loginAction = vi.fn();
vi.mock('@/app/actions/auth', () => ({
  loginAction: (...args: unknown[]) => loginAction(...args),
}));

const { default: LoginForm } = await import('./LoginForm');

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('submits credentials and shows the returned error', async () => {
    loginAction.mockResolvedValue({ error: 'Incorrect email or password.' });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('Email'), 'admin@falconaccess.co.nz');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Log In' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Incorrect email or password.');
    const formData = loginAction.mock.calls[0][1] as FormData;
    expect(formData.get('email')).toBe('admin@falconaccess.co.nz');
  });
});
