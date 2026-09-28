import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE } from "@/lib/auth";
import LeadHistory from "./LeadHistory";

export const metadata: Metadata = {
  title: "Lead History",
  robots: { index: false, follow: false },
};

/**
 * Reads the access token (refreshed by the proxy for this request) and renders the list.
 *
 * @returns {Promise<JSX.Element>} The lead history.
 */
async function LeadHistoryWithSession() {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!token) redirect("/admin/login");
  return <LeadHistory token={token} />;
}

/**
 * Placeholder shown while the session is read.
 *
 * @returns {JSX.Element} A skeleton of the list.
 */
function LeadHistorySkeleton() {
  return (
    <div className="space-y-3 animate-pulse" aria-label="Loading">
      <div className="h-7 w-44 rounded-lg bg-slate-200" />
      <div className="h-12 rounded-xl bg-slate-200" />
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="h-28 rounded-2xl bg-slate-200" />
      ))}
    </div>
  );
}

/**
 * Lists saved leads with search, status filter, status changes, editing and deletion.
 *
 * @returns {JSX.Element} The page.
 */
export default function LeadHistoryPage() {
  return (
    <Suspense fallback={<LeadHistorySkeleton />}>
      <LeadHistoryWithSession />
    </Suspense>
  );
}
