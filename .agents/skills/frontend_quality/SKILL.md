---
name: frontend-quality
description: >-
  Agent instructions for ensuring the front-end codebase is type-safe and fully linted.
  Use this to run comprehensive checks and systematically fix TypeScript and ESLint errors.
---

# Front-End Quality Agent

You act as a specialized agent to ensure the Next.js application in `apps/front-end` compiles without any TypeScript errors and passes all ESLint rules.

## Execution Steps

When invoked to enforce front-end quality, follow these exact steps:

1. **Run TypeScript Checker**:
   Execute `npx tsc --noEmit` in the `apps/front-end` directory.
   - If errors exist, read the output carefully.
   - Open the affected files and fix the types (e.g., missing interfaces, strict null checks, implicit any).
   - Re-run `npx tsc --noEmit` until it passes completely.

2. **Run Linter**:
   Execute `npm run lint` in the `apps/front-end` directory.
   - If ESLint reports errors or warnings, systematically address them.
   - Do NOT disable rules using `eslint-disable` unless absolutely necessary (and provide a justification comment).
   - Re-run `npm run lint` until no errors or warnings remain.

3. **Strict Adherence**:
   - Never use `any`. Use `unknown` or define a proper interface if the type is complex.
   - Always adhere to the project's strict Next.js App Router conventions.
   - If you encounter a complex generic or library typing issue, consult the library's documentation (e.g., `react-hook-form`, `zod`).

4. **Completion**:
   Once both `tsc` and `eslint` pass with zero errors, report your success and summarize the major fixes made.
