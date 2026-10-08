import { useEffect, useRef, type RefObject } from "react";
import { ServerUnreachableError } from "./invoice";

/** Route handler that renews the session (`app/api/session/refresh/route.ts`). */
export const SESSION_REFRESH_PATH = "/api/session/refresh";

/** Renew the access token this long before it expires. */
const EXPIRY_MARGIN_MS = 60 * 1000;

/** Wait this long before retrying a background renewal that could not reach the server. */
const RETRY_DELAY_MS = 30 * 1000;

/** Never renew more often than this, whatever the token says. */
const MIN_RENEW_INTERVAL_MS = 30 * 1000;

let inFlight: Promise<string | null> | null = null;
const listeners = new Set<(token: string) => void>();

/**
 * Reads how long a JWT is valid for (`exp - iat`) without verifying it (the back-end does that).
 * Using the lifetime rather than `exp` keeps renewal on time even when the device clock is wrong.
 *
 * @param {string} token - The access token.
 * @returns {number | null} Lifetime in milliseconds, or null if the token cannot be read.
 */
export function tokenLifetimeMs(token: string): number | null {
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const data: unknown = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    if (
      data &&
      typeof data === "object" &&
      "exp" in data &&
      "iat" in data &&
      typeof data.exp === "number" &&
      typeof data.iat === "number"
    ) {
      return (data.exp - data.iat) * 1000;
    }
  } catch {
    // Malformed token: renew it straight away
  }
  return null;
}

/**
 * When a token received at `receivedAt` should be renewed: a minute before it expires, and never
 * sooner than `minDelay`. An empty or unreadable token is due as soon as `minDelay` allows.
 */
function renewalTime(token: string, receivedAt: number, minDelay: number): number {
  const lifetime = tokenLifetimeMs(token) ?? 0;
  return receivedAt + Math.max(lifetime - EXPIRY_MARGIN_MS, minDelay);
}

async function requestRefresh(): Promise<string | null> {
  let res: Response;
  try {
    res = await fetch(SESSION_REFRESH_PATH, { method: "POST", credentials: "same-origin", cache: "no-store" });
  } catch {
    throw new ServerUnreachableError();
  }
  if (res.status === 401) return null;
  if (!res.ok) throw new ServerUnreachableError();

  const data: unknown = await res.json().catch(() => null);
  if (!(data && typeof data === "object" && "accessToken" in data && typeof data.accessToken === "string")) {
    throw new ServerUnreachableError();
  }
  const token = data.accessToken;
  listeners.forEach((listener) => listener(token));
  return token;
}

/**
 * Renews the session from the refresh token cookie. Concurrent calls share one request, and every
 * component using {@link useSessionToken} receives the new token.
 *
 * @returns {Promise<string | null>} The new access token, or null if the session has ended.
 * @throws {ServerUnreachableError} If the server cannot be reached (the session is kept).
 */
export function refreshSession(): Promise<string | null> {
  inFlight ??= requestRefresh().finally(() => {
    inFlight = null;
  });
  return inFlight;
}

/**
 * Holds the portal's access token and keeps it fresh, so an admin who leaves a page open is
 * never blocked by an expired token. It renews the token in the background shortly before it
 * expires while the page is visible, and straight away when the admin returns to the tab, the
 * window regains focus or the device comes back online. Requests still retry once after a 401
 * through `authorisedFetch`, so this is a head start, not the only safeguard.
 *
 * A failed background renewal never interrupts the admin: an unreachable server is retried
 * later, and an ended session is reported by the next request they make.
 *
 * @param {string} initialToken - The token rendered by the server (empty if it could not refresh).
 * @returns {RefObject<string>} A ref whose `current` is always the latest access token.
 */
export function useSessionToken(initialToken: string): RefObject<string> {
  const tokenRef = useRef(initialToken);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let ended = false;
    let renewAt = renewalTime(tokenRef.current, Date.now(), 0);

    const renewIfDue = (): void => {
      clearTimeout(timer);
      if (ended || document.visibilityState === "hidden") return; // renewed on return instead
      if (Date.now() < renewAt) {
        schedule();
        return;
      }
      refreshSession()
        .then((token) => {
          if (!token) ended = true;
        })
        .catch(() => {
          timer = setTimeout(renewIfDue, RETRY_DELAY_MS);
        });
    };

    function schedule(): void {
      clearTimeout(timer);
      timer = setTimeout(renewIfDue, Math.max(0, renewAt - Date.now()));
    }

    const onToken = (token: string): void => {
      tokenRef.current = token;
      ended = false;
      renewAt = renewalTime(token, Date.now(), MIN_RENEW_INTERVAL_MS);
      schedule();
    };

    const onVisibilityChange = (): void => {
      if (document.visibilityState === "visible") renewIfDue();
    };

    listeners.add(onToken);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", renewIfDue);
    window.addEventListener("online", renewIfDue);
    window.addEventListener("pageshow", renewIfDue);
    schedule();

    return () => {
      clearTimeout(timer);
      listeners.delete(onToken);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", renewIfDue);
      window.removeEventListener("online", renewIfDue);
      window.removeEventListener("pageshow", renewIfDue);
    };
  }, []);

  return tokenRef;
}
