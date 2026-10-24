import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
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

  it('lists the suburb pages in a Popular Links dropdown under the map', () => {
    const { container } = render(<Footer />);
    const map = screen.getByRole('button', { name: 'Show map' });
    const details = container.querySelector('details') as HTMLElement;
    expect(within(details).getByText('Popular Links').tagName).toBe('SUMMARY');
    expect(map.compareDocumentPosition(details) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    for (const [name, href] of [
      ['Locksmith Albany', '/locksmith/albany'],
      ['Locksmith Takapuna', '/locksmith/takapuna'],
      ['Locksmith Henderson', '/locksmith/henderson'],
      ['Locksmith New Lynn', '/locksmith/new-lynn'],
      ['Locksmith Birkenhead', '/locksmith/birkenhead'],
      ['Locksmith Titirangi', '/locksmith/titirangi'],
      ['Locksmith Blockhouse Bay', '/locksmith/blockhouse-bay'],
      ['Locksmith East Tamaki', '/locksmith/east-tamaki'],
      ['Locksmith Flat Bush', '/locksmith/flat-bush'],
      ['Locksmith Karaka', '/locksmith/karaka'],
    ]) {
      expect(within(details).getByRole('link', { name, hidden: true })).toHaveAttribute('href', href);
    }
    expect(within(details).getByText('North Shore')).toBeInTheDocument();
    expect(within(details).getByText('West Auckland')).toBeInTheDocument();
    expect(within(details).getByText('East Auckland')).toBeInTheDocument();
    expect(within(details).getByText('South Auckland')).toBeInTheDocument();
  });

  it('links and embeds the Google Business profile', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Falcon Access Locksmith' })).toHaveAttribute('href', 'https://www.google.com/maps?cid=5329156453652255336');
    // The map only loads on request, so the Google embed is not fetched on page load
    expect(screen.queryByTitle('Falcon Access Locksmith Location Map')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show map' }));
    expect(screen.getByTitle('Falcon Access Locksmith Location Map').getAttribute('src')).toContain('0x874f32ad50f5c01f%3A0x49f4f78f3c6c5268');
  });
});
