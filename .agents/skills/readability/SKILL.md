---
name: readability
description: >-
  Copywriting and readability standards for the public site. Use when writing, rewriting, shortening or
  reviewing any page copy, headings, FAQs, CTAs or link text.
---

# Readability

## Length and structure
- Paragraphs of **3 to 4 sentences at most**; each item in a section's `content` array is one paragraph.
- Most sentences under 20 to 25 words. Aim for a Flesch Reading Ease above 60 (roughly year 8 to 10). If copy already scores above 60, leave it alone.
- Clear `h2` / `h3` headings, bulleted lists for three or more items, and **bold** only for the most important phrase (e.g. "emergency locksmith").
- **No em dashes (`—`)** in copy. Use commas, brackets or a new sentence.

There is no Flesch script in this repo. Check scores with any Flesch calculator, or estimate from sentence and word length.

## Voice
- Active voice, speaking to the reader: "We rekey your locks so old keys stop working", not "Locks are rekeyed by our team".
- Plain words customers use ("lock repair", "rekey", "car lockout") over trade jargon.
- Honest and practical. Follow the copy rules in `AGENTS.md`: no 24/7 claims, no arrival times, no web design, no invented credentials.
- UK / NZ spelling (`uk_nz_english` rule).

## Links
- **Never remove an internal `<Link>`** when rewriting or shortening copy.
- Anchor text names the target service specifically ("smart lock installation", "lockout service", "OBDII diagnostics"), never "click here" or "learn more".
