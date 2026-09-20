import type { NextConfig } from "next";

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
    value:
      `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://*.facebook.net https://www.facebook.com https://*.facebook.com https://static.cloudflareinsights.com https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://fonts.googleapis.com; img-src 'self' blob: data: https://www.facebook.com https://*.facebook.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.google.com https://*.google.com https://*.google.co.nz https://googleads.g.doubleclick.net https://*.doubleclick.net; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' wss: ws: https://connect.facebook.net https://*.facebook.net https://www.facebook.com https://*.facebook.com https://graph.facebook.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://analytics.google.com https://www.google.com https://*.google.com https://ad.doubleclick.net https://*.doubleclick.net https://googleads.g.doubleclick.net ${process.env.NEXT_PUBLIC_BACKEND_URL || ""} http://localhost:3001; frame-src 'self' https://www.google.com https://www.facebook.com https://*.facebook.com; object-src 'none'; base-uri 'self'; form-action 'self' https://www.facebook.com https://*.facebook.com; frame-ancestors 'none'; upgrade-insecure-requests;`
        .replace(/\s{2,}/g, " ")
        .trim(),
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
