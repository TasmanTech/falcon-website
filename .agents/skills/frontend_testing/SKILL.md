---
name: frontend-testing
description: >-
  How to write and run Vitest + React Testing Library tests for the Next.js front-end. Use when writing,
  reviewing or fixing .test.tsx / .test.ts files for pages, components, server actions, lib helpers or
  proxy.ts.
---

# Front-end Testing

- **Runner**: Vitest 4 with `jsdom`, globals on, `setupTests.ts` (loads `@testing-library/jest-dom`). Config: `apps/front-end/vitest.config.mts`, which maps the `@/` alias and replaces `@asamuzakjp/css-color` with `mock-css-color.js` to work around an ESM bug in jsdom.
- **Libraries**: `@testing-library/react`, `@testing-library/user-event`.
- **Location**: colocate `<name>.test.tsx` / `.test.ts` next to the file (`components/Footer.test.tsx`, `app/(core)/about/page.test.tsx`, `lib/invoice.test.ts`, `proxy.test.ts`).
- **Run**: `npm --prefix apps/front-end run test` from the repo root (CI runs exactly this), or `npx vitest run <path>` in `apps/front-end` for one file.

## What to test
Every new or changed page, component, server action and `lib/` helper gets a test.

- **Pages**: render the page, then assert key headings, CTAs, internal links and that the JSON-LD `<script type="application/ld+json">` is present. Mock `next/image` and `next/link` as the existing page tests do.
- **Client components**: drive them with `userEvent`, assert visible state (errors, loading, success). Mock `next/navigation` (`useRouter`, `usePathname`). Portal components mock `@/lib/session` so no background renewal runs: `useSessionToken: (token) => useRef(token)` (import `useRef` inside the async factory) and `refreshSession: vi.fn()`.
- **Timers and tab visibility**: use `vi.useFakeTimers()` with `await vi.advanceTimersByTimeAsync(ms)` inside `act`, and set `document.visibilityState` with `Object.defineProperty` before dispatching `visibilitychange` (see `lib/session.test.ts`). Build mock responses inside `mockImplementation` when each call needs a new body or a token minted at call time.
- **Route handlers** (`app/api/**/route.ts`): call the exported `POST` directly with `next/headers` mocked and assert on `res.status`, `await res.json()` and `res.cookies`.
- **Server actions** (`app/actions/`): call them as async functions with `fetch` and `next/headers` (`cookies()`) mocked.
- **`lib/` helpers**: pure unit tests (e.g. `toTitleCase`, `formatLeadPhone`, `authorisedFetch`).
- **Tags**: `GoogleAdsTag`, `MetaPixel` and `AnalyticsWrapper` tests delete `window.gtag` / `window.fbq` between tests and assert on the queued commands; never load real third-party scripts.
- **Cached components**: async `"use cache"` components (e.g. `CopyrightYear`) cannot render in jsdom; mock them with `vi.mock`.
- **Browser APIs jsdom lacks**: stub them in the test, as `GallerySection.test.tsx` does (`Element.prototype.scrollBy = vi.fn()`, `vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get')`). Drive keyboard and swipe with `user.keyboard('{ArrowRight}')` and `fireEvent.touchStart` / `touchEnd`, and assert focus returns to the trigger after a dialog closes.
- **Data arrays in `lib/`** (e.g. `lib/gallery.ts`): test the invariants, such as unique `src`s, the SEO filename pattern and non-empty alt text, so a bad entry fails CI.
- Query by role or exact label text so a wrong label or required marker fails the test.
- **Known gaps**: `FAQSection`, `IconListSection` and `PageHeaderSection` have no tests yet. Add one when you change them.

Fix the code when it is wrong, not the assertion. Report real pass counts when you finish.
