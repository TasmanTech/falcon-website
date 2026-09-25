import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const refreshWithBackend = vi.fn();
vi.mock('@/lib/auth', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/auth')>()),
  refreshWithBackend: (token: string) => refreshWithBackend(token),
}));

const { proxy } = await import('./proxy');

function requestFor(path: string, refreshToken?: string): NextRequest {
  return new NextRequest(`https://falconaccess.co.nz${path}`, {
    headers: refreshToken ? { cookie: `refreshToken=${refreshToken}` } : {},
  });
}

describe('proxy', () => {
  beforeEach(() => {
    refreshWithBackend.mockReset();
  });

  it('sends visitors without a session to the login page', async () => {
    const res = await proxy(requestFor('/admin'));
    expect(res.headers.get('location')).toBe('https://falconaccess.co.nz/admin/login');
  });

  it('lets visitors without a session see the login page', async () => {
    const res = await proxy(requestFor('/admin/login'));
    expect(res.headers.get('location')).toBeNull();
  });

  it('clears an invalid session and redirects to login', async () => {
    refreshWithBackend.mockResolvedValue(null);
    const res = await proxy(requestFor('/admin/invoices', 'bad'));
    expect(res.headers.get('location')).toBe('https://falconaccess.co.nz/admin/login');
    expect(res.cookies.get('refreshToken')?.value).toBe('');
  });

  it('sends signed-in admins from the login page to the portal', async () => {
    refreshWithBackend.mockResolvedValue({ accessToken: 'access', refreshToken: 'rotated' });
    const res = await proxy(requestFor('/admin/login', 'good'));
    expect(res.headers.get('location')).toBe('https://falconaccess.co.nz/admin');
    expect(res.cookies.get('refreshToken')?.value).toBe('rotated');
  });

  it('refreshes the session and forwards the new access token to the page', async () => {
    refreshWithBackend.mockResolvedValue({ accessToken: 'access', refreshToken: 'rotated' });
    const res = await proxy(requestFor('/admin', 'good'));

    expect(res.headers.get('location')).toBeNull();
    expect(res.cookies.get('accessToken')?.value).toBe('access');
    expect(res.headers.get('x-middleware-request-cookie')).toContain('accessToken=access');
  });
});
