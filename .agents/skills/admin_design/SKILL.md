---
name: Admin Panel Design and Skeletons
description: Guidelines for designing pages within the /admin route, specifically enforcing the usage of pre-defined loading skeletons.
---

# Admin Panel Design Guidelines

When building or modifying pages in the `apps/front-end/app/(auth)/admin` directory, adhere strictly to the following design and UX rules.

## 1. Required Skeletons
Always utilize the predefined skeleton components located in `AdminSkeletons.tsx` for loading states (either via `loading.tsx` or manual Suspense boundaries).
- **DashboardSkeleton**: Use for the main `/admin` overview page.
- **ListSkeleton**: Use for pages displaying lists of resources (e.g., `/admin/customers`, `/admin/leads`, `/admin/quotes`).
- **DetailsSkeleton**: Use for dynamic detail pages for a specific resource (e.g., `/admin/customers/[id]`).
- **SettingsSkeleton**: Use for configuration or settings pages (e.g., `/admin/settings`).

## 2. Admin Aesthetic
- **Color Scheme**: The admin panel heavily utilizes the dark `brand-dark` background.
- **Borders & Panels**: Use `bg-white/5` with `border border-white/10` and `rounded-xl` or `rounded-2xl` for layout cards and panels to establish depth.
- **Accents**: Use `brand-accent` sparingly for primary actions, active tabs, and key indicators.

## 3. Layout Conventions
- Maintain a consistent `max-w-7xl` or similar container for lists, and narrower containers (e.g., `max-w-5xl`) for details/settings.
- Ensure page headers (title and primary actions) are distinctly separated from the main content block.
- Lists should utilize simple row-based flex layouts within a parent border to maximize data readability.
