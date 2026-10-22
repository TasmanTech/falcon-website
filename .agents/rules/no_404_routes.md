---
trigger: always_on
---

# Never Leave a 404 Route

A public URL, once published, must keep working forever. Search engines, bookmarks, Google Business Profile, ads and backlinks keep using it long after the page moves.

- **Renaming, moving or deleting a public page** (its folder under `apps/front-end/app/`, a route segment, or a `locksmith/<suburb>` slug) needs a permanent redirect from the old URL to the closest live page, added to `legacyRedirects` in `apps/front-end/lib/redirects.ts` in the same commit. `next.config.ts` serves the list as 301s (`statusCode: 301`, never `permanent: true`, which sends 308).
- Route groups such as `(core)` or `(services)` are not in the URL, so moving a page between groups changes nothing. Everything else does.
- Never delete or edit the `source` of an existing redirect. If its destination moves, point it at the new page directly (one hop, no chains).
- A redirect's destination must be a live page, never another redirect source or a 404.
- Add every new public page to `PUBLISHED_PATHS` in `apps/front-end/lib/redirects.test.ts`. Never remove a path from it.
- Also fix internal links, `canonical` and `openGraph.url`, the JSON-LD `@id`s and breadcrumbs, `app/sitemap.ts`, `public/llms.txt`, the navbar and the footer to use the new URL.
- Run `npx vitest run lib/redirects.test.ts` in `apps/front-end`; it fails when a published URL has no page and no redirect.

The `url_changes` skill has the full procedure.
