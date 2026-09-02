---
name: Core Animation Standards
description: Guidelines for animating UI elements like cards, text blurbs, SVGs, and images using standard Tailwind classes.
---

# Core Animation Standards

When creating or updating UI elements, apply these specific animation classes to ensure consistent motion across the application. These animations are defined in `globals.css` and use a `[ready-class] [play-class]` format.

## Standard Classes

1. **Div Cards & Containers** (Fastest: 0.25s slide-up)
   - Apply to: Parent `div` wrappers, panels, cards, and large form buttons.
   - Classes: `animate-card-ready animate-play`
   - Example:
     ```tsx
     <div className="bg-white rounded-lg p-6 animate-card-ready animate-play">
       {/* Content */}
     </div>
     ```

2. **SVGs & Icons** (Faster: 0.35s slide-up)
   - Apply to: Standalone SVGs, icon wrappers.
   - Classes: `animate-svg-ready animate-play-svg`
   - Example:
     ```tsx
     <svg className="w-6 h-6 animate-svg-ready animate-play-svg" ...>
     ```

3. **Text Blurbs & Headers** (Slow: 0.5s fade-in)
   - Apply to: Paragraphs, headings, hero text, and small error messages.
   - Classes: `animate-text-blurb-ready animate-play-text`
   - Example:
     ```tsx
     <p className="text-slate-500 animate-text-blurb-ready animate-play-text">
       Description text goes here.
     </p>
     ```

4. **Images** (Slowest: 0.7s fade-in)
   - Apply to: `<Image>` components or `<img>` tags.
   - Classes: `animate-image-ready animate-play-img`
   - Example:
     ```tsx
     <Image src="..." className="animate-image-ready animate-play-img" ... />
     ```

## Rules
- **DO NOT** use default Tailwind animations (like `animate-fade`) unless specifically requested. Always use the custom ready/play class pairs.
- Elements will start invisible (`opacity: 0`) thanks to the `*-ready` class, and will transition into view when the `*-play` class is applied.
- **Feature Card Hover Effects**: Keep interactive hover states simple and lightweight. Instead of heavy shadows, use a subtle lift and border change (e.g., `-translate-y-1 hover:border-brand-accent transition-all duration-200`). Do not use expensive `shadow-2xl` or internal scaling effects that require complex repaints.
