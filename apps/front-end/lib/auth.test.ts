import { describe, it, expect, vi, afterEach } from 'vitest';
import { extractRefreshToken, loginWithBackend, refreshWithBackend, serverBackendUrl } from './auth';

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

  describe('refreshWithBackend', () => {
    it('sends the refresh cookie and returns new tokens', async () => {
      const fetchMock = vi
        .spyOn(global, 'fetch')
        .mockResolvedValue(jsonResponse({ accessToken: 'new' }, { setCookie: 'refreshToken=rotated; Path=/' }));

      await expect(refreshWithBackend('old')).resolves.toEqual({ accessToken: 'new', refreshToken: 'rotated' });
      const init = fetchMock.mock.calls[0][1] as RequestInit;
      expect(init.headers).toEqual({ Cookie: 'refreshToken=old' });
    });

    it('returns null when the session is invalid or the network fails', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValueOnce(jsonResponse({}, { status: 401 }));
      await expect(refreshWithBackend('bad')).resolves.toBeNull();

      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('offline'));
      await expect(refreshWithBackend('x')).resolves.toBeNull();
    });
  });
});
