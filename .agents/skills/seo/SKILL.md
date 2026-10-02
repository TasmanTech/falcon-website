---
name: SEO and Metadata Guidelines
description: Rules for setting Next.js Metadata tags, including title, description, keywords, OpenGraph, and Schema for public and auth pages.
---

# SEO and Metadata Guidelines

When creating or modifying Next.js page components, ensure proper metadata is exported using the Next.js `Metadata` API while adhering strictly to Screaming Frog character and pixel length limits to prevent truncation.

## 1. Title Template Rule & Length Limits
**CRITICAL**: The `app/layout.tsx` should define a global title template (`"%s | Falcon Access"`). 
- When setting the `title` in a child page, provide **ONLY the specific page name**.
- **NEVER** include `| Falcon Access` in the title string you provide. If you do, it will result in duplicates (e.g., `"Contact Us | Falcon Access | Falcon Access"`).

**Screaming Frog Title Length Rules**:
- Google truncates titles around **60 characters** (or ~580 pixels).
- Ensure the combined title (Page Name + `" | Falcon Access"`) remains under 60 characters. For example, if your brand name suffix takes up 20 characters, your page-specific `title` string MUST be 40 characters or less.

## 2. Meta Description Length Limits
**Screaming Frog Description Length Rules**:
- Google truncates descriptions around **155–160 characters** (or ~920 pixels on desktop).
- The `description` property MUST be between **120 and 155 characters** to be fully visible and avoid Screaming Frog flags.

## 3. Public Pages
For any public-facing page (e.g., Home, Services, Contact), the exported `metadata` object or component must include:
- `title`: Page-specific title (Max 46 chars).
- `description`: Compelling summary (120-155 chars).
- `keywords`: Relevant keywords.
- `openGraph`: OpenGraph data (`title`, `description`, `url`, etc.) for rich social sharing.
  - **OG Title**: Max 60 characters total (if defining custom OG title, ensure it fits the limit).
  - **OG Description**: Max 155 characters.
- **Schema (Structured Data)**: EVERY page must include a `<script type="application/ld+json">` block utilizing the `@graph` array pattern. 
  - **Minimum Requirement**: Include `WebPage` and `BreadcrumbList` schemas on all pages (even those that are `noindex`).
  - **Dynamic Extensions**: Add `FAQPage` if the page has FAQs, and `Service` if it's a service offering.
  - **Entity Linkage**: All schemas must link to the root context using `"isPartOf": { "@id": "[Website URL]/#website" }`.

## 4. No-Index Pages
For utility pages, forms, or internal pages that should not be indexed (e.g., `/thank-you`, `/internal-booking`):
- Include the `title` (Max 46 chars), `description` (120-155 chars), and `openGraph` data.
- Do NOT include `keywords`.
- **DO** include foundational JSON-LD Schema (e.g., `WebPage`, `BreadcrumbList`) for accessibility and structural clarity, even though it won't be indexed.
- Include `robots: { index: false, follow: true/false }` depending on whether links should be crawled.
- **Why OpenGraph?** Even if a page is no-indexed by search engines, it can still be shared directly via messages, and OpenGraph tags ensure a rich preview is generated.

## Example Usage (Public Page)
```typescript
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Auckland Hardware Rekeying Services', // 35 chars, plus " | Falcon Access" stays under 60
  description: 'Cost-effective hardware rekeying for commercial and residential properties. Secure your facility without replacing the entire mechanism.', // 136 chars (Max 155)
  keywords: 'Rekeying, Lock Rekey, Lock Rekey Service, Hardware Rekeying, Auckland, Falcon Access',
  openGraph: {
    title: 'Auckland Hardware Rekeying Services | Falcon Access', // Ensure max 60 chars
    description: 'Cost-effective hardware rekeying for commercial and residential properties across Auckland.', // Max 155 chars
    url: 'https://falconaccess.co.nz/lock/rekey',
  }
};

export default function RekeyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://falconaccess.co.nz/lock/rekey/#webpage",
        "url": "https://falconaccess.co.nz/lock/rekey",
        "name": "Auckland Hardware Rekeying Services | Falcon Access",
        "isPartOf": { "@id": "https://falconaccess.co.nz/#website" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://falconaccess.co.nz/" },
          { "@type": "ListItem", "position": 2, "name": "Lock Services", "item": "https://falconaccess.co.nz/lock" },
          { "@type": "ListItem", "position": 3, "name": "Rekeying", "item": "https://falconaccess.co.nz/lock/rekey" }
        ]
      }
    ]
  };

  return (
    <main>
      <JsonLd id="schema-rekey" schema={jsonLd} />
      {/* Content */}
    </main>
  );
}
```
