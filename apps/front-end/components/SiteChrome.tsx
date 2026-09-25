"use client";

import { usePathname } from "next/navigation";

/**
 * Renders public-site chrome (navbar, footer, floating CTA, analytics) everywhere
 * except the admin portal, which has its own header.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The chrome to show on public pages.
 * @returns {React.ReactNode} The children, or nothing on `/admin` routes.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }): React.ReactNode {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null;
  return children;
}
