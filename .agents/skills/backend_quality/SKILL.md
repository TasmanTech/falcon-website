---
name: backend-quality
description: >-
  Type-check and lint the NestJS back-end and fix every error. Use when apps/back-end fails tsc, ESLint
  or the webpack build, or after back-end changes before committing.
---

# Back-end Quality

Run everything from `apps/back-end`.

1. **Type-check**: `npx tsc --noEmit`.
   - Known noise: `test/app.e2e-spec.ts` reports errors on its own. It is not part of the build or the Jest run; ignore only that file.
   - Fix the rest properly: missing DTO fields, null checks, explicit return types. Re-run until clean.
2. **Lint**: `npm run lint`. It runs ESLint **with `--fix`** over `src` and `test`, so review the diff it produces. Fix what remains by hand; use `eslint-disable` only with a justification comment.
3. **Build**: `npm run build` (webpack to `dist/main.mjs`). This catches bundling problems `tsc` misses. From the repo root the same check is `npm run build:backend`.
4. **Standards**
   - No `any`; use interfaces, DTOs, enums or `unknown`.
   - Explicit return types on controller handlers and service methods.
   - Read config through `ConfigService` (`config.get<string>('NAME')`).
   - Relative imports have no file extension, matching the existing code.
5. Report what failed, what you changed, and the final result of each step.
