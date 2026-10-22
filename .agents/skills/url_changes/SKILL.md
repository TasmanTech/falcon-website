---
name: url-changes
description: >-
  Rename, move, merge or delete a public page without leaving a 404: permanent redirects in
  lib/redirects.ts, the published-URL guard test, and every link, canonical, schema, sitemap and
  llms.txt reference to update. Use whenever a page folder, route segment or slug under
  apps/front-end/app changes, a page is removed, or a 404 is reported for an old URL.
---

# URL Changes and Redirects

## How redirects work
- `apps/front-end/lib/redirects.ts` exports `legacyRedirects`: one `{ source, destination }` per retired URL.
- `apps/front-end/next.config.ts` serves them from `redirects()` with `statusCode: 301`. Use 301, not `permanent: true` (which sends 308). They run before pages and before `proxy.ts`.
- `apps/front-end/lib/redirects.test.ts` holds `PUBLISHED_PATHS`, every public URL the site has ever served, and fails when:
  - a published URL is neither a live page nor a redirect source;
  - a live public page is missing from `PUBLISHED_PATHS`;
  - a redirect source is still a live page (it would shadow it), or its destination is another redirect or not a page;
  - a sitemap URL is not a live page.

## Renaming or moving a page
1. Move the folder (`git mv`) so history follows it, including `page.test.tsx`.
2. Add `{ source: '/old/path', destination: '/new/path' }` to `legacyRedirects`, with a short comment naming the change.
3. Any existing redirect whose destination was `/old/path` now points straight at `/new/path` (no chains).
4. Add `/new/path` to `PUBLISHED_PATHS`. Leave `/old/path` there too: it is now covered by the redirect source, and the list must never shrink.
5. Update every reference to the old URL (`git grep -n "/old/path" apps/front-end`):
   - `alternates.canonical`, `openGraph.url`, the JSON-LD `WebPage` / `Service` `@id`s and `BreadcrumbList` items on the page (`seo` skill);
   - links in other pages and `components/` (hub pages, related-service links, the `OfferCatalog` on hubs and in `app/layout.tsx`);
   - `Navbar.tsx`, `Footer.tsx` `serviceLinks`, `FloatingCTA.tsx` (`navbar_footer` skill) and their tests;
   - `app/sitemap.ts` and `public/llms.txt`;
   - `lib/suburbs.tsx` for suburb pages.
6. Run the checks below.

## Deleting a page
Redirect it to the closest live page: its hub (`/lock`, `/smart-lock`, `/auto`) or the page that now covers the topic. Use `/` only when nothing related exists. Never let it 404; a deleted page with backlinks or rankings loses them all.

## Merging two pages
Keep the stronger URL (more traffic or links), move the content in, and redirect the other URL to it.

## Slugs and segments
- Route groups `(name)` are not part of the URL; moving between them needs no redirect.
- URLs are lowercase, hyphenated and have no trailing slash (Next 308s `/path/` to `/path`). Pick final slugs before launch: every rename costs ranking while Google re-crawls.
- A dynamic route (`[slug]`) whose slug list changes needs a redirect for every removed or renamed slug, exactly like a folder.

## Checks
In `apps/front-end`:
1. `npx vitest run lib/redirects.test.ts`.
2. `npm run build:frontend` from the repo root (a bad `redirects()` entry fails the build).
3. With `npm run start` (or `dev:front-end`), `curl -sI http://localhost:3000/old/path` returns `301` and `location: /new/path`, and the new path returns `200`.
4. After the deploy, check `https://falconaccess.co.nz/old/path` the same way and, if the page was indexed, use Search Console URL Inspection on the new URL.

## History
Redirects already in place (September 2026): `/auto/obdii-diagnostic`, `/lock/lock-change-and-installation` and `/smart-lock/smart-lock-repair-and-programming` were renamed; the first sitemap listed flat URLs such as `/lockout` and `/rekey` before the `/lock`, `/smart-lock` and `/auto` hubs existed; the early mockup had `/services`, `/services/locksmith` and a `/careers` link; `app/favicon.ico` was removed. Do not repeat these mistakes: settle slugs before a page ships.
