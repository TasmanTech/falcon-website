---
name: jsdoc-enforcer
description: >-
  Add or fix JSDoc comments across the front-end and back-end source. Use when asked to document code,
  when adding new exported functions, components, classes or endpoints, or when reviewing code that
  lacks documentation.
---

# JSDoc Enforcer

## Targets (skip test files)
- Back-end: `apps/back-end/src/**/*.ts` and `apps/back-end/scripts/*.mjs`.
- Front-end: `apps/front-end/app/**/*.tsx`, `app/actions/*.ts`, `components/**/*.tsx`, `lib/**/*.ts` and `proxy.ts`.

## Rules
- Every exported class, interface, type, function, React component, controller handler and service method has a JSDoc block saying what it does and why, not restating its name.
- Use `@param {Type} name - meaning` for each parameter (nested props as `props.name`) and `@returns {Type} meaning`; add `@throws` where it throws on purpose.
- Components: describe the UI role, behaviour (client or server, side effects) and props.
- Constants and fields: a one-line `/** ... */` when the purpose is not obvious.
- Prose in comments uses UK / NZ English.

Good examples to copy: `lib/idle.ts`, `lib/invoice.ts` (`authorisedFetch`), `components/SiteChrome.tsx`, `apps/back-end/src/app.module.ts` (`buildDatabaseOptions`).

Read the code before writing; no generic stubs. Do not change behaviour while documenting.
