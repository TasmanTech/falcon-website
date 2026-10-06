import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

vi.mock('next/image', () => ({
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
  default: (props: Record<string, unknown>) => <img {...props} />
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...rest}>{children}</a>
}));

vi.mock('./CopyrightYear', () => ({
  default: () => <>2026</>
}));

describe('Footer Component', () => {
  it('renders footer links and copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
    expect(screen.getByText('Car Lockout')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('links to the Facebook and Instagram profiles and not Twitter', () => {
    render(<Footer />);
    const facebook = screen.getByRole('link', { name: 'Falcon Access on Facebook' });
    const instagram = screen.getByRole('link', { name: 'Falcon Access on Instagram' });
    expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/falconaccessnz');
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/falconaccess/');
    expect(facebook).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.queryByText(/Twitter/)).toBeNull();
  });

  it('links and embeds the Google Business profile', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Falcon Access' })).toHaveAttribute('href', 'https://www.google.com/maps?cid=14340846117585175277');
    expect(screen.getByTitle('Falcon Access Location Map').getAttribute('src')).toContain('0x6528990332c1aad5%3A0xc704eb90193442ed');
  });
});
