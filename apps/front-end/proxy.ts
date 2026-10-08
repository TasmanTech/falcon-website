import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  clearSessionCookies,
  refreshWithBackend,
  setSessionCookies,
} from "@/lib/auth";

const LOGIN_PATH = "/admin/login";

/**
 * Guards the admin portal. On every `/admin` request the refresh token is exchanged for a
 * new token pair, so pages always receive a valid access token:
 * - no or invalid session: `/admin/*` redirects to the login page;
 * - back-end unreachable: the request continues with the cookies untouched, and the page
 *   renews its token itself once the back-end answers (see `lib/session.ts`);
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

  const result = await refreshWithBackend(refreshToken);

  if (result.status === "unavailable") {
    // A cold start or outage is not a logout: keep the session and let the page retry
    return NextResponse.next();
  }

  if (result.status === "rejected") {
    return clearSessionCookies(
      isLoginPage ? NextResponse.next() : NextResponse.redirect(new URL(LOGIN_PATH, request.url)),
    );
  }

  const { tokens } = result;

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
