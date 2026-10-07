# Falcon Access Agent Guide (Antigravity)

Falcon Access is a mobile locksmith, smart lock, auto and repair business in Auckland. This monorepo (npm workspaces, one root `package-lock.json`) holds its website and admin portal:

- `apps/front-end`: Next.js 16 App Router with `cacheComponents: true`, React 19, Tailwind CSS v4, Vitest.
- `apps/back-end`: NestJS 12, TypeORM on PostgreSQL (Cloud SQL), Nodemailer, pdfkit, Jest, bundled with webpack to `dist/main.mjs`.

This file holds the always-on workspace rules and indexes everything in `.agents/`. Rules load automatically, skills load when their description matches the task, and workflows are run as `/<name>`. To add or change any of them, follow the `agent_training` skill and update the index below.

Next.js 16 differs from older versions: before writing front-end code, read the matching guide in `apps/front-end/node_modules/next/dist/docs/` (see `apps/front-end/AGENTS.md`).

## Index

### Rules (`rules/`)
| Rule | Loads | Covers |
|---|---|---|
| `uk_nz_english` | always | UK / NZ spelling essentials for all user-facing text |

### Skills (`skills/`)
| Skill | Use when |
|---|---|
| `admin_portal` | Changing invoices, leads, PDFs or emails in the `/admin` portal and its back-end modules |
| `agent_training` | Saving a correction, or creating or editing a rule, skill or workflow |
| `animation` | Adding entrance animations or hover motion to front-end elements |
| `backend_layout` | Creating or restructuring a NestJS module |
| `backend_quality` | Fixing back-end `tsc` or ESLint errors |
| `backend_testing` | Writing or reviewing back-end `.spec.ts` files |
| `content_auditor` | Enriching a thin page |
| `content_page_layout` | Building or reordering sections on a service or content page |
| `dependency_auditor` | Upgrading packages, frameworks or the lock file |
| `deployment` | Committing, pushing, opening the release PR or deploying |
| `frontend_quality` | Fixing front-end `tsc` or ESLint errors |
| `frontend_testing` | Writing or reviewing front-end `.test.tsx` / `.test.ts` files |
| `image_generation` | Adding, replacing, generating or compressing site images |
| `jsdoc_enforcer` | Documenting code with JSDoc |
| `mobile_design` | Making layouts responsive and touch-friendly |
| `navbar_footer` | Editing `Navbar.tsx`, `Footer.tsx`, `FloatingCTA.tsx` or the site chrome |
| `readability` | Writing or rewriting copy |
| `repo_maintenance` | Updating READMEs, `.agents/` docs or package version alignment |
| `seo` | Setting page metadata, JSON-LD, the sitemap or `llms.txt` |
| `style` | Colours, typography, Tailwind v4 theme tokens and visual style |
| `uk_nz_english` | Auditing or converting text to UK / NZ English in detail |

### Workflows (`workflows/`)
| Command | Does |
|---|---|
| `/quality-check` | Type-check, lint and test both apps, fixing failures |
| `/new-page` | Scaffold a public service page with metadata, schema, sitemap, `llms.txt`, links and a test |
| `/pre-deploy` | Go / no-go check before the `staging` to `master` release PR |

## Type Safety
- **No `any`**, explicit or implicit. Define interfaces, DTOs or generics; use `unknown` and narrow it.
- **Strict null checks**: handle `null` and `undefined` explicitly.
- **Explicit return types** on exported functions, controllers and services.
- **Validate untyped input**: `class-validator` DTOs on the back-end (the global `ValidationPipe` uses `whitelist` and `forbidNonWhitelisted`); type guards on the front-end.

## Front-end (`apps/front-end`)
- **Server Components by default.** Add `"use client"` only for browser APIs, state or effects.
- **Cache Components**: `new Date()`, `Date.now()` or `Math.random()` in a server component breaks the `next build` prerender. Use a `"use cache"` component with `cacheLife` (see `components/CopyrightYear.tsx`), a client component, or `await connection()`.
- **File conventions**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`. Route guarding lives in `proxy.ts` (Next 16 renamed middleware), which only matches `/admin/:path*`.
- **Tests**: every new or changed component, page, server action and `lib/` helper gets a colocated `.test.tsx` / `.test.ts` (`frontend_testing` skill).
- **`next/image` with `fill`** must have a `sizes` prop.
- **Env vars**: only `NEXT_PUBLIC_*` reach the browser. The front-end uses one: `NEXT_PUBLIC_BACKEND_URL` (defaults to `http://localhost:3001`).
- **Third-party tags** load in production only and never on `/admin` (`SiteChrome`). GA4 (`@next/third-parties`) sits inside `AnalyticsWrapper`, and the Meta Pixel (`MetaPixel.tsx`) defers its first load; both wait for `whenIdleAfterLoad` (`lib/idle.ts`), so do not gate tags on scroll or click. `GoogleAdsTag.tsx` queues commands on `dataLayer` and relies on the gtag.js that GA4 loads. Do not add a second gtag loader.
- **CSP**: the `Content-Security-Policy` in `next.config.ts` lists every third-party origin. A new tag, embed or API needs its domain in the right directive (e.g. Meta's Conversions API gateway `capig.datah04.com` is in `connect-src`). `http://localhost:3001` is added in development only; keep it out of production.

## Back-end (`apps/back-end`)
- **Dependency injection** only; never `new` a provider.
- **Config**: read env vars through `ConfigService`. Exceptions that already exist: `main.ts` (`PORT`, `FRONTEND_URLS`), `redirect.filter.ts`, `auth.constants.ts` and `invoice-storage.ts`.
- **Schema**: TypeORM runs with `synchronize: true` and there are no migrations. Prefer additive changes; a rename or type change can drop data in production.
- **Tests**: every new or changed entity, controller, service and module gets a `.spec.ts` (`backend_testing` skill).
- **New env var**: add it to `.env` locally and to the `--set-env-vars` list in `.github/workflows/ci-cd.yml` (plus a GitHub secret), or it will be missing on Cloud Run.

## Dates and Times
- Send dates between apps as UTC ISO strings (`toISOString()`), and parse them with `new Date(value)`. Never splice offsets such as `+12:00` into strings.
- Format for people only at display time, in NZ time (the front-end container runs with `TZ=Pacific/Auckland`). Show dates as DD/MM/YYYY or "7 October 2026".

## UI and Styling
- **Simple, modern, lightweight, mobile-first**: whitespace, clear type, high contrast; no heavy gradients, stacked shadows or decorative blur.
- **Buttons**: `rounded-full` or `rounded-lg`, bold text, `bg-brand-accent text-brand-dark`, no forced uppercase. Add `cursor-pointer` to custom clickable elements (Tailwind v4 buttons default to `cursor: default`) and `disabled:opacity-50 disabled:cursor-not-allowed` to disabled ones.
- **Flat panels**: subtle borders (`border-gray-200`, `border-brand-light/10`) rather than large outer shadows.
- **Smooth scrolling** is native CSS (`scroll-behavior: smooth` in `globals.css`). No JavaScript scroll libraries.
- **Entrance animations** are short opacity / slide effects from the `animation` skill. Never fade in the LCP element.
- Text that stacks with an image on mobile uses `text-center lg:text-left`.
- Build pages from `components/sections/` (`content_page_layout` skill); colours and fonts come from the `style` skill.

## Images
Every hero and content image is a manifest entry built by the `image_generation` skill. Never hand-drop files into `public/`, never reuse an image on two sections or pages, and never publish faces, animals, watermarks, logos or text overlays. Content images are 1024x1024 `.webp` under 100 KB; the homepage hero is 1600x900 under 175 KB.

## Copy and SEO
- **Keywords** customers search for: "locksmith Auckland", "emergency locksmith", "lockout service", "lock repair", "rekey", "smart lock installation", "car lockout".
- **Framing**: "Commercial & Residential Repair and Maintenance"; locksmithing is one service, not the whole identity.
- **No web design**: never mention web design, web development or websites as a service, analogy or keyword (copy, metadata, schema or `llms.txt`).
- **No 24/7 claims**: never "24/7", "24 hours" or "at any hour". Use "after-hours support" or "after-hours emergency locksmith".
- **No ETAs**: never give arrival or response times ("15 minute ETA", "within 30 minutes"). "Fast" or "prompt" is fine.
- **No invented credentials**, certifications, licences or affiliations.
- **CTAs** are short and specific ("Call Now", "Get a Quote", "Get Help Now"). Anchor text describes the target page ("rekeying service", not "click here").
- **Internal links**: add relevant links whenever you write or edit content, without rewriting the readable copy, and never remove existing ones.
- **New public page**: add it to `app/sitemap.ts` and `public/llms.txt` (`/new-page` workflow). Metadata and schema follow the `seo` skill.
- Readability (`readability` skill) and UK / NZ spelling (`uk_nz_english` rule) apply to all copy.

## Business Facts (keep in sync)
These appear in the LocalBusiness schema in `app/layout.tsx`, `components/Footer.tsx`, the contact page and `public/llms.txt`. Change all of them together.
- **Phone**: `+64 9 243 1404`, linked as `tel:+6492431404`. `GoogleAdsTag.tsx` reports a "Phone call lead" conversion for every `tel:` link, so use a plain link with no per-link tracking.
- **Email**: `info@falconaccess.co.nz`.
- **Hours**: Monday to Saturday 7 am to 9 pm, Sunday 7 am to 7 pm, plus after-hours emergency support.
- **Pricing**: flat NZ$20 call-out fee; work is quoted on site.
- **Google Business Profile**: `https://www.google.com/maps?cid=14340846117585175277`. Use this CID link, never a `maps.app.goo.gl` short link (those reopen a stale map view).

## Admin Portal (`app/admin`)
- Private: every page sets `robots: { index: false, follow: false }` and a title only, and is never added to the sitemap or `llms.txt`. `next.config.ts` also sends `X-Robots-Tag: noindex` and `robots.ts` disallows `/admin`.
- Phone-first: large tap targets (`h-12` buttons), no hover-only actions.
- API calls go through `authorisedFetch` (`lib/invoice.ts`); back-end admin controllers use `@UseGuards(JwtAuthGuard)`.
- Follow the `admin_portal` skill for invoices and leads.

## Git and Deployment
Follow the `deployment` skill. In short: work on `staging`, the remote is `github` (`TasmanTech/falcon-website`), commit as `Tasman Tech <admin@tasmantech.co.nz>`, and deploy by merging a `staging` to `master` PR. Pushing `staging` deploys nothing.

## Temporary Files
Put throwaway scripts in your scratch directory (Antigravity: `<appDataDir>\brain\<conversation-id>\scratch\`), not the repo. If one must run inside the workspace (to resolve `@/` aliases or local `node_modules`), delete it as soon as it has run. Before finishing, check the repo root and both apps for leftovers such as `fix-*.mjs`, `temp.js` or `scratch_*.js`, and never commit them.
