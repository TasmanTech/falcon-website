---
name: Mobile-First Design Guidelines
description: Guidelines for implementing mobile-first responsive design using Tailwind CSS in the front-end.
---

# Mobile-First Design Guidelines

This project strictly follows a **Mobile-First** approach using Tailwind CSS. When building or modifying components in the Next.js front-end, adhere to the following rules:

## 1. Base Styles are Mobile Styles
- All un-prefixed Tailwind utility classes (e.g., `flex`, `p-4`, `text-sm`) apply to **mobile devices** by default.
- Never design for desktop first and then use `max-md:` or similar overrides to shrink it down. Always build the layout for mobile and scale up.

## 2. Breakpoint Usage
Use Tailwind's standard `min-width` breakpoints to scale the design up for larger screens:
- `sm:` (640px) - Large phones / small tablets
- `md:` (768px) - Tablets (Use this to transition from mobile menus to desktop layouts)
- `lg:` (1024px) - Laptops
- `xl:` (1280px) - Desktops

## 3. Navigation and Menus
- On mobile, navigation should be hidden behind a hamburger menu button (`md:hidden`).
- Desktop navigation links should be hidden on mobile and only appear on tablet/desktop (`hidden md:flex`).
- Ensure touch targets on mobile (buttons, links) have ample padding (at least `p-2` or `44px` minimum hit area) for accessibility.

## 4. Layout Constraints
- On mobile, use `flex-col` for stacking items vertically. Transition to `md:flex-row` or CSS grid (`md:grid-cols-2`, `lg:grid-cols-3`) on larger screens.
- Avoid fixed widths (`w-[500px]`); use fluid widths (`w-full`, `max-w-md`) and let padding/margins control the spacing.
