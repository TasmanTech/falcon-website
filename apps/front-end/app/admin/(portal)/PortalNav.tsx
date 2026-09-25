"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "New Invoice" },
  { href: "/admin/invoices", label: "History" },
];

/**
 * Two-tab switcher between creating an invoice and browsing sent invoices.
 * Sized for thumbs on mobile; highlights the current page.
 *
 * @returns {JSX.Element} The tab bar.
 */
export default function PortalNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin sections" className="mx-auto max-w-2xl px-4 pt-4">
      <div className="grid grid-cols-2 gap-1 rounded-full bg-slate-200 p-1">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex h-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                active ? "bg-white text-brand-dark" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
