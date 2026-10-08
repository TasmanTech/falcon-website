import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
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

  it('lists each service page indented under its hub page', () => {
    render(<Footer />);
    const lockHub = screen.getByRole('link', { name: 'Lock Services' }).closest('li') as HTMLElement;
    const nested = within(lockHub).getByRole('list');
    expect(within(nested).getByRole('link', { name: 'Rekey' })).toHaveAttribute('href', '/lock/rekey');
    expect(within(nested).getByRole('link', { name: 'Lock Repair' })).toHaveAttribute('href', '/lock/lock-repair');
    const smartHub = screen.getByRole('link', { name: 'Smart Lock Services' }).closest('li') as HTMLElement;
    expect(within(smartHub).getByRole('link', { name: 'Smart Lock Installation' })).toHaveAttribute('href', '/smart-lock/smart-lock-installation');
    const autoHub = screen.getByRole('link', { name: 'Auto Services' }).closest('li') as HTMLElement;
    expect(within(autoHub).getByRole('link', { name: 'Dead Battery Assistance' })).toHaveAttribute('href', '/auto/dead-battery-assistance');
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
