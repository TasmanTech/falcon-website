---
name: mobile-design
description: >-
  Mobile-first responsive layout rules with Tailwind CSS breakpoints. Use when building or changing any
  layout, grid, menu, form or tap target in the front-end, or fixing how a page looks on phones.
---

# Mobile-First Design

Most visitors arrive on a phone, often locked out, and the admin portal is used on phones on the job.

## Base styles are mobile styles
- Un-prefixed classes (`flex-col`, `p-4`, `text-lg`) are the phone layout. Scale up with `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px).
- Never build desktop first and shrink with `max-md:` overrides.

## Layout
- Stack with `flex-col`, then switch at `md:` (`md:flex-row`, `md:grid-cols-2`, `lg:grid-cols-3`). The photo sections use `flex-col md:flex-row` / `md:flex-row-reverse`.
- Fluid widths (`w-full`, `max-w-*`) rather than fixed pixel widths.
- Containers: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Text that stacks with an image on mobile: `text-center lg:text-left`.
- Horizontal carousels (`GallerySection`): `flex overflow-x-auto snap-x snap-mandatory` with `snap-start shrink-0` slides sized to show part of the next one on phones (`w-[88%]`), so it is obvious they scroll. Hide the scrollbar, keep arrow buttons at least `w-12 h-12`, and support swipe as well as taps.
- Respect the iOS safe area for anything fixed to the bottom (`bottom-[calc(1rem+env(safe-area-inset-bottom))]`, as in `FloatingCTA.tsx`) and full-screen overlays at both ends (the `GallerySection` lightbox pads with `safe-area-inset-top` and `-bottom` and locks body scroll while open).

## Navigation
- `md` is the switch point: the hamburger is `md:hidden`, the desktop nav is `hidden md:flex` (`navbar_footer` skill).
- Hover-only menus exist only on desktop; on mobile everything is tap-to-open.

## Touch
- Tap targets at least 44px (`py-3`/`py-4` on links and buttons; `h-12` buttons in the admin portal).
- Phone numbers are always `tel:` links so they can be tapped.
- No hover-only actions on anything a phone user needs.

Check new layouts at 375px and 1280px wide before finishing.
