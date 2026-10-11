import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  extractRefreshToken,
  isFreshAccessToken,
  loginWithBackend,
  refreshWithBackend,
  serverBackendUrl,
} from './auth';

function jsonResponse(body: unknown, init: ResponseInit & { setCookie?: string } = {}): Response {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (init.setCookie) headers.append('set-cookie', init.setCookie);
  return new Response(JSON.stringify(body), { status: init.status ?? 200, headers });
}

describe('lib/auth', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('serverBackendUrl swaps localhost for 127.0.0.1 and trims the trailing slash', () => {
    vi.stubEnv('NEXT_PUBLIC_BACKEND_URL', 'http://localhost:3001/');
    expect(serverBackendUrl()).toBe('http://127.0.0.1:3001');
  });

  it('extractRefreshToken reads the rotated cookie', () => {
    const res = jsonResponse({}, { setCookie: 'refreshToken=abc.def; Path=/; HttpOnly' });
    expect(extractRefreshToken(res)).toBe('abc.def');
    expect(extractRefreshToken(jsonResponse({}))).toBeNull();
  });

  describe('loginWithBackend', () => {
    it('returns tokens on success', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(
        jsonResponse({ accessToken: 'access' }, { setCookie: 'refreshToken=refresh; Path=/' }),
      );
      await expect(loginWithBackend('a@b.co', 'pw')).resolves.toEqual({ accessToken: 'access', refreshToken: 'refresh' });
    });

    it('returns null for bad credentials', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(jsonResponse({}, { status: 401 }));
      await expect(loginWithBackend('a@b.co', 'wrong')).resolves.toBeNull();
    });

    it('explains rate limiting', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(jsonResponse({}, { status: 429 }));
      await expect(loginWithBackend('a@b.co', 'pw')).rejects.toThrow(/Too many attempts/);
    });
  });

  describe('isFreshAccessToken', () => {
    const now = 1_800_000_000_000;
    const token = (iat: number, exp = iat + 900) =>
      `h.${btoa(JSON.stringify({ iat, exp })).replace(/=+$/, '')}.s`;

    it('accepts a token issued in the last 30 seconds', () => {
      expect(isFreshAccessToken(token(now / 1000 - 10), now)).toBe(true);
    });

    it('rejects an older, expired, missing or malformed token', () => {
      expect(isFreshAccessToken(token(now / 1000 - 60), now)).toBe(false);
      expect(isFreshAccessToken(token(now / 1000 - 10, now / 1000 - 1), now)).toBe(false);
      expect(isFreshAccessToken(undefined, now)).toBe(false);
      expect(isFreshAccessToken('not-a-jwt', now)).toBe(false);
      expect(isFreshAccessToken('h.!!!.s', now)).toBe(false);
    });
  });

  describe('refreshWithBackend', () => {
    it('sends the refresh cookie and returns new tokens', async () => {
      const fetchMock = vi
        .spyOn(global, 'fetch')
        .mockResolvedValue(jsonResponse({ accessToken: 'new' }, { setCookie: 'refreshToken=rotated; Path=/' }));

      await expect(refreshWithBackend('old')).resolves.toEqual({
        status: 'ok',
        tokens: { accessToken: 'new', refreshToken: 'rotated' },
      });
      const init = fetchMock.mock.calls[0][1] as RequestInit;
      expect(init.headers).toEqual({ Cookie: 'refreshToken=old' });
      expect(init.signal).toBeInstanceOf(AbortSignal);
    });

    it.each([400, 401, 403])('reports a %i as a rejected session without retrying', async (status) => {
      const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(jsonResponse({}, { status }));
      await expect(refreshWithBackend('bad')).resolves.toEqual({ status: 'rejected' });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('retries a network failure once, then reports the back-end as unavailable (not a logout)', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const fetchMock = vi.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'));
      await expect(refreshWithBackend('x')).resolves.toEqual({ status: 'unavailable' });
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('treats a server error as unavailable and recovers on the retry', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      vi.spyOn(global, 'fetch')
        .mockResolvedValueOnce(jsonResponse({}, { status: 503 }))
        .mockResolvedValueOnce(jsonResponse({ accessToken: 'new' }));
      await expect(refreshWithBackend('x')).resolves.toEqual({
        status: 'ok',
        tokens: { accessToken: 'new', refreshToken: null },
      });
    });

    it('honours a custom attempt count and timeout', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      const timeout = vi.spyOn(AbortSignal, 'timeout');
      const fetchMock = vi.spyOn(global, 'fetch').mockRejectedValue(new Error('timeout'));
      await expect(refreshWithBackend('x', { attempts: 1, timeoutMs: 2500 })).resolves.toEqual({
        status: 'unavailable',
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(timeout).toHaveBeenCalledWith(2500);
    });
  });
});
