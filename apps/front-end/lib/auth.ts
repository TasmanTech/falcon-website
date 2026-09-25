/** HttpOnly cookie holding the long-lived refresh token (7 days). */
export const REFRESH_COOKIE = "refreshToken";

/** HttpOnly cookie holding the short-lived access token (15 minutes). */
export const ACCESS_COOKIE = "accessToken";

export const REFRESH_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
export const ACCESS_MAX_AGE_SECONDS = 15 * 60;

/** A token pair returned by the back-end's login or refresh endpoints. */
export interface SessionTokens {
  accessToken: string;
  refreshToken: string | null;
}

/**
 * Returns the back-end base URL for server-side requests.
 * `localhost` is swapped for `127.0.0.1` because Node may resolve it to IPv6 first.
 *
 * @returns {string} The back-end URL without a trailing slash.
 */
export function serverBackendUrl(): string {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "http://localhost:3001";
  return url.replace("localhost", "127.0.0.1").replace(/\/$/, "");
}

/**
 * Shared options for the session cookies set by the Next.js server.
 *
 * @param {number} maxAge - Cookie lifetime in seconds.
 * @returns Cookie options for `cookies().set` / `response.cookies.set`.
 */
export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

/**
 * Pulls the rotated refresh token out of a back-end response's `Set-Cookie` headers.
 *
 * @param {Response} res - The back-end response.
 * @returns {string | null} The refresh token, or null if none was set.
 */
export function extractRefreshToken(res: Response): string | null {
  const headers =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()
      : [res.headers.get("set-cookie") ?? ""];
  for (const header of headers) {
    const match = header.match(new RegExp(`(?:^|,\\s*)${REFRESH_COOKIE}=([^;]+)`));
    if (match) return match[1];
  }
  return null;
}

/**
 * Reads the access token from a login/refresh response body.
 *
 * @param {Response} res - A successful back-end response.
 * @returns {Promise<string | null>} The access token, or null if the body is malformed.
 */
async function readAccessToken(res: Response): Promise<string | null> {
  const data: unknown = await res.json().catch(() => null);
  if (data && typeof data === "object" && "accessToken" in data && typeof data.accessToken === "string") {
    return data.accessToken;
  }
  return null;
}

/**
 * Logs in against the back-end (server-side only).
 *
 * @param {string} email - The admin email.
 * @param {string} password - The admin password.
 * @returns {Promise<SessionTokens | null>} Tokens on success, null for bad credentials.
 * @throws {Error} If the back-end cannot be reached or rejects the request for another reason.
 */
export async function loginWithBackend(email: string, password: string): Promise<SessionTokens | null> {
  const res = await fetch(`${serverBackendUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  if (res.status === 401 || res.status === 400) return null;
  if (res.status === 429) throw new Error("Too many attempts. Please wait a minute and try again.");
  if (!res.ok) throw new Error("Login is unavailable right now. Please try again shortly.");

  const accessToken = await readAccessToken(res);
  if (!accessToken) throw new Error("Unexpected response from the server.");
  return { accessToken, refreshToken: extractRefreshToken(res) };
}

/**
 * Exchanges a refresh token for a new token pair (server-side only).
 *
 * @param {string} refreshToken - The current refresh token.
 * @returns {Promise<SessionTokens | null>} New tokens, or null if the session is no longer valid.
 */
export async function refreshWithBackend(refreshToken: string): Promise<SessionTokens | null> {
  try {
    const res = await fetch(`${serverBackendUrl()}/auth/refresh`, {
      method: "POST",
      headers: { Cookie: `${REFRESH_COOKIE}=${refreshToken}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const accessToken = await readAccessToken(res);
    return accessToken ? { accessToken, refreshToken: extractRefreshToken(res) } : null;
  } catch (error) {
    console.error("Session refresh failed", error);
    return null;
  }
}
