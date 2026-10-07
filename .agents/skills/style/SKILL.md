---
name: style
description: >-
  The brand colour palette, fonts, Tailwind CSS v4 theme tokens and visual style of the front-end. Use
  when choosing colours or fonts, styling components or buttons, adding theme tokens to globals.css,
  or checking contrast.
---

# Style

Tailwind CSS v4 is configured in CSS, not JavaScript: theme tokens live in `@theme inline` blocks in `apps/front-end/app/globals.css`. There is no `tailwind.config.ts`; add new tokens to `globals.css`.

## Colours (`--color-brand-*` in `globals.css`)
| Token | Hex | Use |
|---|---|---|
| `brand-dark` | `#044389` | Steel blue. Navbar, footer, dark sections, body text on light backgrounds. |
| `brand-light` | `#FAFAFA` | Page background (`body` is `bg-brand-light text-brand-dark`), light sections, text on dark. AI images are colour-matched to it. |
| `brand-accent` | `#FFAD05` | Amber. Primary CTAs (`bg-brand-accent text-brand-dark`), link hovers, active states, highlights. Use sparingly. |
| `brand-catchy` | `#D81B60` | Raspberry. Background of `<CTASection theme="catchy">` (the default theme), with `text-brand-light`. |
| `brand-primary` | `#5995ED` | Cornflower blue. Secondary accents and supporting graphics. |
| `brand-secondary` | `#7CAFC4` | Muted sky blue. Subtle tints and secondary accents. |
| `brand-highlight` | `#FCFF4B` | Bright yellow. Rare badges or alerts only. |

- Prefer brand tokens over raw palette colours. Raw colours (`bg-white`, `border-gray-200`, `text-red-600` for errors, `text-green-600` for success) are fine for neutrals and validation states.
- Use opacity modifiers for depth and muted text: `text-brand-light/80`, `border-brand-light/10`, `hover:bg-brand-accent/90`, `bg-brand-dark/90`.
- Contrast: `brand-accent` and `brand-highlight` backgrounds take `text-brand-dark`; `brand-dark` and `brand-catchy` backgrounds take `text-brand-light`. Never put amber text on the light background for body copy.

## Typography
Fonts load through `next/font/google` in `app/layout.tsx` (Inter and Montserrat as CSS variables).
- Headings (`h1` to `h3`): `font-montserrat font-bold`.
- Body: `font-inter` (set on `<body>`, so only repeat it where a parent overrides it).

## Visual style
- Simple, modern, lightweight and mobile-first; generous section spacing (`py-24`, `py-24 md:py-32` for CTAs).
- Containers: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (`max-w-4xl` for text-only sections).
- Buttons: `rounded-full` or `rounded-lg`, `font-bold`, `px-8 py-4` for large CTAs, `transition-colors` or `transition-all duration-200`. No forced uppercase.
- Cards and panels: flat with a light border (`border border-gray-200` or `border-brand-light/10` on dark), `rounded-lg` to `rounded-2xl`. Avoid `shadow-xl`/`shadow-2xl` except on floating elements such as `FloatingCTA`.
- `backdrop-blur` only on the translucent navbar (`bg-brand-dark/90 backdrop-blur-md`); elsewhere use solid backgrounds.
- Animations: `animation` skill. Responsive rules: `mobile_design` skill. Section components: `content_page_layout` skill.
