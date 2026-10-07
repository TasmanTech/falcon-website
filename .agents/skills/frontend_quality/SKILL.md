---
name: frontend-quality
description: >-
  Type-check, lint and build the Next.js front-end and fix every error. Use when apps/front-end fails
  tsc, ESLint or next build, or after front-end changes before committing.
---

# Front-end Quality

Run everything from `apps/front-end`.

1. **Type-check**: `npx tsc --noEmit`. Fix the cause (missing interfaces, null checks, implicit `any`), then re-run until clean.
2. **Lint**: `npm run lint` (ESLint 9 flat config with `eslint-config-next` core-web-vitals and TypeScript rules). It does not auto-fix. Use `eslint-disable` only with a justification comment, as the existing code does.
3. **Build** when pages, layouts, `next.config.ts` or dependencies changed: `npm run build:frontend` from the repo root. This catches Cache Components prerender errors (e.g. `new Date()` in a server component) that `tsc` and Vitest miss.
4. **Standards**
   - No `any`; use `unknown` and narrow it, or define an interface.
   - Follow the front-end rules in `.agents/AGENTS.md` (Server Components by default, `sizes` on `fill` images, tags and CSP).
   - For Next.js 16 API questions, read `node_modules/next/dist/docs/` rather than relying on memory.
5. Report what failed, what you changed, and the final result of each step.
