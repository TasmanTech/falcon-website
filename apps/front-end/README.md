# Falcon Access Front-end

This is the front-end application for the Falcon Access website, built with [Next.js](https://nextjs.org) (App Router). It provides a responsive, high-performance, and SEO-optimized public face for Falcon Access, a premium locksmithing and property maintenance service operating in New Zealand.

## Features & Architecture
- **Next.js 15+ (App Router)**: Uses React Server Components (RSCs) by default for optimal performance and SEO.
- **Tailwind CSS v4**: Strict adherence to a custom color palette (`brand-dark`, `brand-light`, `brand-accent`) and custom animations (`animate-play-card`, `animate-play-text`).
- **Comprehensive Testing**: Fully tested using `Vitest` and `React Testing Library`, with automated structure checks for all primary routes.
- **Strict Linting & Types**: Enforces strict TypeScript usage (`no-explicit-any`) and ESLint validation.
- **Automated SEO & Schema**: Features complete JSON-LD `WebPage`, `BreadcrumbList`, and `FAQPage` schemas on service pages, alongside strict metadata limits.

## Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing
To run the automated test suites using Vitest:
```bash
npm run test
```
*Note: We utilize a custom mock for `@asamuzakjp/css-color` within `vitest.config.mts` to handle ESM resolution bugs in `jsdom` environments.*

### Linting
To check for code quality and strict type safety:
```bash
npm run lint
npx tsc --noEmit
```

## Structure
- `app/(core)/`: Core public pages (Home, About, Contact, Legal).
- `app/(services)/`: Service-specific landing pages broken down by domains (Lock, Auto, Smart Locks).
- `components/`: Global components (`Navbar`, `Footer`) and Reusable section layouts (`PhotoContentSection`, `TextContentSection`, etc).
- `public/`: Static assets, SVG icons, and generated WebP photography.

## Environment Variables
Environment variables that need to be accessible in the browser must be strictly prefixed with `NEXT_PUBLIC_`.

## Maintenance
Always adhere to the `.agents/skills` repository standards when making structural changes. Tests and strict typing are mandatory for all new pull requests.
