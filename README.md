# Falcon Access Website

The website and admin portal for [Falcon Access](https://falconaccess.co.nz), a mobile locksmith, smart lock, auto and repair business in Auckland. Built and maintained by Tasman Tech.

An npm workspaces monorepo:

| App | Stack | Does |
|---|---|---|
| [`apps/front-end`](apps/front-end/README.md) | Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4, Vitest | Public marketing site and the private `/admin` portal |
| [`apps/back-end`](apps/back-end/README.md) | NestJS 12, TypeORM + PostgreSQL, Nodemailer, pdfkit, Jest, webpack | Contact form email, admin login, invoices (PDF + email) and leads |

## Prerequisites
- Node.js 24 (what CI and the Docker images use) and npm.
- A PostgreSQL database for the back-end (production uses Cloud SQL; locally use its public IP or the Cloud SQL Auth Proxy). The public pages run without it.
- An `apps/back-end/.env` file (see the back-end README for the variable names).

## Getting started
```bash
npm install          # installs both workspaces from the root lock file
npm run dev          # front-end on http://localhost:3000, back-end on http://localhost:3001
```

## Scripts (root)
| Script | Does |
|---|---|
| `npm run dev` | Both apps in watch mode (`dev:front-end` + `dev:back-end`) |
| `npm run dev:front-end` / `dev:back-end` | One app in watch mode |
| `npm run build:frontend` / `build:backend` | Production build of one app (what the Dockerfiles run) |
| `npm run start:frontend` / `start:backend` | Start a built app |
| `npm run prod` | Build and start both apps |

Tests run per app: `npm --prefix apps/front-end run test` and `npm --prefix apps/back-end run test`.

## Structure
```
.agents/            Antigravity agent rules, skills and workflows (start at .agents/AGENTS.md)
.github/workflows/  ci-cd.yml: test and deploy to Cloud Run on push to master
apps/front-end/     Next.js site and admin portal
apps/back-end/      NestJS API
Content/            Source photos for image generation (git-ignored, local only)
```

## Environment variables
Names only; values live in local `.env` files and GitHub secrets, never in the repo.
- **Front-end**: `NEXT_PUBLIC_BACKEND_URL` (defaults to `http://localhost:3001`; baked in at build time).
- **Back-end**: see [`apps/back-end/README.md`](apps/back-end/README.md#environment-variables).

## Deployment
- Work happens on `staging` (remote `github`, repo `TasmanTech/falcon-website`). Pushing `staging` deploys nothing.
- Release by opening a PR from `staging` to `master` and merging it. A push to `master` runs `.github/workflows/ci-cd.yml`, which:
  1. detects which app changed (`apps/back-end/**`, `apps/front-end/**`; the root `package.json` counts as both),
  2. runs that app's tests on Node 24,
  3. builds its Docker image, pushes it to Artifact Registry and deploys Cloud Run service `falcon-backend-service` or `falcon-frontend-service` (`us-central1`),
  4. after a front-end deploy, purges the Cloudflare cache.
- The workflow can also be run by hand (`workflow_dispatch`) to force either deploy.

## AI agents
Agent guidance lives in [`.agents/`](.agents/AGENTS.md): always-on rules, task skills (SEO, images, testing, deployment and more) and workflows such as `/quality-check`, `/new-page` and `/pre-deploy`.
