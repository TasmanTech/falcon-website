---
description: Type-check, lint and test both apps, fixing failures until everything passes. Does not commit.
---

1. See what changed: `git status --short` and `git diff --stat github/master...HEAD`. If only one app changed you may run only its steps; say so in the report.

// turbo
2. Front-end type-check: run `npx tsc --noEmit` in `apps/front-end`.

// turbo
3. Back-end type-check: run `npx tsc --noEmit` in `apps/back-end`. Ignore errors in `test/app.e2e-spec.ts` only (known noise).

4. Fix every type error with the `frontend_quality` / `backend_quality` skills and re-run until clean.

// turbo
5. Front-end lint: run `npm run lint` in `apps/front-end`.

6. Back-end lint: run `npm run lint` in `apps/back-end`. It runs with `--fix`, so review the diff it makes.

// turbo
7. Run `npm --prefix apps/front-end run test` from the repo root.

// turbo
8. Run `npm --prefix apps/back-end run test` from the repo root.

9. Fix failing tests with the `frontend_testing` / `backend_testing` skills. Fix the code when it is wrong, not the assertion.

10. If pages, layouts, `next.config.ts`, webpack config or dependencies changed, run `npm run build:frontend` and `npm run build:backend` from the repo root.

11. Check every new or changed page, component, action, `lib/` helper, controller, service, entity and module has a colocated test, and that no temporary scripts or reports were left in the repo (`git status --short`; `AGENTS.md`, Temporary Files).

12. Report what failed, what you changed and the final pass / fail of each step, with real test counts. Do not commit unless asked.
