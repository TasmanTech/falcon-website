# Workspace Rules

## Strict Type-Safety
When writing or modifying TypeScript code (both in the Next.js front-end and NestJS back-end), adhere strictly to the following type-safety guidelines:
- **No `any`**: Avoid the `any` type completely. Define proper interfaces, DTOs, or generic types instead.
- **Strict Null Checks**: Explicitly handle `null` and `undefined` cases in components, services, and utility functions to avoid runtime errors.
- **Explicit Return Types**: All exported functions, especially API controllers and complex custom hooks, must have explicitly defined return types.
- **Avoid Implicit `any`**: Ensure all variables and parameters have types specified or are strictly inferred by the TypeScript compiler.
- **Runtime Validation**: For incoming untyped data (e.g., API responses, environment variables, local storage), use a validation library like `zod` or `class-validator` (as used in the NestJS back-end) before assuming the data is safely typed.

## Next.js App Router Conventions
When working within the `apps/front-end` directory:
- **Server Components by Default**: Components are Server Components by default. Keep them that way unless they need client-side interactivity.
- **Client Components (`use client`)**: Only add the `"use client"` directive at the top of files that absolutely require browser APIs, React state (`useState`, `useReducer`), or lifecycle hooks (`useEffect`).
- **Data Fetching & Mutations**: Leverage Server Actions for mutations and standard `fetch` with Next.js caching rules for data retrieval whenever possible.
- **File Conventions**: Use standard App Router file names strictly (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).
- **Testing**: Every new or modified Component, Page, Server Action, and Hook MUST have an accompanying `.test.tsx` or `.test.ts` test file. Refer to the `frontend-testing` skill for detailed testing guidelines.
- **Image Optimization**: Whenever using the `<Image>` component from `next/image` with the `fill` property, you **must** provide a `sizes` prop (e.g., `sizes="(max-width: 768px) 100vw, 50vw"`). Failing to do so causes Next.js to default to `100vw`, which triggers console warnings and hurts performance.

## NestJS Architecture & Best Practices
When working within the `apps/back-end` directory:
- **Dependency Injection**: Always use NestJS's Dependency Injection system. Never instantiate services manually using `new`.
- **ConfigService**: Use the `@nestjs/config` `ConfigService` to access environment variables. Avoid using `process.env` directly in services or controllers.
- **Validation**: Ensure all DTOs are decorated properly for `class-validator` and `class-transformer` to enforce strict input validation at the controller level.
- **Testing**: Every new or modified Entity, Controller, Service, and Module MUST have an accompanying `.spec.ts` test file. Refer to the `backend-testing` skill for detailed testing guidelines.

## Environment Variables
- **Front-end**: Environment variables that need to be accessible in the browser must be strictly prefixed with `NEXT_PUBLIC_`. All others remain server-side only.
- **Back-end**: Do not commit secrets. Back-end specific environment variables must be loaded into the `ConfigModule` and optionally validated at startup.

## Date and Time Handling Across Stack
- **Standardize on UTC**: When transmitting dates between the front-end and back-end, always use UTC ISO strings (`new Date().toISOString()`).
- **No Manual Timezone Manipulation**: When receiving a UTC ISO string in the back-end (NestJS), **never** string-manipulate it to manually adjust timezones (e.g., do not split the string and forcefully append local offsets like `+12:00`). 
- **Preserve Absolute Time**: Parse the ISO string directly (e.g., `new Date(dto.dateTime)`) to accurately preserve the absolute timestamp. Any timezone-specific formatting or manipulation should happen only when presenting data to the user, not when constructing internal Date objects.

## UI & Styling Standards
- **Design Philosophy**: The core aesthetic is **Simple, Modern, Lightweight, and Mobile-First**. Prioritize ample whitespace, clean typography, and high contrast. Avoid heavy gradients, excessive backdrop blurs, or deeply nested shadows. Keep the UI flat and snappy.
- **Primary Buttons/Links**: Keep buttons modern and simple. Use rounded corners (e.g., `rounded-full` or `rounded-lg`), bold text, and a simple color fill (`bg-brand-accent`). Avoid aggressive uppercase styling or heavy drop shadows.
- **Native Smooth Scrolling**: Always rely on native CSS (`html { scroll-behavior: smooth; }` in `globals.css`) to handle in-page anchor link (hash) scrolling. Do not use JavaScript-based smooth scroll libraries.
- **Subtle Animations Only**: Use very lightweight CSS animations for entrances. No elements should load abruptly, but animations must be fast (under 0.3s) and simple (e.g., opacity fades).
- **Flat UI Elements**: Keep cards, comparison tables, and panels flat and clean. Use subtle borders (`border-gray-200` or `border-white/10`) instead of heavy outer drop shadows (`shadow-xl`).
- **Responsive Text Alignment**: For textual content blocks (like service capabilities) that stack with images on mobile screens, use `text-center lg:text-left` to ensure the text is centered on small devices but naturally left-aligned on desktop.

## Image & Asset Guidelines
- **Manifest First**: Every hero and content image is defined in `.agents/skills/image_generation/manifest.json` (source, crop, SEO filename, alt, title, description, AI prompt) and built with `build_images.cjs`. Follow the `image_generation` skill; never hand-drop images into `public/`.
- **Never Use the Same Image Twice**: Do not duplicate or reuse the same image file across multiple distinct sections of a page or different pages to cut corners. Every section that requires an image must have a unique, contextually appropriate image. An original photo and its AI-restyled version count as the same image.
- **Image Subject Constraints**: Use clean, photorealistic AI studio shots of **tools, locks, keys, vehicles and hardware** on a seamless `#FAFAFA` background (generated with Nano Banana Pro from the originals in `Content/`). No faces or identifiable people and no animals. A hand is acceptable only when it shows the service being carried out. Never publish an image with a visible watermark, logo or text overlay.
- **Format & Sizing**: Use `.webp`. Content images are square `1024x1024` (the photo frame is `aspect-square`); the homepage hero is `1600x900`.
- **Strict File Size Limits**: All content images must strictly be under **100KB**. Hero images can be slightly larger, but must remain under **~175KB**.
- **SEO Attributes**: Filenames are descriptive kebab-case (what is in the image + service + `auckland` where natural). Always pass `imageAlt`, `imageTitle` and `imageDescription` from the manifest.

## Copywriting & SEO Vocabulary
- **Prioritise High-Traffic Keywords**: Use the terms customers actually search for, such as "locksmith Auckland", "emergency locksmith", "lockout service", "lock repair", "rekey", "smart lock installation" and "car lockout".
- **No Web Design**: Falcon Access does not offer or refer web design. Never mention "web design", "web developer", "web development", "web team" or websites as a service, analogy or keyword anywhere: copy, metadata, keywords, JSON-LD schema or `public/llms.txt`.
- **Avoid Technical Jargon**: Avoid overly technical terms unless the page needs them. Keep the copy accessible and aligned with what clients actually search for.
- **Descriptive Internal Links**: When writing anchor text for `<Link>` components, use specific terms that describe the target page (e.g., "rekeying service" instead of "click here").
- **Punchy Call-to-Actions (CTAs)**: Keep CTA button text short, action-oriented, and contextually relevant to the page (e.g., "Call Now", "Get a Quote", "Get Help Now"). Strictly avoid long, generic, compound statements.

## Routing & Links
- **Promo Codes**: When linking a promotional code (e.g., in a hero offer), direct the user to the quoting flow using a URL parameter (`/quote?promo=CODE`) rather than the standard booking flow (`/book`).
- **Sitemap Maintenance**: Whenever creating a new public-facing page in the Next.js front-end, always ensure it is added to `apps/front-end/app/sitemap.ts` to maintain accurate SEO indexing, and to `apps/front-end/public/llms.txt` under the matching section with a one-line description. Keep the llms.txt key facts (phone, email, hours, call-out fee) in line with the LocalBusiness schema in `app/layout.tsx`.
- **Internal Linking (Inlinks)**: Always add as many relevant internal links (inlinks) as possible to existing pages, without altering the readable copy. Make sure inlinks are consistently added when generating or modifying content to improve SEO and user navigation.

## Company Information
- **Phone Number**: The official phone number for Falcon Access is `+64 9 243 1404`. When creating new links, always use this number and format the link as `tel:+6492431404`.
- **Company Focus**: The overarching framing of the business is **"Commercial & Residential Repair and Maintenance"**. Locksmithing should be presented as just *one* of the specialized services offered, not the entire identity of the business.
- **No 24/7 Claims**: Never say the business is open "24/7", "24 hours" or "at any hour" in copy, metadata or keywords. Use "after-hours support", "after-hours emergency" or "after-hours locksmith" instead.
- **No ETAs**: Never give arrival times or response-time estimates (e.g., "15 minute ETA", "within 30 minutes") in copy, metadata, schema or `public/llms.txt`. General wording like "fast", "prompt" or "rapid response" is fine.
- **Conversion Tracking**: `components/GoogleAdsTag.tsx` reports a Google Ads "Phone call lead" conversion for every `tel:` link on the site. Just use a normal `tel:+6492431404` link; do not add per-link `onClick` tracking or a second gtag loader.
- **No Invented Credentials**: Never invent certifications, licenses, or professional affiliations (e.g., claiming to be part of the "Master Locksmiths Association"). Maintain an authentic tone focused on practical, honest, and reliable hard work without relying on flashy, unsubstantiated credentials.

## Admin Portal (`app/admin/(portal)`)
- **Private Pages**: Everything under `/admin` is authenticated and must follow the private-page SEO rule (`robots: { index: false, follow: false }`, title only). Never add admin routes to `sitemap.ts`.
- **Mobile First**: The team uses the portal on their phones on the job. Build every admin screen for a phone first, with large tap targets (`h-12` buttons) and no hover-only actions.
- **Back-end Access**: Admin API calls go through `authorisedFetch` in `lib/invoice.ts`, which refreshes the access token on a 401. Every back-end admin controller uses `@UseGuards(JwtAuthGuard)`.
- **Invoices**: Follow the `admin_portal` skill. In short: client email is optional (without one the invoice is saved to History but not emailed); names, the job address and the technician are title-cased with `toTitleCase`; History only holds invoices that were stored successfully (and emailed, if there was an address).
- **Leads**: Lead messages are pasted into Telegram. Phone numbers in them use `formatLeadPhone`, which gives `+64211234567` with no spaces so Telegram links the whole number.

## Git & Deployment
- Follow the `deployment` skill. Work happens on `staging`; the remote is called `github` (`TasmanTech/falcon-website`).
- Commits and pushes use the **TasmanTech** GitHub account (`Tasman Tech <admin@tasmantech.co.nz>`), never a personal account.
- Deploying means opening a PR from `staging` to `master` and merging it. Merging to `master` runs the Cloud Run CI/CD. Pushing to `staging` alone does not deploy anything.
- Changes that only touch `.agents/` (or other non-app files) are committed and pushed to `staging` but do not need a deploy.
