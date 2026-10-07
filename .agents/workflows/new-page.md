---
description: Scaffold a new public service or content page with metadata, JSON-LD, images, sitemap and llms.txt entries, internal links and a test.
---

1. Confirm with the user: the URL path, the route group (`(core)` for company pages; `(services)/(lock-services)`, `(services)/(auto-services)` or `(services)` for service pages), the target keywords and the main CTA. Use the closest existing page as the template, e.g. `app/(services)/(lock-services)/lock/rekey/page.tsx`.

2. Create `apps/front-end/app/<group>/<path>/page.tsx` as a Server Component. Following the `seo` skill, export `metadata` (`title` of 44 characters or fewer without the brand suffix, `description` of 120 to 155 characters, `keywords`, `alternates.canonical`, `openGraph` with `url`) and render the JSON-LD `@graph` (`WebPage`, `BreadcrumbList`, `Service`, `FAQPage`) with `<JsonLd>`.

3. Lay out the sections in the order from the `content_page_layout` skill, using only `components/sections/`. The first `<PhotoContentSection>` gets `photoPosition="right"` and `priority`.

4. Add two unique images through the `image_generation` skill (manifest entries, generate, build, review) and pass `imageSrc`, `imageAlt`, `imageTitle` and `imageDescription` from the manifest. If `Content/` is not available locally, stop and ask the owner for images.

5. Write the copy with the `readability` skill and the `AGENTS.md` copy rules (no 24/7, no ETAs, no web design, no invented credentials), in UK / NZ English.

6. Internal links:
   - From the new page to at least three related pages, with descriptive anchor text.
   - From the parent hub page (e.g. `/lock`) and at least one related page back to the new page, without rewriting their copy.
   - Add it to the navbar (desktop and mobile lists) and footer if it is a top-level service (`navbar_footer` skill).

7. Add the route to `app/sitemap.ts` and a one-line entry under the right section of `public/llms.txt`.

8. Create `page.test.tsx` next to the page (`frontend_testing` skill): it renders, the `h1`, key headings and CTAs are present, and the JSON-LD script exists. Update `Navbar.test.tsx` / `Footer.test.tsx` if you changed them.

// turbo
9. Run `npx vitest run "app/<group>/<path>"` in `apps/front-end`.

10. Run `/quality-check` for the front-end and `npm run build:frontend`, then preview the page with `npm run dev:front-end` at 375px and 1280px wide.
