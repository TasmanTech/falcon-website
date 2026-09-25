import type { CookieOptions } from 'express';

/** Name of the HttpOnly cookie that carries the refresh token. */
export const REFRESH_COOKIE = 'refreshToken';

/** Lifetime of an access token. Short, because the front-end refreshes it on demand. */
export const ACCESS_TOKEN_TTL = '15m';

/** Lifetime of a refresh token, and of the cookie that holds it. */
export const REFRESH_TOKEN_TTL = '7d';
export const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Cookie options for the refresh token. In production the cookie is scoped to
 * `.falconaccess.co.nz` so both the website and the API subdomain can see it.
 *
 * @returns {CookieOptions} Options for `res.cookie` / `res.clearCookie`.
 */
export function refreshCookieOptions(): CookieOptions {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    domain: isProduction ? '.falconaccess.co.nz' : undefined,
    path: '/',
  };
}
