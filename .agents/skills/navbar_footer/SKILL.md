---
name: navbar-footer
description: >-
  Structure, links and styling of the public site chrome: Navbar.tsx, Footer.tsx, FloatingCTA.tsx,
  SiteChrome.tsx and CopyrightYear.tsx. Use when adding or renaming navigation links, changing the
  mobile menu, footer contact details or social links, or the floating call button.
---

# Navbar, Footer and Site Chrome

All files are in `apps/front-end/components/` and are rendered by `app/layout.tsx` inside `<SiteChrome>`, which hides them on `/admin` (the portal has its own `PortalNav`).

## Navbar (`Navbar.tsx`, client component)
- Fixed header (`fixed top-0 left-0 right-0 z-50`). Background is `bg-brand-dark/90 backdrop-blur-md`, and becomes fully opaque `bg-brand-dark` while the mobile menu is open so it joins the dropdown seamlessly.
- Logo: `/falcon_access_logo.webp` with `priority`, faded in on load, beside the "Falcon Access" wordmark.
- **Desktop** (`hidden md:flex`): a hover "Services" mega menu (`group-hover`, three columns: Lock Services, Smart Locks, Auto), then Car Lockout, About, Contact, and a "Get a Quote" button (`bg-brand-accent text-brand-dark rounded-lg font-bold`) linking to `/contact`.
- **Mobile** (`md:hidden`): a hamburger toggles the menu. The dropdown wrapper is `absolute top-full h-[calc(100vh-100%)] overflow-y-auto`, the inner `<nav>` is `flex flex-col min-h-full`, "Services" expands as an accordion, and the "Get a Quote" button is pinned to the bottom with `mt-auto mb-4`. Every link's `onClick` closes the menu.
- Links use `hover:text-brand-accent`; group headings are `text-brand-accent uppercase tracking-wider` with `hover:text-white`.
- **The service links appear three times**: the desktop mega menu and mobile accordion in `Navbar.tsx`, and `serviceLinks` in `Footer.tsx`. Add, rename or remove a page in all three, then update `Navbar.test.tsx` and `Footer.test.tsx`. Current services: `/lock` (lockout, rekey, lock-change-installation, lock-repair), `/smart-lock` (smart-lock-installation, smart-lock-change, smart-lock-repair-programming), `/auto` (obd2-diagnostic, dead-battery-assistance) and `/car-lockout`.

## Footer (`Footer.tsx`, server component)
- `bg-brand-dark text-brand-light`, four columns on desktop (`md:grid-cols-4`), stacked on mobile.
- Column 1: logo, one-line description, Facebook and Instagram icon links.
- Column 2 "Services" is rendered from the `serviceLinks` array (`FooterLink { href, label, children? }`) at the top of `Footer.tsx`: each hub (`/lock`, `/smart-lock`, `/auto`) with its service pages nested and indented beneath it (`ml-1 pl-4 border-l border-brand-light/20 text-sm`, links `text-brand-light/70`), then `/car-lockout`. Every public service page belongs in it; edit the array, never hand-write `<li>`s. Labels are short ("Lock Change & Install", "Repair & Programming").
- Column 3 "Company": About, Contact, Privacy Policy, Terms of Service.
- Column 4 "Contact Us": phone (`tel:+6492431404`), email, opening hours, the Google Business Profile CID link and a lazy-loaded Google Maps embed (its origin is allowed in the CSP `frame-src`).
- Hover styles:
  - Text links in the Services and Company lists: `text-brand-light/80 hover:text-brand-accent hover:translate-x-1 transition-all inline-block` (nested service links use `/70`).
  - Social icons: `hover:text-brand-accent hover:-translate-y-1 transition-all inline-block`, with an `sr-only` label. They lift rather than slide.
  - Contact links: `underline hover:text-brand-accent transition-colors` (no motion).
- Copyright line uses `<CopyrightYear />`, a `"use cache"` component with `cacheLife("days")`, because Cache Components forbid `new Date()` in a prerendered server component.
- Phone, email, hours and the map link are business facts shared with `layout.tsx`, the contact page and `llms.txt` (see `AGENTS.md`). Update them together and keep `Footer.test.tsx` in step (it checks each service page is nested under its hub).

## Floating call button (`FloatingCTA.tsx`, client component)
- Mobile only (`md:hidden`), fixed bottom right above the safe area, linking to `tel:+6492431404`.
- Shows an "After-Hours Emergency Locksmith" bubble for 6 seconds, then hides it.
- The ring behind the button uses `motion-safe:animate-cta-pulse`.
- Never use "24/7" or arrival times in its text.
