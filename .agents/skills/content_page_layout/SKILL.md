---
name: content-page-layout
description: >-
  Required section order and the reusable section components for service and content pages. Use when
  building a new page, adding, removing or reordering sections, or choosing which section component
  and props to use.
---

# Content Page Layout

## Section order
Every service and content page (About, hub pages such as `/lock`, every service page) follows:

1. `<PageHeaderSection title subtitle />`
2. `<PhotoContentSection photoPosition="right" priority />`: photo right, text left. `priority` preloads the image and skips the fade because it is usually the LCP element. Only the first photo section gets it.
3. `<TextContentSection align="left" />`
4. `<PhotoContentSection photoPosition="left" />`
5. `<CTASection theme="catchy" />`: centred, `py-24 md:py-32`
6. Optional `<IconListSection />`
7. `<FAQSection />` (with a matching `FAQPage` in the JSON-LD)

For more photo sections, keep alternating sides (right, left, right...) with a text or icon-list section between each pair.

**Homepage** (`app/(core)/page.tsx`): `<Hero isMain />`, photo section (right, "Commercial & Residential Repair"), `IconListSection` guarantees (dark), photo section (left), `TextContentSection` "Our Commitment to Quality" (dark), `CTASection`, `FAQSection`. Keep the first photo on the right and the second on the left. The hero image is the LCP element here, so no photo section takes `priority`.

**Exempt**: `/contact` (header plus `<ContactForm>`), `/privacy-policy`, `/terms-of-service` and the admin portal.

## Components (`apps/front-end/components/sections/`)
Never write a raw `<section>` in a `page.tsx`. If a page needs a new layout, add a reusable component here (with a test).

| Component | Props (`?` = optional) |
|---|---|
| `PageHeaderSection` | `title`, `subtitle` |
| `PhotoContentSection` | `title`, `content: ReactNode[]`, `imageSrc`, `imageAlt`, `imageTitle?`, `imageDescription?`, `ctaText?`, `ctaHref?`, `photoPosition: 'left' \| 'right'`, `theme?: 'light' \| 'dark'` (default light), `priority?` |
| `TextContentSection` | `title`, `content: ReactNode[]`, `theme?: 'light' \| 'dark' \| 'white'`, `align?: 'center' \| 'left'` (default centre) |
| `IconListSection` | `title`, `subtitle?`, `items: { icon, title, description }[]`, `theme?: 'light' \| 'dark' \| 'white'` |
| `CTASection` | `title?`, `description?`, `buttonText?`, `buttonHref?`, `theme?: 'light' \| 'dark' \| 'white' \| 'catchy'` (default catchy) |
| `FAQSection` | `title`, `subtitle` (required), `faqs: { question, answer }[]`, `theme?: 'light' \| 'dark'` |

The homepage hero is `components/Hero.tsx`: `title`, `description`, `imageSrc`, `imageAlt`, `imageTitle?`, `ctaText?`, `ctaLink?`, `isMain?`. Its image is hidden below `md` and always has `priority`.

## Images
- Every image comes from the `image_generation` manifest: 1024x1024 `.webp` for photo sections, 1600x900 for the hero.
- Pass `imageAlt`, `imageTitle` and `imageDescription` exactly as in the manifest entry.
- The frame is `aspect-square` with `object-cover`; don't override it.
- Never reuse an image on another section or page.

## Copy
Section content is an array of paragraphs (`ReactNode[]`) so each item stays short (`readability` skill). Include descriptive internal `<Link>`s in them.
