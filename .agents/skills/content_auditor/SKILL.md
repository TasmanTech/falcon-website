---
name: content-auditor
description: >-
  Find and fix thin pages on the public site. Use when asked to audit page content, when a page is
  mostly a form or a few lines of text, or when a page needs more useful copy, FAQs or internal links
  for SEO.
---

# Content Auditor

## 1. Audit
- A page is thin if it is mostly a form, a few lines of text or images without context. Hub pages (`/lock`, `/smart-lock`, `/auto`) and utility pages (`/contact`) are the usual candidates.
- Check for: a clear `h2` structure, the search terms customers use (`AGENTS.md` keyword list), FAQs, "what happens next" steps, and internal links to related services.
- Ask what a customer on this page would still want to know: price (flat NZ$20 call-out, quoted on site), service area (Auckland), opening hours, the non-destructive entry approach, and what to do in an emergency.

## 2. Fix
Add one or two sections below the existing content, built only from `components/sections/` (`content_page_layout` skill). Never hand-write a raw `<section>`.

- **FAQ** (`<FAQSection>`, 3 to 5 questions). Contact page examples: "What happens after I send a request?", "What are your opening hours?", "How much is the call-out fee?". Add the same questions to the page's `FAQPage` JSON-LD (`seo` skill).
- **What to expect** (`<IconListSection>`, three steps), e.g. 1. Call or send a request, 2. We confirm the job and the call-out fee, 3. A technician comes to you and quotes on site.
- **Context and links** (`<TextContentSection>`): one or two short paragraphs with descriptive `<Link>`s to related pages, e.g. `/lock/rekey`, `/smart-lock/smart-lock-installation`, `/car-lockout`, `/about`.

## 3. Check
- Copy follows the `readability` skill and the `AGENTS.md` copy rules (no 24/7 claims, no ETAs, no web design, no invented credentials).
- New images follow the `image_generation` skill and are unique on the site.
- Update the page's test for any new headings, and `public/llms.txt` if the page's one-line description changes.
