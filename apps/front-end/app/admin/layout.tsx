import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Falcon Access Admin",
    default: "Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Wraps every admin route (login and portal) in the admin background.
 * Public-site chrome is hidden on these routes by `SiteChrome` in the root layout.
 *
 * @param {object} props - The layout props.
 * @param {React.ReactNode} props.children - The admin page.
 * @returns {JSX.Element} The admin shell.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-slate-100 text-slate-900">{children}</div>;
}
