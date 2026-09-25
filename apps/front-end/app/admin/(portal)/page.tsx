import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE } from "@/lib/auth";
import InvoiceForm from "./InvoiceForm";

export const metadata: Metadata = {
  title: "New Invoice",
  robots: { index: false, follow: false },
};

/**
 * Reads the access token (refreshed by the proxy for this request) and renders the form.
 *
 * @returns {Promise<JSX.Element>} The invoice form.
 */
async function InvoiceFormWithSession() {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!token) redirect("/admin/login");
  return <InvoiceForm token={token} />;
}

/**
 * Placeholder shown while the session is read.
 *
 * @returns {JSX.Element} A skeleton of the form.
 */
function InvoiceFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Loading">
      <div className="h-7 w-40 rounded-lg bg-slate-200" />
      <div className="h-48 rounded-2xl bg-slate-200" />
      <div className="h-32 rounded-2xl bg-slate-200" />
    </div>
  );
}

/**
 * The admin home page: invoice generation (the only admin tool for now).
 *
 * @returns {JSX.Element} The page.
 */
export default function AdminInvoicePage() {
  return (
    <Suspense fallback={<InvoiceFormSkeleton />}>
      <InvoiceFormWithSession />
    </Suspense>
  );
}
