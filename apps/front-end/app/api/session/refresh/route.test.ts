import { describe, it, expect, vi, beforeEach } from 'vitest';

const cookieGet = vi.fn();
vi.mock('next/headers', () => ({ cookies: async () => ({ get: cookieGet }) }));

const refreshWithBackend = vi.fn();
vi.mock('@/lib/auth', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/auth')>()),
  refreshWithBackend: (token: string) => refreshWithBackend(token),
}));

const { POST } = await import('./route');

describe('POST /api/session/refresh', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 without a refresh cookie', async () => {
    cookieGet.mockReturnValue(undefined);
    const res = await POST();
    expect(res.status).toBe(401);
    expect(refreshWithBackend).not.toHaveBeenCalled();
  });

  it('returns the new access token and rotates both cookies', async () => {
    cookieGet.mockReturnValue({ value: 'refresh' });
    refreshWithBackend.mockResolvedValue({ status: 'ok', tokens: { accessToken: 'fresh', refreshToken: 'rotated' } });

    const res = await POST();

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ accessToken: 'fresh' });
    expect(res.cookies.get('accessToken')?.value).toBe('fresh');
    expect(res.cookies.get('refreshToken')?.value).toBe('rotated');
    expect(res.headers.get('Cache-Control')).toBe('no-store');
  });

  it('clears the cookies when the back-end rejects the session', async () => {
    cookieGet.mockReturnValue({ value: 'refresh' });
    refreshWithBackend.mockResolvedValue({ status: 'rejected' });

    const res = await POST();

    expect(res.status).toBe(401);
    expect(res.cookies.get('refreshToken')?.value).toBe('');
  });

  it('keeps the cookies and returns 503 when the back-end is unreachable', async () => {
    cookieGet.mockReturnValue({ value: 'refresh' });
    refreshWithBackend.mockResolvedValue({ status: 'unavailable' });

    const res = await POST();

    expect(res.status).toBe(503);
    expect(res.cookies.get('refreshToken')).toBeUndefined();
  });
});
