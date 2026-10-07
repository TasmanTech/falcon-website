---
name: image-generation
description: >-
  Manifest-driven pipeline for every hero and content image: AI generation with Nano Banana Pro,
  cropping, WebP compression and SEO filenames / alt text. Use when adding, replacing, regenerating,
  renaming or compressing any image under apps/front-end/public/images, or writing image alt text.
---

# Image Generation

Every hero and content image on the site is an entry in [`manifest.json`](./manifest.json) (`{ "$comment", "images": [...] }`) and is built by [`build_images.cjs`](./build_images.cjs). Never hand-export an image into `public/`: add or edit a manifest entry and rebuild, so the source, crop and SEO text stay together.

## Where images come from
`Content/` at the repo root is **git-ignored**: it exists only on the owner's machine. If it is missing, you cannot build or regenerate images; say so rather than inventing sources.

- **`Content/Generated/`**: the current Nano Banana Pro renders (2K PNG). Every manifest `source` points here today.
- **`Content/<Service>/`**: the original stock photos (Pexels / Vecteezy) for each page. They are used as the `reference` sent to the model, not published directly.
- **`Content/<Service>/AI/`**, `content-1.webp` / `content-2.webp`, **`Content/Homepage/`** and **`Content/AI/`**: earlier generations, kept for reference.
- **`Content/Additional Images/`**: real Falcon Access job photos. Use one only when the owner asks; check it for faces, number plates and addresses first.

## Choosing a subject
1. Clean, photorealistic studio shots of tools, locks, keys, vehicles and hardware on a seamless `#FAFAFA` background.
2. No faces or identifiable people, no animals, and no watermark, logo or text anywhere in the crop.
3. Every image is **unique across the whole site**. A reference photo and its render count as the same image.

## Regenerating with AI

Images are generated with **Nano Banana Pro** (`gemini-3-pro-image`, override with `GEMINI_IMAGE_MODEL`) through the AI Studio API. The key is read from `AI_STUDIO_KEY` / `GEMINI_API_KEY`, or from `global.env` one level above the repo. Never print or commit it.

```bash
node .agents/skills/image_generation/generate_images.cjs              # every entry with a prompt
node .agents/skills/image_generation/generate_images.cjs /lock/rekey  # one page
```

- Each entry's `reference` photo is sent with its `prompt`. The script adds the house style: photorealistic studio shot, seamless `#FAFAFA` background, no people or hands, no text or logos, subject fully in frame. Content images are 1:1 and the hero is 16:9, generated at 2K.
- Results land in `Content/Generated/` for review. Nothing in `public/` changes.
- After review, point `source` at the generated file, rename `output` if the subject changed, rewrite `alt` / `title` / `description` to match the new image, then run the build and update the page props.
- The script stops at the first billing or auth error (401/402/403). A 402 means the AI Studio project's prepaid credits need topping up.

## Manifest entry

```jsonc
{
  "page": "/lock/rekey",
  "slot": "content-1",                        // "hero", "content-1" (photo right) or "content-2" (photo left)
  "reference": "Rekey/pexels-a-darmel-7641991.jpg",                     // photo sent to the model
  "source": "Generated/chrome-lever-lock-keys-rekeying-auckland.png",   // file the build reads
  "output": "images/services/lock/rekey/chrome-lever-lock-keys-rekeying-auckland.webp",
  "crop": "attention",                         // or { "left": 0, "top": 0.3, "width": 1, "height": 0.47 } in source fractions
  "alt": "Chrome lever handles and lock cylinder with a set of keys",
  "title": "Lock Rekeying Service Auckland",
  "description": "Rekeying your existing locks so old keys stop working, without replacing the hardware.",
  "prompt": "a chrome lever handle and chrome lock cylinder with a set of keys"
  // optional "locked": true makes the build skip the entry
}
```

### SEO rules for each field
- **`output` (filename)**: lowercase kebab-case, describes what is *in* the image plus the service, and ends with `-auckland` where it reads naturally. No stock-site names, no `content-1`, no IDs.
- **`alt`**: literally describes what is visible (object, material, setting) in under ~125 characters. Do not keyword-stuff or start with "Image of".
- **`title`**: short page-relevant label (max ~50 characters), usually the service name and location.
- **`description`**: one sentence linking the image to the service. It is rendered as screen-reader text through `aria-describedby`.
- All user-facing text uses UK / NZ English.

The page's `<PhotoContentSection>` props must match the manifest: `imageSrc="/<output>"`, `imageAlt`, `imageTitle`, `imageDescription`. `<Hero>` takes `imageSrc`, `imageAlt` and `imageTitle` (it has no description prop).

## Building

```bash
node .agents/skills/image_generation/build_images.cjs             # every image
node .agents/skills/image_generation/build_images.cjs /lock/rekey # entries whose page or output matches
```

- Content images: **1024x1024** webp, **under 100KB**.
- Hero image: **1600x900** webp, **under 175KB**.
- Entries with `"locked": true` are skipped so a committed image is never re-encoded. Remove `locked` only when deliberately replacing that image.
- A `.webp` source that is already the target size and within budget is copied byte-for-byte.
- Sources in `Content/Generated/` have their background colour-matched to exactly `#FAFAFA` so they blend into `bg-brand-light` sections with no visible edge.
- Anything else is auto-rotated, cropped, lightly sharpened and compressed, stepping quality down from 82 until it fits.

## Review every build

`attention` smart-crop is a starting point, not the final answer. After building, look at every output (a contact sheet is fastest) and check:
- The whole subject is in frame (both deadbolt *and* handle, the full smart lock body, the key tag).
- No watermark, logo, text or stray clutter (bags, bins, cables) at the edges.
- The alt text still describes what the crop actually shows. If the crop changes the subject, update `alt` (and the filename if needed).

Fix a bad crop with an explicit `crop` box and rebuild that entry only. Delete any orphaned files from `public/images/` when an `output` path changes.
