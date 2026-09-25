import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE_SECONDS,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE_SECONDS,
  SessionTokens,
  refreshWithBackend,
  sessionCookieOptions,
} from "@/lib/auth";

const LOGIN_PATH = "/admin/login";

/**
 * Stores a fresh token pair on the outgoing response.
 */
function setSessionCookies(response: NextResponse, tokens: SessionTokens): NextResponse {
  response.cookies.set(ACCESS_COOKIE, tokens.accessToken, sessionCookieOptions(ACCESS_MAX_AGE_SECONDS));
  if (tokens.refreshToken) {
    response.cookies.set(REFRESH_COOKIE, tokens.refreshToken, sessionCookieOptions(REFRESH_MAX_AGE_SECONDS));
  }
  return response;
}

/**
 * Removes both session cookies from the outgoing response.
 */
function clearSessionCookies(response: NextResponse): NextResponse {
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}

/**
 * Guards the admin portal. On every `/admin` request the refresh token is exchanged for a
 * new token pair, so pages always receive a valid access token:
 * - no or invalid session: `/admin/*` redirects to the login page;
 * - valid session on the login page: redirects to `/admin`;
 * - valid session elsewhere: the new access token is forwarded to the page and stored.
 *
 * @param {NextRequest} request - The incoming request.
 * @returns {Promise<NextResponse>} The response to continue with.
 */
export async function proxy(request: NextRequest): Promise<NextResponse> {
  const isLoginPage = request.nextUrl.pathname === LOGIN_PATH;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return isLoginPage ? NextResponse.next() : NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  const tokens = await refreshWithBackend(refreshToken);

  if (!tokens) {
    return clearSessionCookies(
      isLoginPage ? NextResponse.next() : NextResponse.redirect(new URL(LOGIN_PATH, request.url)),
    );
  }

  if (isLoginPage) {
    return setSessionCookies(NextResponse.redirect(new URL("/admin", request.url)), tokens);
  }

  // Make the new access token visible to cookies() in the page rendering this request
  request.cookies.set(ACCESS_COOKIE, tokens.accessToken);
  return setSessionCookies(NextResponse.next({ request: { headers: request.headers } }), tokens);
}

export const config = {
  matcher: ["/admin/:path*"],
};
