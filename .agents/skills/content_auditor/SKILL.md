---
name: Content Auditor
description: Agent instructions for auditing and fixing low-content pages (pages with thin content) to improve SEO, readability, and user engagement.
---

# Content Auditor Guidelines

When asked to audit and fix low-content pages, follow these strict guidelines to enrich the content while maintaining the project's standards.

## 1. Auditing a Page
- **Identify Thin Content**: If a page only contains a form, a few lines of introductory text, or simple images without context, it is considered low-content.
- **Assess SEO Value**: Search engines penalize thin pages. Check if the page lacks contextual keywords, headings (`<h2>`, `<h3>`), or related internal links.
- **Identify Missing Value**: Determine what information a user would naturally seek on this page that is missing (e.g., FAQs, process steps, detailed descriptions).

## 2. Fixing Low-Content Pages

To enrich the page, add 1 or 2 of the following sections natively below the main content area:

### A. FAQ Section
- Add an FAQ section with 3-5 relevant questions.
- For a Contact page, answer: "What happens after I contact you?", "What are your business hours?", "How long does a quote take?".
- For a Testimonials page, answer: "How do I submit a review?", "Can I speak with a past client?".

### B. Process or "What to Expect" Section
- Outline 3 simple steps explaining what happens next.
- Example for Contact: 1. Send Inquiry, 2. Consultation, 3. Project Kickoff.

### C. Internal Linking & Contextual Text
- Write 1-2 short paragraphs explaining the value of the page.
- Add descriptive Next.js `<Link>` components pointing to related core pages (e.g., `/services/custom-sites`, `/about`).
- Ensure paragraph length and Flesch reading ease follow the `Content Readability Standards` skill.

## 3. Styling Standards
- **Containers**: Use `<div className="container mx-auto px-6 max-w-4xl mt-16">` to separate new sections from the hero area.
- **Headings**: Use `<h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">` for section titles.
- **Animations**: Ensure all new sections or cards utilize the custom entrance animations: `animate-card-ready animate-play` for cards/boxes, and `animate-text-blurb-ready animate-play-text` for text.
- **Colors**: Maintain the `bg-brand-light` or `bg-white` backgrounds for main areas, and `bg-brand-dark` for prominent cards.
