---
name: User Dashboard Design
description: Guidelines for designing the customer-facing /dashboard pages.
---

# User Dashboard Design Guidelines

When building or modifying pages in the `apps/front-end/app/(auth)/dashboard` directory, adhere to the following design principles.

## 1. Purpose and Audience
- The `/dashboard` is the **customer-facing** portal (distinct from the internal `/admin` panel).
- The design must feel premium, welcoming, and directly aligned with the public brand identity.

## 2. Layout Structure
- **Container**: Use `min-h-screen bg-brand-dark py-12` as the outer wrapper, and `container mx-auto px-6 max-w-7xl` for the inner content.
- **Tabs**: For navigation within the dashboard, use a tabbed interface (e.g., "My Quotes", "Account Settings") with a bottom border `border-b border-white/10`. Active tabs must be highlighted with `text-brand-accent border-b-2 border-brand-accent`.
- **Sidebar / Split Layout**: Utilize a `grid-cols-1 md:grid-cols-3` split where the main actionable content spans `col-span-2` and contextual widgets (like "Our Services" or "Start New Project" CTAs) occupy the side column.

## 3. UI Elements
- **Cards**: Represent distinct pieces of data (like inquiries or quotes) using `bg-white/5 border border-white/10 rounded-xl p-6`. Include `hover:border-brand-accent/30 transition-colors` to provide interactive depth.
- **Buttons**: Primary actions must use the branded CTA style: `bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-bold rounded-lg`.
- **Badges**: Use subtle backgrounds for inline indicators, e.g., `bg-brand-accent/10 text-brand-accent rounded-full`.

## 4. State Management & Loading
- **Verification Gate**: The dashboard must utilize the `<VerificationGate />` to ensure users verify their email before accessing sensitive data.
- **Loading Spinners**: For top-level fetching, use a branded spinner (`border-brand-accent border-t-transparent`) rather than generic loading text.
