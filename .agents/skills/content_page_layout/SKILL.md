---
name: Content Page Layout
description: Strict structural guidelines for laying out sections on content and service pages.
---

# Content Page Layout

When filling content pages (such as service pages, about pages, etc.) with content sections, you MUST adhere to the following alternating structural pattern:

## The Section Sequence
Every content and service page (anything below a `<PageHeaderSection>`) must contain **at least two Photo / Content sections**, laid out in this order:

1. **Photo / Content Section**: photo on the **Right**, text on the left (`photoPosition="right"`)
2. **h2 / Content Section**: text only, **left-aligned** (`<TextContentSection align="left">`)
3. **Photo / Content Section**: photo on the **Left**, text on the right (`photoPosition="left"`)
4. **CTA Section**: centred text in a contrasting colour with extra padding (`<CTASection theme="catchy" />`, which renders `py-24 md:py-32`, `text-center`)

After the CTA, pages may continue with an **h2 / Icon-List / SVG Section** (`<IconListSection>`) and then the **FAQ Section**.

If a page needs more photo sections, keep alternating the photo side (right, left, right...) with a text or icon-list section between each pair.

**Homepage exception**: the homepage keeps its own design (hero, emergency banner, photo sections, centred commitment text, guarantees, CTA, FAQ), but its first Photo / Content section must also have the photo on the **Right**, and the second on the **Left**.

Utility pages (contact, privacy policy, terms of service) are exempt.

## Image Rules
- Every image comes from the manifest in the `image_generation` skill. Follow that skill to pick sources, crop, compress and name images.
- **Format & Size**: `.webp` at **1024x1024** (content) or **1600x900** (hero). The photo frame in `<PhotoContentSection>` is `aspect-square`, so a square image fills it with no cropping.
- **CSS**: `object-cover` is applied inside the component. Do not override it.
- **Attributes**: always pass `imageAlt`, `imageTitle` and `imageDescription`, copied from the image's manifest entry.
- Never reuse an image on more than one section or page.

## Implementation Details
- Ensure all sections use the standard container classes (e.g., `max-w-7xl mx-auto px-4...`).
- Use the established Tailwind spacing and typography guidelines defined in the `style` skill.

## Strict Componentization Rule
**NEVER write raw HTML `<section>` blocks for page content.** You must strictly use the pre-built, reusable UI components located in `apps/front-end/components/sections/` to build pages. 

The mapping is as follows:
1. **Photo / Content Section** -> Use `<PhotoContentSection>`
   - Props: `title`, `content` (ReactNode[]), `imageSrc`, `imageAlt`, `imageTitle`?, `imageDescription`?, `ctaText`?, `ctaHref`?, `photoPosition` ('left' | 'right'), `theme` ('light' | 'dark').
2. **h2 / Content Section** -> Use `<TextContentSection>`
   - Props: `title`, `content` (ReactNode[]), `theme` ('light' | 'dark' | 'white'), `align` ('center' | 'left', default 'center'). Use `align="left"` between photo sections.
3. **h2 / Icon-List / SVG Section** -> Use `<IconListSection>`
   - Props: `title`, `subtitle`?, `items` (Array of {icon, title, description}), `theme`.
4. **CTA Section** -> Use `<CTASection>`
   - Props: `title`?, `description`?, `buttonText`?, `buttonHref`?, `theme` ('light' | 'dark' | 'white' | 'catchy', default 'catchy').
5. **FAQ Section** -> Use `<FAQSection>`
   - Props: `title`, `subtitle`?, `faqs` (Array of {question, answer}), `theme`.

If a page requires a new type of layout, you must abstract it into a new reusable component in `components/sections/` rather than hardcoding it in the `page.tsx` file.
