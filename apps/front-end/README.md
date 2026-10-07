# Falcon Access Front-end

The public website for Falcon Access (mobile locksmith, smart lock and auto services across Auckland) and the private `/admin` portal the team uses on their phones to send invoices and record leads.

## Stack
- Next.js 16 App Router with Cache Components (`cacheComponents: true`), React 19, Server Components by default.
- Tailwind CSS v4, configured in `app/globals.css` (`@theme inline`); there is no `tailwind.config.ts`.
- Vitest + React Testing Library on jsdom.
- Google Analytics 4, Google Ads and the Meta Pixel, loaded in production only once the page is idle.

Next.js 16 has breaking changes from older versions; see `AGENTS.md` in this folder and `node_modules/next/dist/docs/`.

## Getting started
From the repo root, `npm install` once, then:
```bash
npm run dev:front-end     # or, in this folder: npm run dev
```
Open http://localhost:3000. The contact form and admin portal call the back-end at `NEXT_PUBLIC_BACKEND_URL` (default `http://localhost:3001`).

## Scripts (in this folder)
| Script | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm test` | Vitest, run once |
| `npx tsc --noEmit` | Type-check |

`vitest.config.mts` maps `@asamuzakjp/css-color` to `mock-css-color.js` to work around an ESM resolution bug under jsdom.

## Structure
```
app/
  (core)/                 Home, about, contact, privacy policy, terms of service
  (services)/
    (lock-services)/      /lock/* and /smart-lock/* hub and service pages
    (auto-services)/      /auto/* hub and service pages
    car-lockout/          /car-lockout
  admin/                  Private portal: login, invoices, leads (noindex)
  actions/auth.ts         Server actions for admin login, logout and token refresh
  layout.tsx              Root layout: fonts, site-wide LocalBusiness JSON-LD, chrome, tags
  sitemap.ts, robots.ts   Discovery files
  globals.css             Tailwind theme tokens and animations
components/               Navbar, Footer, FloatingCTA, Hero, ContactForm, tag loaders, JsonLd
components/sections/      Reusable page sections (photo, text, icon list, CTA, FAQ, page header)
lib/                      auth, invoice, lead and idle helpers
proxy.ts                  Guards /admin and refreshes the session on every admin request
public/                   Logo, generated WebP images, llms.txt
```

Tests sit next to the files they cover (`*.test.tsx` / `*.test.ts`).

## Environment variables
| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Back-end API base URL. Inlined at build time; production uses `https://api.falconaccess.co.nz` (set in the deploy workflow). |

## Deployment
Built from `apps/front-end/Dockerfile` (runs in `Pacific/Auckland` time) and deployed to Cloud Run as `falcon-frontend-service` when a front-end change reaches `master`, followed by a Cloudflare cache purge. See the root README.

## Agent guidance
Rules, skills and workflows for AI agents are in [`../../.agents/`](../../.agents/AGENTS.md), including SEO, image generation, page layout, styling and testing.
