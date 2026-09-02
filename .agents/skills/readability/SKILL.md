---
name: Content Readability Standards
description: Guidelines for ensuring copy across the website is accessible, scannable, and easy to read.
---

# Content Readability Standards

When writing or auditing copy for [Brand Name], ensure it meets the following standards to maximize conversions and user engagement:

## 1. Paragraph Length
- Keep paragraphs short: **Maximum 3-4 sentences** per paragraph.
- Break up large walls of text. Users scan web pages rather than reading them word-for-word.

## 2. Sentence Structure & Reading Ease
- Aim for an **8th to 10th-grade reading level**.
- Maintain a **Flesch Reading Ease score above 60**. Do not over-simplify the language if it already scores above 60; leave it as is.
- Run `node audit-flesch.js` in the workspace root to automatically test all front-end files for their Flesch score.
- Keep sentences concise. Avoid run-on sentences. 
- A good rule of thumb is keeping most sentences under 20-25 words.

## 3. Voice and Tone
- Use **Active Voice**. (e.g., "We build custom websites" instead of "Custom websites are built by us").
- Speak directly to the user (use "You" and "Your business").

## 4. Scannability
- Use clear, descriptive headings (`<h2>`, `<h3>`) to break up sections.
- Use **bulleted lists** whenever listing 3 or more items, features, or benefits.
- Use **bold text** sparingly to highlight the most critical keywords or phrases (like "web design").

## 5. Vocabulary
- Refer to the `AGENTS.md` rules on Copywriting & SEO Vocabulary.
- Avoid overly technical jargon when simpler terms ("web design", "web development") communicate the value proposition effectively.

## 6. Preserving Link Equity
- **Never Remove Internal Links**: When rewriting or shortening copy for readability, you **MUST** retain all existing Next.js `<Link>` components. 
- **Informative Anchor Text**: Ensure the anchor text remains highly descriptive and relevant to the target page to maintain SEO link equity.
- **Use Technical Jargon in Anchors**: Unlike general copywriting, it is encouraged to use specific, technical terminology in anchor text (e.g., "React frontend architecture" instead of "custom websites") if it accurately describes the target page.
