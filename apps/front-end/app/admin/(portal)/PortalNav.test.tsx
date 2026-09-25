import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PortalNav from './PortalNav';

const usePathname = vi.fn();
vi.mock('next/navigation', () => ({ usePathname: () => usePathname() }));
vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

describe('PortalNav', () => {
  it('marks the current section', () => {
    usePathname.mockReturnValue('/admin/invoices');
    render(<PortalNav />);
    expect(screen.getByRole('link', { name: 'History' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'New Invoice' })).not.toHaveAttribute('aria-current');
  });
});
