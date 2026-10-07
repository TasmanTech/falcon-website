---
name: seo
description: >-
  Page metadata, OpenGraph, canonical URLs, JSON-LD schema, the sitemap, robots and llms.txt for the
  Next.js front-end. Use when creating or editing any page.tsx or layout.tsx metadata, adding structured
  data, adding or removing a public page, or changing business details that appear in schema.
---

# SEO and Metadata

## Titles
`app/layout.tsx` sets `title.template: "%s | Falcon Access"`. A page sets **only its own name**; never add `| Falcon Access` yourself or it appears twice.

The full title must stay under about 60 characters. The suffix ` | Falcon Access` is 16, so a page `title` is **44 characters or fewer**.

## Public pages
Export `metadata` with:
- `title` (44 characters max).
- `description`: 120 to 155 characters.
- `keywords`: the search terms for this page (see the keyword list in `AGENTS.md`).
- `alternates: { canonical: "/path" }`.
- `openGraph: { title, description, url: "/path" }` (relative URLs resolve against `metadataBase`; the OG title has no brand suffix and stays under 60 characters).

Then render a JSON-LD `@graph` with `<JsonLd id="schema-<page>" schema={jsonLd} />` (`components/JsonLd.tsx` outputs a plain `<script>` so crawlers see it in the server HTML):
- Always `WebPage` (with `@id` `<url>/#webpage` and `"isPartOf": { "@id": "https://falconaccess.co.nz/#website" }`) and `BreadcrumbList`.
- `Service` on service pages; `FAQPage` whenever the page has a `<FAQSection>`, with the same questions and answers.
- The site-wide `WebSite` and `LocalBusiness` / `Locksmith` entities live in `app/layout.tsx` only. Link to them by `@id`; never duplicate them.

Copy a current page as the template, e.g. `app/(services)/(lock-services)/lock/rekey/page.tsx`:
```ts
export const metadata: Metadata = {
  alternates: { canonical: "/lock/rekey" },
  title: 'Auckland Hardware Rekeying Services',
  description: 'Cost-effective hardware rekeying for commercial and residential properties. Secure your facility without replacing the entire mechanism.',
  keywords: 'Rekeying, Lock Rekey, Lock Rekey Service, Hardware Rekeying, Falcon Access',
  openGraph: {
    title: 'Auckland Hardware Rekeying Services',
    description: 'Cost-effective hardware rekeying for commercial and residential properties. Secure your facility without replacing the entire mechanism.',
    url: "/lock/rekey",
  },
};
```

## Private pages (`/admin/**`)
`robots: { index: false, follow: false }` and a `title` only: no description, keywords, OpenGraph or JSON-LD. `app/admin/layout.tsx` already sets this; `next.config.ts` adds `X-Robots-Tag: noindex` and `app/robots.ts` disallows `/admin`. Never add admin routes to the sitemap or `llms.txt`.

## Discovery files
- **`app/sitemap.ts`**: add every new public page (no `lastModified`; priority 0.9 for service pages, 0.8 for core pages, 0.5 for legal pages).
- **`public/llms.txt`**: add every new public page under its section with a one-line plain description. Keep its key facts (phone, email, hours, call-out fee, Google Business Profile link) identical to the `LocalBusiness` schema in `app/layout.tsx` and the footer.
- **`app/robots.ts`**: allows `/`, disallows `/admin`, points at `/sitemap.xml`.

## Content rules
No "24/7", no arrival times, no web design and no invented credentials in titles, descriptions, keywords or schema (`AGENTS.md`). UK / NZ spelling throughout.
