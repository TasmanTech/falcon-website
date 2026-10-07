---
name: animation
description: >-
  Entrance animation and hover-motion classes defined in apps/front-end/app/globals.css. Use when
  adding or changing animations, fade-ins, hover lifts or pulse effects on front-end elements.
---

# Animation

Animations are defined in `apps/front-end/app/globals.css`: keyframes in an `@theme inline` block and the ready / play classes in `@layer utilities`. Each element gets a `*-ready` class (starts at `opacity: 0.01`) plus its play class.

| Element | Classes | Effect |
|---|---|---|
| Cards, panels, containers, large buttons | `animate-card-ready animate-play` | 0.25s slide up |
| Standalone SVGs and icon wrappers | `animate-svg-ready animate-play-svg` | 0.35s slide up |
| Headings, paragraphs, hero text, short messages | `animate-text-blurb-ready animate-play-text` | 0.5s fade in |
| Images | `animate-image-ready animate-play-img` | 0.7s fade in |

```tsx
<p className="text-brand-dark/80 animate-text-blurb-ready animate-play-text">Description text.</p>
```

## Rules
- Use these pairs, not default Tailwind animations (`animate-bounce`, `animate-pulse` and so on).
- **Never animate the LCP element.** The first `<PhotoContentSection>` on a page takes `priority`, which preloads its image and skips the fade. The hero image is not faded either.
- `animate-cta-pulse` is the periodic ring behind the mobile call button in `FloatingCTA.tsx`. Always wrap it as `motion-safe:animate-cta-pulse` so reduced-motion users don't see it.
- Hover states stay light: a small lift and colour change, e.g. `hover:-translate-y-1 hover:border-brand-accent transition-all duration-200`. No `shadow-2xl` or scale-on-hover effects that force heavy repaints.
- New keyframes go in the `@theme inline` block in `globals.css` as `--animate-<name>`.
