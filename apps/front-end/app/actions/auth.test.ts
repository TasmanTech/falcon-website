import { describe, it, expect, vi, beforeEach } from 'vitest';

const cookieStore = { get: vi.fn(), set: vi.fn(), delete: vi.fn() };
vi.mock('next/headers', () => ({ cookies: async () => cookieStore }));

const redirect = vi.fn((path: string) => {
  throw new Error(`REDIRECT:${path}`);
});
vi.mock('next/navigation', () => ({ redirect: (path: string) => redirect(path) }));

const loginWithBackend = vi.fn();
const refreshWithBackend = vi.fn();
vi.mock('@/lib/auth', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/auth')>()),
  loginWithBackend: (...args: unknown[]) => loginWithBackend(...args),
  refreshWithBackend: (...args: unknown[]) => refreshWithBackend(...args),
}));

const { loginAction, logoutAction, refreshAccessTokenAction } = await import('./auth');

function form(values: Record<string, string>): FormData {
  const data = new FormData();
  Object.entries(values).forEach(([key, value]) => data.set(key, value));
  return data;
}

describe('auth actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loginAction', () => {
    it('requires both fields', async () => {
      await expect(loginAction({ error: null }, form({ email: '' }))).resolves.toEqual({
        error: 'Enter your email and password.',
      });
    });

    it('reports wrong credentials', async () => {
      loginWithBackend.mockResolvedValue(null);
      await expect(loginAction({ error: null }, form({ email: 'a@b.co', password: 'x' }))).resolves.toEqual({
        error: 'Incorrect email or password.',
      });
    });

    it('reports back-end errors', async () => {
      loginWithBackend.mockRejectedValue(new Error('Too many attempts.'));
      await expect(loginAction({ error: null }, form({ email: 'a@b.co', password: 'x' }))).resolves.toEqual({
        error: 'Too many attempts.',
      });
    });

    it('stores the session and redirects to the portal', async () => {
      loginWithBackend.mockResolvedValue({ accessToken: 'access', refreshToken: 'refresh' });

      await expect(loginAction({ error: null }, form({ email: 'a@b.co', password: 'pw' }))).rejects.toThrow(
        'REDIRECT:/admin',
      );
      expect(cookieStore.set).toHaveBeenCalledWith('accessToken', 'access', expect.objectContaining({ httpOnly: true }));
      expect(cookieStore.set).toHaveBeenCalledWith('refreshToken', 'refresh', expect.objectContaining({ httpOnly: true }));
    });
  });

  it('logoutAction clears both cookies and returns to login', async () => {
    await expect(logoutAction()).rejects.toThrow('REDIRECT:/admin/login');
    expect(cookieStore.delete).toHaveBeenCalledWith('accessToken');
    expect(cookieStore.delete).toHaveBeenCalledWith('refreshToken');
  });

  describe('refreshAccessTokenAction', () => {
    it('returns null without a refresh cookie', async () => {
      cookieStore.get.mockReturnValue(undefined);
      await expect(refreshAccessTokenAction()).resolves.toBeNull();
    });

    it('returns and stores a fresh access token', async () => {
      cookieStore.get.mockReturnValue({ value: 'refresh' });
      refreshWithBackend.mockResolvedValue({ accessToken: 'fresh', refreshToken: 'rotated' });

      await expect(refreshAccessTokenAction()).resolves.toBe('fresh');
      expect(cookieStore.set).toHaveBeenCalledWith('refreshToken', 'rotated', expect.any(Object));
    });
  });
});
