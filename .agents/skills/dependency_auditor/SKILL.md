---
name: dependency-auditor
description: >-
  Check for outdated, deprecated or vulnerable npm packages and dead code, and upgrade Next.js, NestJS
  and React safely. Use when asked to update dependencies, fix npm audit warnings, upgrade a framework,
  or when package.json or package-lock.json changes.
---

# Dependency Auditor

The repo is an npm workspace (`apps/*`) with one root `package-lock.json`. CI and the Dockerfiles install with `npm ci` on Node 24.

## 1. Audit packages
- `npm outdated` at the root (covers the workspaces) and `npm audit`.
- Bump patch and minor versions freely. Take a major only when you can fix its breaking changes in the same change.

## 2. Audit code
- Find deprecated APIs (flagged by TypeScript or ESLint) and unused exports or files (`npx knip` or ESLint `no-unused-vars`). Remove dead code.
- Stray scripts at the repo root (e.g. `scratch_refactor.js`) are not part of the app; flag them to the user rather than deleting them unasked.

## 3. Framework upgrades
- Target the **latest stable** release only (no `canary`, `rc`, `beta`, `next`). Check live with `npm view <pkg> dist-tags.latest`.
- Upgrade each family together:
  - **Front-end**: `next`, `@next/third-parties`, `eslint-config-next` (pinned to the exact `next` version), `react`, `react-dom`.
  - **Back-end**: every `@nestjs/*` package on the same major (`common`, `core`, `platform-express`, `config`, `jwt`, `typeorm`, `testing`, `cli`, `schematics`). `@nestjs/throttler` has its own version line.
  - **Root `package.json`**: keep its copies of `@nestjs/common`, `@nestjs/core`, `react` and `react-dom` aligned with the workspaces.
- Confirm one resolved version each: `npm ls next @nestjs/core react`.
- Read the upgrade guide for any major and run the official codemods first (`npx @next/codemod@latest upgrade latest`, the Nest migration guide). For Next.js, also read `apps/front-end/node_modules/next/dist/docs/`.
- Cache Components (`cacheComponents: true`): `new Date()`, `Date.now()` or `Math.random()` in a server component fails the `next build` prerender. Move them into a `"use cache"` component with `cacheLife` (see `components/CopyrightYear.tsx`), a client component, or behind `await connection()`. Async `"use cache"` components cannot render in Vitest/jsdom, so mock them in tests.

## 4. Deployment parity
Local `.next/` and `dist/` are git-ignored, so a stale local build can hide a broken one. From the repo root:
1. `npm ci` (must pass without `--legacy-peer-deps`).
2. `npm --prefix apps/back-end run test` and `npm --prefix apps/front-end run test`.
3. `npm run build:backend` and `npm run build:frontend`.
4. If Docker is running: `docker build -f apps/back-end/Dockerfile .` and `docker build -f apps/front-end/Dockerfile .`.
5. The back-end Dockerfile runs `apps/back-end/dist/main.mjs`; smoke-test it with `node apps/back-end/dist/main.mjs`.

Commit the regenerated `package-lock.json` with every `package.json` change, or `npm ci` fails in CI. A change to the root `package.json` triggers both deploy jobs.

## 5. Report
List the packages upgraded (old to new), dead code removed, and the result of each parity step.
