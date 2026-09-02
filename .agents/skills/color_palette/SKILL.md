---
name: Color Palette
description: Official color palette definitions, usage guidelines, and contrast rules for the brand.
---

# Color Palette

The brand relies on a curated set of colors to maintain a premium aesthetic. These colors are defined in `app/globals.css` (Tailwind v4 `@theme inline`) and must be used consistently across the front-end.

## Core Brand Colors

### 1. Brand Dark (`bg-brand-dark`, `text-brand-dark`)
- **Hex**: `#044389` (Steel Azure)
- **Role**: The primary dark background color. Represents security, strength, and premium quality.
- **Usage**: Use for the main body background in dark mode, navbar backgrounds (e.g., `bg-brand-dark/90`), and heavy structural elements.

### 2. Brand Accent (`bg-brand-accent`, `text-brand-accent`)
- **Hex**: `#FFAD05` (Orange)
- **Role**: The primary vibrant accent color. Represents action and high-value service.
- **Usage**: Use sparingly for primary call-to-action (CTA) buttons, hover states, active navigation links, and crucial highlights. It creates a stunning contrast against `brand-dark`.

### 3. Brand Primary (`bg-brand-primary`, `text-brand-primary`)
- **Hex**: `#5995ED` (Cornflower Blue)
- **Role**: The secondary accent color. Represents trustworthiness and professional service.
- **Usage**: Use for secondary buttons, information alerts, and supporting graphics that need color but shouldn't distract from the main CTA.

### 4. Brand Secondary (`bg-brand-secondary`, `text-brand-secondary`)
- **Hex**: `#7CAFC4` (Sky Reflection)
- **Role**: A supportive tertiary color for subtle highlights and background tints.
- **Usage**: Use for subtle graphical elements or secondary accents.

### 5. Brand Highlight (`bg-brand-highlight`, `text-brand-highlight`)
- **Hex**: `#FCFF4B` (Canary Yellow)
- **Role**: A bright, high-contrast highlight color.
- **Usage**: Use very sparingly for warning badges, notifications, or extreme highlights.

### 6. Brand Light (`bg-brand-light`, `text-brand-light`)
- **Hex**: `#FAFAFA`
- **Role**: The primary light background / text color.
- **Usage**: Use for text placed over dark backgrounds, or as the background color for light-mode sections and card components to keep the design feeling crisp and modern.

## Implementation Rules
- **Avoid Generic Colors**: Do not use raw Tailwind colors like `bg-red-500` or `bg-green-500` for main thematic elements unless specifically for validation (errors/success). Always prioritize the branded colors.
- **Opacity Modifiers**: Tailwind v4 allows opacity modifiers out of the box. Use them to create depth, e.g., `bg-brand-dark/80` with `backdrop-blur-md` for floating headers, or `hover:bg-brand-accent/90` for button hover states.
