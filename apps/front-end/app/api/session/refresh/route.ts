import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REFRESH_COOKIE, clearSessionCookies, refreshWithBackend, setSessionCookies } from "@/lib/auth";

const NO_STORE = { "Cache-Control": "no-store" };

/**
 * Renews the admin session from the refresh token cookie and returns a new access token.
 *
 * The portal calls this from the browser (`refreshSession` in `lib/session.ts`) instead of a
 * server action because a route's URL survives deploys, while a server action's ID changes
 * with every build, so a tab left open across a deploy can still renew its session.
 *
 * - 200 `{ accessToken }`: renewed; both cookies are rotated.
 * - 401: no session or the back-end rejected it; the cookies are cleared.
 * - 503: the back-end could not be reached; the cookies are kept so a later retry can succeed.
 *
 * @returns {Promise<NextResponse>} The JSON response.
 */
export async function POST(): Promise<NextResponse> {
  const refreshToken = (await cookies()).get(REFRESH_COOKIE)?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: "Session ended" }, { status: 401, headers: NO_STORE });
  }

  const result = await refreshWithBackend(refreshToken);

  if (result.status === "unavailable") {
    return NextResponse.json({ error: "Server unavailable" }, { status: 503, headers: NO_STORE });
  }

  if (result.status === "rejected") {
    return clearSessionCookies(NextResponse.json({ error: "Session ended" }, { status: 401, headers: NO_STORE }));
  }

  return setSessionCookies(
    NextResponse.json({ accessToken: result.tokens.accessToken }, { headers: NO_STORE }),
    result.tokens,
  );
}
