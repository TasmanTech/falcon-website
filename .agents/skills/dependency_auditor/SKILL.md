---
name: dependency-auditor
description: >-
  Agent instructions for checking the codebase for outdated, deprecated, or vulnerable packages, as well as identifying dead code.
---

# Dependency Auditor Agent

Your role is to ensure the project uses modern, secure, and actively maintained dependencies, and that the codebase does not contain deprecated or unused (dead) code.

## Execution Steps

1. **Audit Packages**:
   - Run `npm outdated` in the root and workspace directories (`apps/front-end`, `apps/back-end`) to identify packages that are severely outdated.
   - Run `npm audit` to identify vulnerabilities and deprecated packages.
   - Update `package.json` to safely bump minor/patch versions, or major versions if they do not introduce breaking changes (or if you can refactor the code to support the breaking changes).

2. **Audit Code (Deprecated & Dead Code)**:
   - Identify usage of deprecated APIs or methods within the source code (often flagged by TypeScript or ESLint).
   - Search for unused exports, variables, or dead code paths (e.g., using `ts-prune`, `knip`, or ESLint `no-unused-vars`).
   - Refactor or remove the dead and deprecated code.

3. **Framework Upgrades (Next.js & NestJS)**:
   - Always target the **latest stable** release, never `canary`, `rc`, `beta`, `next` or `preview` tags. Resolve it live with `npm view <pkg> dist-tags.latest` rather than trusting versions written in docs or memory.
   - Upgrade each framework as a family so versions stay in lockstep:
     - **Front-end**: `next`, `@next/third-parties`, `eslint-config-next` (pin to the exact same version as `next`), plus `react` / `react-dom` at their latest stable.
     - **Back-end**: `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/testing`, `@nestjs/config`, `@nestjs/cli`, `@nestjs/schematics` — all on the same major.
     - **Root `package.json`**: keep its copies of `@nestjs/*` and `react` / `react-dom` aligned with the workspaces.
   - Verify with `npm ls next @nestjs/core @nestjs/cli react` that there is a single resolved version of each (no stray older copies).
   - Read the framework's upgrade guide for any major bump and apply codemods (`npx @next/codemod@latest upgrade latest`, Nest migration guide) before hand-fixing.
   - **Cache Components** (`cacheComponents: true` in `next.config.ts`): non-deterministic values such as `new Date()`, `Date.now()` or `Math.random()` in a server component will fail the prerender step of `next build`. Move them into a small `"use cache"` component with `cacheLife(...)` (see `components/CopyrightYear.tsx`), a `"use client"` component, or behind `await connection()`. Async `"use cache"` components cannot render in Vitest/jsdom, so mock them in component tests.

4. **Deployment Parity (Cloud Run)**:
   - The Cloud Run deploy builds from `apps/front-end/Dockerfile` and `apps/back-end/Dockerfile` with `npm ci` on a clean checkout. Local `dist/` or `.next/` output is git-ignored and never reaches the image, so a stale local artefact can hide a broken build.
   - Before declaring an upgrade done, reproduce the CI pipeline from the repo root:
     1. `npm ci` (must succeed without `--legacy-peer-deps`).
     2. `npm --prefix apps/back-end run test` and `npm --prefix apps/front-end run test`.
     3. `npm run build:backend` and `npm run build:frontend`.
     4. When Docker is running: `docker build -f apps/back-end/Dockerfile .` and `docker build -f apps/front-end/Dockerfile .`.
   - Confirm each Dockerfile `CMD` points at a file the build actually emits. The back-end webpack config outputs `apps/back-end/dist/main.mjs` (not `main.js`); smoke-test it with `node apps/back-end/dist/main.mjs` from the repo root.
   - Commit the regenerated `package-lock.json` alongside `package.json` changes, otherwise `npm ci` in CI will fail.

5. **Application**:
   - Document any major package updates or removed dead code in a summary report for the user.
   - Ensure the project still builds, tests and starts successfully using the Deployment Parity checks above.
