import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/image', () => ({
  /* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
  default: (props: { priority?: boolean; [key: string]: unknown }) => {
    const imgProps = { ...props };
    delete imgProps.priority;
    return <img {...(imgProps as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));
vi.mock('next/navigation', () => ({
  usePathname: () => '/admin',
  redirect: (path: string) => {
    throw new Error(`REDIRECT:${path}`);
  },
}));
vi.mock('@/app/actions/auth', () => ({ logoutAction: vi.fn(), loginAction: vi.fn(), refreshAccessTokenAction: vi.fn() }));

const cookieGet = vi.fn();
vi.mock('next/headers', () => ({ cookies: async () => ({ get: cookieGet }) }));
vi.mock('./(portal)/InvoiceForm', () => ({ default: ({ token }: { token: string }) => <p>form:{token}</p> }));
vi.mock('./(portal)/invoices/InvoiceHistory', () => ({ default: ({ token }: { token: string }) => <p>history:{token}</p> }));

const { default: AdminLayout, metadata: adminMetadata } = await import('./layout');
const { default: AdminLoginPage } = await import('./login/page');
const { default: PortalLayout } = await import('./(portal)/layout');
const { default: AdminInvoicePage, metadata: invoiceMetadata } = await import('./(portal)/page');
const { default: InvoiceHistoryPage } = await import('./(portal)/invoices/page');

/** Resolves the async server component a page wraps in Suspense, so it can be rendered in jsdom. */
async function resolveSuspenseChild(page: React.ReactElement): Promise<React.ReactElement> {
  const child = (page.props as { children: React.ReactElement }).children;
  return (child.type as () => Promise<React.ReactElement>)();
}

describe('admin pages', () => {
  beforeEach(() => {
    cookieGet.mockReset();
  });

  it('keeps the admin area out of search engines', () => {
    expect(adminMetadata.robots).toEqual({ index: false, follow: false });
    expect(invoiceMetadata.robots).toEqual({ index: false, follow: false });
    expect(invoiceMetadata).not.toHaveProperty('description');
  });

  it('renders the admin shell', () => {
    render(<AdminLayout><p>child</p></AdminLayout>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders the login page', () => {
    render(<AdminLoginPage />);
    expect(screen.getByRole('heading', { name: 'Falcon Access Admin' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  it('renders the portal header with sign out and tabs', () => {
    render(<PortalLayout><p>page</p></PortalLayout>);
    expect(screen.getByRole('button', { name: /Sign Out/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'History' })).toBeInTheDocument();
  });

  it('passes the access token to the invoice form', async () => {
    cookieGet.mockReturnValue({ value: 'access' });
    render(await resolveSuspenseChild(AdminInvoicePage()));
    expect(screen.getByText('form:access')).toBeInTheDocument();
  });

  it('passes the access token to the history list', async () => {
    cookieGet.mockReturnValue({ value: 'access' });
    render(await resolveSuspenseChild(InvoiceHistoryPage()));
    expect(screen.getByText('history:access')).toBeInTheDocument();
  });

  it('sends visitors without an access token to login', async () => {
    cookieGet.mockReturnValue(undefined);
    await expect(resolveSuspenseChild(AdminInvoicePage())).rejects.toThrow('REDIRECT:/admin/login');
  });
});
