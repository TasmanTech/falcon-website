---
name: Content Page Layout
description: Strict structural guidelines for laying out sections on content and service pages.
---

# Content Page Layout

When filling content pages (such as service pages, about pages, etc.) with content sections, you MUST adhere to the following alternating structural pattern:

## The Section Sequence
Content pages must alternate through these three types of sections in order:
1. **Photo / Content Section**
2. **h2 / Content Section** (Just text/content with an h2 heading)
3. **h2 / Icon-List / SVG Section** (An h2 heading followed by a list featuring icons/SVGs)

If the page requires more content, repeat the sequence (1 -> 2 -> 3 -> 1 -> 2 -> 3).

## Photo Alignment Rule
For the **Photo / Content** sections, you must alternate the alignment of the photo every time this section type appears on a page:
- **1st Instance**: Photo on the **Left**, Content on the Right
- **2nd Instance**: Content on the Left, Photo on the **Right**
- **3rd Instance**: Photo on the **Left**, Content on the Right
- *...and so on.*

## Image Generation & Styling Rules
When generating or including images for the **Photo / Content** sections:
- **Format & Size**: Use `.webp` format, target size 1024x720.
- **Style**: "Cartoonish".
- **Background**: The image background must match the section's background color (e.g., `#FAFAFA` for `bg-brand-light`) so it appears transparent.
- **CSS**: Apply `object-fit: cover` (or Tailwind `object-cover`) to the Next.js `<Image>` component.
- **Attributes**: Always provide descriptive `alt` and `title` attributes based on the page's purpose.

## Implementation Details
- Ensure all sections use the standard container classes (e.g., `max-w-7xl mx-auto px-4...`).
- Use the established Tailwind spacing and typography guidelines defined in the `style` skill.

## Strict Componentization Rule
**NEVER write raw HTML `<section>` blocks for page content.** You must strictly use the pre-built, reusable UI components located in `apps/front-end/components/sections/` to build pages. 

The mapping is as follows:
1. **Photo / Content Section** -> Use `<PhotoContentSection>`
   - Props: `title`, `content` (ReactNode[]), `imageSrc`, `imageAlt`, `ctaText`?, `ctaHref`?, `photoPosition` ('left' | 'right'), `theme` ('light' | 'dark' | 'white').
2. **h2 / Content Section** -> Use `<TextContentSection>`
   - Props: `title`, `content` (ReactNode[]), `theme`.
3. **h2 / Icon-List / SVG Section** -> Use `<IconListSection>`
   - Props: `title`, `subtitle`?, `items` (Array of {icon, title, description}), `theme`.
4. **FAQ Section** -> Use `<FAQSection>`
   - Props: `title`, `subtitle`?, `faqs` (Array of {question, answer}), `theme`.

If a page requires a new type of layout, you must abstract it into a new reusable component in `components/sections/` rather than hardcoding it in the `page.tsx` file.
