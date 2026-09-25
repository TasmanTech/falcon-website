import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SiteChrome from './SiteChrome';

const usePathname = vi.fn();
vi.mock('next/navigation', () => ({ usePathname: () => usePathname() }));

describe('SiteChrome', () => {
  it('shows the chrome on public pages', () => {
    usePathname.mockReturnValue('/contact');
    render(<SiteChrome><p>Navbar</p></SiteChrome>);
    expect(screen.getByText('Navbar')).toBeInTheDocument();
  });

  it.each(['/admin', '/admin/login', '/admin/invoices'])('hides the chrome on %s', (path) => {
    usePathname.mockReturnValue(path);
    render(<SiteChrome><p>Navbar</p></SiteChrome>);
    expect(screen.queryByText('Navbar')).not.toBeInTheDocument();
  });

  it('does not treat similarly named public pages as admin', () => {
    usePathname.mockReturnValue('/administration');
    render(<SiteChrome><p>Navbar</p></SiteChrome>);
    expect(screen.getByText('Navbar')).toBeInTheDocument();
  });
});
