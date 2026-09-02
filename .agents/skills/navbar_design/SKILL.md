---
name: Navigation Bar Design Guidelines
description: Rules for the structure, behavior, and styling of the global Navbar, especially concerning mobile states and background opacity.
---

# Navigation Bar Guidelines

When working on `apps/front-end/components/Navbar.tsx`, adhere to the following rules:

1. **Header Opacity on Mobile**: The header usually relies on a translucent backdrop (`bg-brand-dark/90 backdrop-blur-md`). However, when the mobile menu (`isMobileMenuOpen`) is active, the header **MUST** become 100% opaque (`bg-brand-dark`) with matching padding to create a seamless block with the dropdown menu below it.
2. **Mobile Menu Sizing**: The mobile dropdown wrapper must use `h-[calc(100vh-100%)] overflow-y-auto` to perfectly fill the screen height beneath the fixed header without over-flowing off the bottom of the screen.
3. **Internal Menu Structure**: The inner `<nav>` element of the mobile menu must utilize `flex flex-col min-h-full` to allow for proper flexbox layout while respecting the wrapper's height constraints.
4. **Bottom-Pinned CTA**: The primary CTA (Login/Dashboard button) in the mobile menu must always be pushed to the absolute bottom of the dropdown using `mt-auto mb-4`.
