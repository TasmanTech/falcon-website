import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const refreshWithBackend = vi.fn();
vi.mock('@/lib/auth', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/auth')>()),
  refreshWithBackend: (...args: unknown[]) => refreshWithBackend(...args),
}));

const { proxy } = await import('./proxy');

function requestFor(path: string, refreshToken?: string, accessToken?: string): NextRequest {
  const cookies = [
    refreshToken ? `refreshToken=${refreshToken}` : '',
    accessToken ? `accessToken=${accessToken}` : '',
  ].filter(Boolean);
  return new NextRequest(`https://falconaccess.co.nz${path}`, {
    headers: cookies.length ? { cookie: cookies.join('; ') } : {},
  });
}

/** An unsigned JWT issued `ageSeconds` ago with a 15-minute lifetime. */
function accessTokenAged(ageSeconds: number): string {
  const iat = Math.floor(Date.now() / 1000) - ageSeconds;
  const payload = btoa(JSON.stringify({ sub: 1, iat, exp: iat + 900 })).replace(/=+$/, '');
  return `header.${payload}.signature`;
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
    refreshWithBackend.mockResolvedValue({ status: 'rejected' });
    const res = await proxy(requestFor('/admin/invoices', 'bad'));
    expect(res.headers.get('location')).toBe('https://falconaccess.co.nz/admin/login');
    expect(res.cookies.get('refreshToken')?.value).toBe('');
  });

  it('keeps the session and lets the page load when the back-end is unreachable', async () => {
    refreshWithBackend.mockResolvedValue({ status: 'unavailable' });
    const res = await proxy(requestFor('/admin/invoices', 'good'));
    expect(res.headers.get('location')).toBeNull();
    expect(res.cookies.get('refreshToken')).toBeUndefined();
    expect(res.cookies.get('accessToken')).toBeUndefined();
  });

  it('sends signed-in admins from the login page to the portal', async () => {
    refreshWithBackend.mockResolvedValue({ status: 'ok', tokens: { accessToken: 'access', refreshToken: 'rotated' } });
    const res = await proxy(requestFor('/admin/login', 'good'));
    expect(res.headers.get('location')).toBe('https://falconaccess.co.nz/admin');
    expect(res.cookies.get('refreshToken')?.value).toBe('rotated');
  });

  it('refreshes the session and forwards the new access token to the page', async () => {
    refreshWithBackend.mockResolvedValue({ status: 'ok', tokens: { accessToken: 'access', refreshToken: 'rotated' } });
    const res = await proxy(requestFor('/admin', 'good'));

    expect(res.headers.get('location')).toBeNull();
    expect(res.cookies.get('accessToken')?.value).toBe('access');
    expect(res.headers.get('x-middleware-request-cookie')).toContain('accessToken=access');
    expect(refreshWithBackend).toHaveBeenCalledWith('good', { attempts: 1, timeoutMs: 2500 });
  });

  it('reuses an access token issued moments ago without calling the back-end', async () => {
    const res = await proxy(requestFor('/admin/invoices', 'good', accessTokenAged(5)));
    expect(refreshWithBackend).not.toHaveBeenCalled();
    expect(res.headers.get('location')).toBeNull();
    expect(res.cookies.get('accessToken')).toBeUndefined();
  });

  it('sends a signed-in admin with a fresh token from the login page without calling the back-end', async () => {
    const res = await proxy(requestFor('/admin/login', 'good', accessTokenAged(5)));
    expect(refreshWithBackend).not.toHaveBeenCalled();
    expect(res.headers.get('location')).toBe('https://falconaccess.co.nz/admin');
  });

  it('refreshes an older access token', async () => {
    refreshWithBackend.mockResolvedValue({ status: 'ok', tokens: { accessToken: 'access', refreshToken: 'rotated' } });
    await proxy(requestFor('/admin', 'good', accessTokenAged(120)));
    expect(refreshWithBackend).toHaveBeenCalledOnce();
  });
});
