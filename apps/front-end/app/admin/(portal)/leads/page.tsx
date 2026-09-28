import type { Metadata } from "next";
import { Suspense } from "react";
import LeadMessage from "./LeadMessage";

export const metadata: Metadata = {
  title: "Lead Message",
  robots: { index: false, follow: false },
};

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
 * Builds a lead message to paste into Telegram. Runs entirely in the browser,
 * so it needs no access token; the proxy still requires a session to reach it.
 * Suspense keeps the form (which defaults to today's date) out of the prerender.
 *
 * @returns {JSX.Element} The page.
 */
export default function LeadMessagePage() {
  return (
    <Suspense fallback={<LeadMessageSkeleton />}>
      <LeadMessage />
    </Suspense>
  );
}
