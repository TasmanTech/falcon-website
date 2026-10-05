import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The admin portal is also sent X-Robots-Tag: noindex from next.config.ts
      disallow: "/admin",
    },
    sitemap: "https://falconaccess.co.nz/sitemap.xml",
    host: "https://falconaccess.co.nz",
  };
}
