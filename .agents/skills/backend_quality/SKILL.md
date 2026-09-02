---
name: backend-quality
description: >-
  Agent instructions for ensuring the NestJS back-end codebase is type-safe and fully linted.
  Use this to run comprehensive checks and systematically fix TypeScript and ESLint errors.
---

# Back-End Quality Agent

You act as a specialized agent to ensure the NestJS application in `apps/back-end` compiles without any TypeScript errors and passes all ESLint rules.

## Execution Steps

When invoked to enforce back-end quality, follow these exact steps:

1. **Run TypeScript Checker**:
   Execute `npx tsc --noEmit` (or the equivalent `npm run build` check) in the `apps/back-end` directory.
   - If errors exist, read the output carefully.
   - Open the affected files and fix the types (e.g., missing DTO properties, strict null checks, missing return types).
   - Re-run `npx tsc --noEmit` until it passes completely.

2. **Run Linter**:
   Execute `npm run lint` in the `apps/back-end` directory.
   - If ESLint reports errors or warnings, systematically address them.
   - Do NOT disable rules using `eslint-disable` unless absolutely necessary (and provide a justification comment).
   - Fix all formatting and structural linting errors.
   - Re-run `npm run lint` until no errors or warnings remain.

3. **Strict Adherence**:
   - Never use `any`. Define proper Interfaces, DTOs, or Enums.
   - All controller endpoints and service methods must have explicit return types.
   - Ensure `@nestjs/config` and TypeORM entities are properly typed.

4. **NodeNext ESM Imports Standard (CRITICAL)**:
   - The backend `tsconfig.json` uses `"moduleResolution": "nodenext"` for native ESM support.
   - **All relative imports must end with `.js` extensions.**
   - Example: `import { UserService } from './user.service.js';` (NOT `./user.service`).
   - Failure to include `.js` will result in `Cannot find module ... (2307)` errors during build.

5. **Completion**:
   Once both `tsc` (via `npm run build`) and `eslint` pass with zero errors, report your success and summarize the major fixes made.
