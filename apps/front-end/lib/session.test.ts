import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { ServerUnreachableError } from './invoice';
import { SESSION_REFRESH_PATH, refreshSession, tokenLifetimeMs, useSessionToken } from './session';

/** Builds an unsigned JWT-shaped token valid for `lifetime` seconds, issued `skew` seconds from now. */
function tokenExpiringIn(lifetime: number, skew = 0): string {
  const iat = Math.floor(Date.now() / 1000) + skew;
  const payload = btoa(JSON.stringify({ iat, exp: iat + lifetime, n: Math.random() }))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `header.${payload}.signature`;
}

function tokenResponse(accessToken: string): Response {
  return new Response(JSON.stringify({ accessToken }), { status: 200 });
}

/** A fetch mock that answers every refresh with a new 15-minute token. */
function freshTokens() {
  return vi.spyOn(global, 'fetch').mockImplementation(async () => tokenResponse(tokenExpiringIn(900)));
}

function setVisibility(state: DocumentVisibilityState): void {
  Object.defineProperty(document, 'visibilityState', { configurable: true, value: state });
}

describe('lib/session', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    setVisibility('visible');
  });

  describe('tokenLifetimeMs', () => {
    it('reads the lifetime from a JWT payload', () => {
      expect(tokenLifetimeMs(tokenExpiringIn(900))).toBe(900 * 1000);
    });

    it('returns null for an empty or malformed token', () => {
      expect(tokenLifetimeMs('')).toBeNull();
      expect(tokenLifetimeMs('a.%%%.c')).toBeNull();
    });
  });

  describe('refreshSession', () => {
    it('posts to the refresh route and returns the new token', async () => {
      const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(tokenResponse('fresh'));
      await expect(refreshSession()).resolves.toBe('fresh');
      expect(fetchMock).toHaveBeenCalledWith(SESSION_REFRESH_PATH, expect.objectContaining({ method: 'POST' }));
    });

    it('shares one request between concurrent callers', async () => {
      const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(tokenResponse('fresh'));
      await Promise.all([refreshSession(), refreshSession(), refreshSession()]);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('returns null when the session has ended', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(new Response(null, { status: 401 }));
      await expect(refreshSession()).resolves.toBeNull();
    });

    it('throws ServerUnreachableError when offline or the back-end is down, keeping the session', async () => {
      vi.spyOn(global, 'fetch').mockRejectedValueOnce(new TypeError('Failed to fetch'));
      await expect(refreshSession()).rejects.toBeInstanceOf(ServerUnreachableError);

      vi.spyOn(global, 'fetch').mockResolvedValueOnce(new Response(null, { status: 503 }));
      await expect(refreshSession()).rejects.toBeInstanceOf(ServerUnreachableError);
    });
  });

  describe('useSessionToken', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      setVisibility('visible');
    });

    it('renews the token a minute before it expires while the page is open', async () => {
      const fetchMock = freshTokens();
      const initial = tokenExpiringIn(300);
      const { result } = renderHook(() => useSessionToken(initial));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(230 * 1000);
      });
      expect(fetchMock).not.toHaveBeenCalled();

      await act(async () => {
        await vi.advanceTimersByTimeAsync(15 * 1000);
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.current.current).not.toBe(initial);

      // The new 15-minute token is renewed 14 minutes later, not before
      await act(async () => {
        await vi.advanceTimersByTimeAsync(830 * 1000);
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      await act(async () => {
        await vi.advanceTimersByTimeAsync(20 * 1000);
      });
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('does not renew in a loop when the device clock disagrees with the server', async () => {
      const fetchMock = vi
        .spyOn(global, 'fetch')
        .mockImplementation(async () => tokenResponse(tokenExpiringIn(900, -24 * 60 * 60)));
      renderHook(() => useSessionToken(''));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(5 * 60 * 1000);
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('waits while the tab is hidden and renews as soon as the admin comes back', async () => {
      const fetchMock = freshTokens();
      setVisibility('hidden');
      renderHook(() => useSessionToken(tokenExpiringIn(30)));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
      });
      expect(fetchMock).not.toHaveBeenCalled();

      setVisibility('visible');
      await act(async () => {
        document.dispatchEvent(new Event('visibilitychange'));
        await vi.advanceTimersByTimeAsync(0);
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('renews straight away when the server rendered no token', async () => {
      const fresh = tokenExpiringIn(900);
      vi.spyOn(global, 'fetch').mockResolvedValue(tokenResponse(fresh));
      const { result } = renderHook(() => useSessionToken(''));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
      });
      expect(result.current.current).toBe(fresh);
    });

    it('retries later when the server is unreachable instead of giving up', async () => {
      const fetchMock = vi
        .spyOn(global, 'fetch')
        .mockRejectedValueOnce(new TypeError('Failed to fetch'))
        .mockResolvedValue(tokenResponse(tokenExpiringIn(900)));
      renderHook(() => useSessionToken(''));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(30 * 1000);
      });
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('stops renewing once the session has ended', async () => {
      const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(new Response(null, { status: 401 }));
      renderHook(() => useSessionToken(''));

      await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
      });
      await act(async () => {
        window.dispatchEvent(new Event('focus'));
        await vi.advanceTimersByTimeAsync(60 * 60 * 1000);
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('shares a token renewed by any request with every component', async () => {
      const fresh = tokenExpiringIn(900);
      vi.spyOn(global, 'fetch').mockResolvedValue(tokenResponse(fresh));
      const { result } = renderHook(() => useSessionToken(tokenExpiringIn(600)));

      await act(async () => {
        await refreshSession();
      });
      expect(result.current.current).toBe(fresh);
    });
  });
});
