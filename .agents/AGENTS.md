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

## Copywriting & SEO Vocabulary
- **Prioritize High-Traffic Keywords**: Always use terms like **"web design"** and **"web developer"** (or "web development") when describing services on public-facing pages.
- **Avoid Technical Jargon**: Avoid using overly technical terms like "engineering", "infrastructure", or "software architecture" unless specifically required for a deeply technical audience. Keep the copy accessible and aligned with what clients actually search for.
- **Exception for Internal Links**: When writing anchor text for `<Link>` components, it is strongly encouraged to use specific, technical terminology (e.g., "React frontend architecture" instead of "custom websites") that accurately describes the target page to maximize SEO link equity.
- **Punchy Call-to-Actions (CTAs)**: Keep CTA button text short, action-oriented, and contextually relevant to the page (e.g., "Discuss Your App", "Connect Now", "Get Started"). Strictly avoid long, generic, compound statements like "Book a Consultation / Connect With Tech Experts".

## Routing & Links
- **Promo Codes**: When linking a promotional code (e.g., in a hero offer), direct the user to the quoting flow using a URL parameter (`/quote?promo=CODE`) rather than the standard booking flow (`/book`).
- **Sitemap Maintenance**: Whenever creating a new public-facing page in the Next.js front-end, always ensure it is added to `apps/front-end/app/sitemap.ts` to maintain accurate SEO indexing.
- **Internal Linking (Inlinks)**: Always add as many relevant internal links (inlinks) as possible to existing pages, without altering the readable copy. Make sure inlinks are consistently added when generating or modifying content to improve SEO and user navigation.
