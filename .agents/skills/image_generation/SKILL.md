---
name: Image Generation Workflow
description: Manifest-driven workflow for producing hero and content images (source selection, AI regeneration, cropping, compression and SEO attributes).
---

# Image Generation Workflow

Every hero and content image on the site is listed in [`manifest.json`](./manifest.json) and built by [`build_images.cjs`](./build_images.cjs). Never hand-export an image into `public/` — add or edit a manifest entry and rebuild, so the source, crop and SEO text stay together.

## Where images come from

- **`Content/<Service>/`** (repo root) holds the original high-resolution photos for each page (Pexels / Vecteezy stock, 3000–7600px wide).
- **`Content/<Service>/AI/`** holds AI-restyled versions of those originals (Gemini studio renders).
- **`Content/<Service>/content-1.webp` / `content-2.webp`** are the previous generation of AI images (kept for reference only).
- **`Content/Generated/`** holds the current Nano Banana Pro renders (2K PNG). Every manifest `source` points here.
- **`Content/Additional Images/`** holds real Falcon Access job photos. Prefer these for About and hub pages; they are authentic and unique to the business.
- **`Content/Homepage/`** and **`Content/AI/`** hold the homepage tool flat-lays.

## Choosing a source

1. Prefer the **original photo** when it is sharp, on-topic and clean. Originals are higher resolution than the AI renders.
2. Use an **AI render** only when it is clearly better (e.g. a clean product shot with no hands) and **never** when it carries a watermark (Gemini sparkle, logo, text overlay) inside the crop area.
3. Every image must be **unique across the whole site**. Do not use an original and its AI render of the same scene on different pages.
4. Subjects are tools, locks, keys, vehicles and hardware. No faces or identifiable people. A hand is acceptable only when it shows the service being done (turning a key, fitting a clamp).

## Regenerating with AI

AI images are generated with Google's strongest image model, **Nano Banana Pro (`gemini-3-pro-image`)**, through the AI Studio API. The key is read from `AI_STUDIO_KEY` / `GEMINI_API_KEY`, or from `global.env` one level above the repo. Never print or commit it.

```bash
node .agents/skills/image_generation/generate_images.cjs              # every entry with a prompt
node .agents/skills/image_generation/generate_images.cjs /lock/rekey  # one page
```

- Each entry's `reference` photo is sent with its `prompt`. The script adds the house style: photorealistic studio shot, seamless `#FAFAFA` background, no people or hands, no text or logos, subject fully in frame. Content images are 1:1 and the hero is 16:9, generated at 2K.
- Results land in `Content/Generated/` for review. Nothing in `public/` changes.
- After review, point `source` at the generated file, remove `locked`, rename `output` and rewrite `alt` / `title` / `description` to match the new image, then run the build and update the page props.
- The script stops at the first billing or auth error (401/402/403). A 402 means the AI Studio project's prepaid credits need topping up.

## Manifest entry

```jsonc
{
  "page": "/lock/rekey",
  "slot": "content-1",                       // "hero", "content-1" (photo right) or "content-2" (photo left)
  "locked": true,                             // optional: committed original, the build never touches it
  "source": "Rekey/pexels-a-darmel-7641991.jpg",
  "output": "images/services/lock/rekey/lever-lock-keys-rekeying-auckland.webp",
  "crop": "attention",                        // or { "left": 0, "top": 0.3, "width": 1, "height": 0.47 } in source fractions
  "alt": "Chrome lever handle and lock with keys on a white door",
  "title": "Lock Rekeying Service Auckland",
  "description": "Rekeying your existing locks so old keys stop working, without replacing the hardware.",
  "prompt": ""
}
```

### SEO rules for each field
- **`output` (filename)**: lowercase kebab-case, describes what is *in* the image plus the service, and ends with `-auckland` where it reads naturally. No stock-site names, no `content-1`, no IDs.
- **`alt`**: literally describes what is visible (object, material, setting) in under ~125 characters. Do not keyword-stuff or start with "Image of".
- **`title`**: short page-relevant label (max ~50 characters), usually the service name and location.
- **`description`**: one sentence linking the image to the service. It is rendered as screen-reader text through `aria-describedby`.
- All user-facing text uses UK / NZ English.

The page's `<PhotoContentSection>` (or `<Hero>`) props must match the manifest: `imageSrc="/<output>"`, `imageAlt`, `imageTitle`, `imageDescription`.

## Building

```bash
node .agents/skills/image_generation/build_images.cjs             # every image
node .agents/skills/image_generation/build_images.cjs /lock/rekey # entries whose page or output matches
```

- Content images: **1024x1024** webp, **under 100KB**.
- Hero image: **1600x900** webp, **under 175KB**.
- Entries with `"locked": true` are the original AI images already committed in `public/`. The build skips them so they are never re-encoded. Remove `locked` only when deliberately replacing that image.
- A `.webp` source that is already the target size and within budget is copied byte-for-byte.
- Sources in `Content/Generated/` have their background colour-matched to exactly `#FAFAFA` so they blend into `bg-brand-light` sections with no visible edge.
- Anything else is auto-rotated, cropped, lightly sharpened and compressed, stepping quality down from 82 until it fits.

## Review every build

`attention` smart-crop is a starting point, not the final answer. After building, look at every output (a contact sheet is fastest) and check:
- The whole subject is in frame (both deadbolt *and* handle, the full smart lock body, the key tag).
- No watermark, logo, text or stray clutter (bags, bins, cables) at the edges.
- The alt text still describes what the crop actually shows. If the crop changes the subject, update `alt` (and the filename if needed).

Fix a bad crop with an explicit `crop` box and rebuild that entry only. Delete any orphaned files from `public/images/` when an `output` path changes.
