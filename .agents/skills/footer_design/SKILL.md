---
name: Footer Design Guidelines
description: Rules for the styling of links and elements within the global Footer component.
---

# Footer Design Guidelines

When working on `apps/front-end/components/Footer.tsx`, adhere to the following rules:

1. **Consistent Hover Colors**: Every interactive link or anchor tag in the footer must feature the primary cyan hover effect (`hover:text-brand-accent`). Never use generic white or gray hover states.
2. **Text Link Animation**: Standard text-based links must include a subtle horizontal slide animation on hover using the classes `hover:translate-x-1 transition-all`.
3. **Icon Link Animation**: Icon-based links (e.g., Social Media icons) should not slide horizontally. Instead, they must include a vertical lift animation on hover using the classes `hover:-translate-y-1 transition-all inline-block`.
