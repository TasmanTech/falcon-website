import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CTASection from './CTASection';

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>
}));

describe('CTASection Component', () => {
  it('renders the default catchy CTA with centred text and extra padding', () => {
    const { container } = render(<CTASection />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-brand-catchy', 'py-24', 'md:py-32');
    expect(screen.getByRole('heading', { level: 2 }).parentElement).toHaveClass('text-center');
    expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '/contact');
  });

  it('renders custom copy and link', () => {
    render(<CTASection title="Locked Out?" description="We can help." buttonText="Call Now" buttonHref="tel:+6492431404" theme="dark" />);
    expect(screen.getByRole('heading', { name: 'Locked Out?' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Call Now' })).toHaveAttribute('href', 'tel:+6492431404');
  });
});
