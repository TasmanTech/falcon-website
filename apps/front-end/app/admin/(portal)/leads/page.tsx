import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { ACCESS_COOKIE } from "@/lib/auth";
import LeadMessage from "./LeadMessage";

export const metadata: Metadata = {
  title: "Lead Message",
  robots: { index: false, follow: false },
};

/**
 * Reads the access token (refreshed by the proxy for this request) and renders the form.
 *
 * @returns {Promise<JSX.Element>} The lead form.
 */
async function LeadMessageWithSession() {
  // Empty only when the proxy could not reach the back-end; the client then renews it itself
  const token = (await cookies()).get(ACCESS_COOKIE)?.value ?? "";
  return <LeadMessage token={token} />;
}

/**
 * Placeholder shown until the form renders.
 *
 * @returns {JSX.Element} A skeleton of the form.
 */
function LeadMessageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Loading">
      <div className="h-7 w-40 rounded-lg bg-slate-200" />
      <div className="h-96 rounded-2xl bg-slate-200" />
      <div className="h-48 rounded-2xl bg-slate-200" />
    </div>
  );
}

/**
 * Builds a lead message to paste into Telegram and saves the lead to history.
 * Suspense keeps the form (which defaults to today's date) out of the prerender.
 *
 * @returns {JSX.Element} The page.
 */
export default function LeadMessagePage() {
  return (
    <Suspense fallback={<LeadMessageSkeleton />}>
      <LeadMessageWithSession />
    </Suspense>
  );
}
