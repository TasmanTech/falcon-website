import type { NextConfig } from "next";

// The local backend is only reachable during development, so keep it out of production headers
const devConnectSrc = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://*.facebook.net https://www.facebook.com https://*.facebook.com https://static.cloudflareinsights.com https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://fonts.googleapis.com; img-src 'self' blob: data: https://www.facebook.com https://*.facebook.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.google.com https://*.google.com https://*.google.co.nz https://googleads.g.doubleclick.net https://*.doubleclick.net; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' wss: ws: https://capig.datah04.com https://connect.facebook.net https://*.facebook.net https://www.facebook.com https://*.facebook.com https://graph.facebook.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://analytics.google.com https://www.google.com https://*.google.com https://ad.doubleclick.net https://*.doubleclick.net https://googleads.g.doubleclick.net ${process.env.NEXT_PUBLIC_BACKEND_URL || ""} ${devConnectSrc}; frame-src 'self' https://www.google.com https://www.facebook.com https://*.facebook.com; object-src 'none'; base-uri 'self'; form-action 'self' https://www.facebook.com https://*.facebook.com; frame-ancestors 'none'; upgrade-insecure-requests;`,
  },
];

/** A permanent (301) redirect from a retired URL to the live page that replaced it. */
export interface LegacyRedirect {
  source: string;
  destination: string;
}

/**
 * Every public URL the site has ever served, linked to or listed in the sitemap that is no
 * longer a page. Served by `redirects()` below; `lib/redirects.test.ts` checks each destination
 * is a live page. Never remove an entry: old URLs stay in search indexes, bookmarks and
 * backlinks long after the page moves.
 *
 * Kept in this file because `next start` cannot load a local module imported by
 * `next.config.ts`: an import here crashes every production instance on startup.
 */
export const legacyRedirects: LegacyRedirect[] = [
  // Renamed service pages (f58160a, 76c33e5 in September 2026)
  { source: "/auto/obdii-diagnostic", destination: "/auto/obd2-diagnostic" },
  { source: "/lock/lock-change-and-installation", destination: "/lock/lock-change-installation" },
  {
    source: "/smart-lock/smart-lock-repair-and-programming",
    destination: "/smart-lock/smart-lock-repair-programming",
  },

  // Flat service URLs from the first sitemap and links, before the /lock, /smart-lock and /auto hubs
  { source: "/lockout", destination: "/lock/lockout" },
  { source: "/lock-repair", destination: "/lock/lock-repair" },
  { source: "/lock-change", destination: "/lock/lock-change-installation" },
  { source: "/lock-change-and-installation", destination: "/lock/lock-change-installation" },
  { source: "/rekey", destination: "/lock/rekey" },
  { source: "/smart-lock-change", destination: "/smart-lock/smart-lock-change" },
  { source: "/smart-lock-installation", destination: "/smart-lock/smart-lock-installation" },
  { source: "/smart-lock-repair", destination: "/smart-lock/smart-lock-repair-programming" },
  { source: "/smart-lock-repair-and-programming", destination: "/smart-lock/smart-lock-repair-programming" },
  { source: "/dead-battery-assistance", destination: "/auto/dead-battery-assistance" },
  { source: "/obdii-diagnostic", destination: "/auto/obd2-diagnostic" },
  { source: "/auto/car-lockout", destination: "/car-lockout" },

  // Early mockup pages and links (September 2026)
  { source: "/services", destination: "/" },
  { source: "/services/locksmith", destination: "/lock" },
  { source: "/careers", destination: "/about" },

  // app/favicon.ico was removed; browsers and search engines still request it
  { source: "/favicon.ico", destination: "/icon.png" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  poweredByHeader: false,
  async redirects() {
    // Retired URLs keep working: every renamed or removed public page 301s to its replacement
    return legacyRedirects.map(({ source, destination }) => ({ source, destination, statusCode: 301 as const }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // The admin portal is reachable by URL only: never index, follow, cache or snippet it
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" }],
      },
    ];
  },
};

export default nextConfig;
