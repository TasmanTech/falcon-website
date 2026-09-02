---
name: Styling Guidelines
description: Guidelines for styling front-end components using Tailwind v4, custom colors, and animations.
---

# Styling Guidelines

This project uses Next.js with **Tailwind CSS v4**. When creating or modifying front-end components, adhere to the following styling rules:

## 1. Custom Colors
The following custom theme colors are defined in `app/globals.css` and must be used where appropriate:
- **brand-dark** (`bg-brand-dark`, `text-brand-dark`): `#044389` (Steel Azure)
- **brand-primary** (`bg-brand-primary`, `text-brand-primary`): `#5995ED` (Cornflower Blue)
- **brand-secondary** (`bg-brand-secondary`, `text-brand-secondary`): `#7CAFC4` (Sky Reflection)
- **brand-accent** (`bg-brand-accent`, `text-brand-accent`): `#FFAD05` (Orange)
- **brand-highlight** (`bg-brand-highlight`, `text-brand-highlight`): `#FCFF4B` (Canary Yellow)
- **brand-light** (`bg-brand-light`, `text-brand-light`): `#FAFAFA` (Crisp light background)

## 2. Typography
- **Headings**: Use `font-montserrat` for all `h1`, `h2`, and `h3` tags to convey a strong, robust, and premium feel.
- **Body Text**: Use `font-inter` for all paragraph and supporting text for maximum legibility.

## 3. Animations
Custom animations are defined in `app/globals.css` using the `@theme inline` block and CSS classes. Use them to add subtle entrance effects:
- **Div Cards (Fastest: 0.25s)**: Use `.animate-card-ready` and add `.animate-play` to trigger `slide-up-subtle`.
- **SVGs (Faster: 0.35s)**: Use `.animate-svg-ready` and add `.animate-play-svg` to trigger `slide-up-subtle`.
- **Text Blurbs (Slow: 0.5s)**: Use `.animate-text-blurb-ready` and add `.animate-play-text` to trigger `fade-in-subtle`.
- **Images (Slowest: 0.7s)**: Use `.animate-image-ready` and add `.animate-play-img` to trigger `fade-in-subtle`.
- **Marquee**: Use `animate-marquee` for continuous scrolling effects.

## 4. Tailwind v4 Specifics
- Tailwind v4 configuration is primarily handled within the CSS itself using `@theme inline` in `globals.css` rather than a `tailwind.config.ts` file.
- Do not attempt to modify or look for a `tailwind.config.ts` file; update `globals.css` if new theme variables are needed.

## 5. UI/UX Principles
- **Minimalism & Whitespace**: Lean heavily on padding and margins (e.g., `py-16` or `py-24` for sections) to let the content breathe. A modern aesthetic requires significant negative space.
- **Lightweight Elements**: Avoid computationally expensive CSS like `backdrop-blur` unless absolutely necessary. Use solid color backgrounds with high opacity instead to maintain a lightweight DOM and fast rendering.
- **Mobile-First Responsiveness**: Always design for mobile first, using Tailwind's default breakpoints. Do not write complex desktop layouts that scale down poorly. Keep it simple on small screens.
