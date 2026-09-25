"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE_SECONDS,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE_SECONDS,
  SessionTokens,
  loginWithBackend,
  refreshWithBackend,
  sessionCookieOptions,
} from "@/lib/auth";

/** State returned to the login form by {@link loginAction}. */
export interface LoginState {
  error: string | null;
}

/**
 * Stores a token pair in the session cookies.
 */
async function storeSession(tokens: SessionTokens): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE, tokens.accessToken, sessionCookieOptions(ACCESS_MAX_AGE_SECONDS));
  if (tokens.refreshToken) {
    cookieStore.set(REFRESH_COOKIE, tokens.refreshToken, sessionCookieOptions(REFRESH_MAX_AGE_SECONDS));
  }
}

/**
 * Logs the admin in and redirects to the portal.
 *
 * @param {LoginState} _prevState - The previous form state (unused).
 * @param {FormData} formData - Must contain `email` and `password`.
 * @returns {Promise<LoginState>} An error message when login fails; redirects on success.
 */
export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  let tokens: SessionTokens | null;
  try {
    tokens = await loginWithBackend(email, password);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not reach the server." };
  }

  if (!tokens) {
    return { error: "Incorrect email or password." };
  }

  await storeSession(tokens);
  redirect("/admin");
}

/**
 * Clears the session cookies and returns to the login page.
 *
 * @returns {Promise<never>} Always redirects.
 */
export async function logoutAction(): Promise<never> {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
  redirect("/admin/login");
}

/**
 * Issues a fresh access token from the refresh token cookie. The invoice form calls this
 * when the back-end rejects an expired token, so a long-open form is never lost.
 *
 * @returns {Promise<string | null>} The new access token, or null if the session has ended.
 */
export async function refreshAccessTokenAction(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return null;

  const tokens = await refreshWithBackend(refreshToken);
  if (!tokens) return null;

  await storeSession(tokens);
  return tokens.accessToken;
}
