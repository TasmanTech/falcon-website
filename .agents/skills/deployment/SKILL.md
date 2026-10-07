---
name: deployment
description: >-
  How to commit, push and deploy Falcon Access: the TasmanTech GitHub account, the staging branch, the
  staging-to-master PR, and the GitHub Actions pipeline that tests, deploys to Cloud Run and purges the
  Cloudflare cache. Use whenever asked to commit, push, open a release PR, deploy, or debug a deploy.
---

# Commit, Push and Deploy

## Account
- Commit and push as the **TasmanTech** GitHub account, author `Tasman Tech <admin@tasmantech.co.nz>`.
- On the owner's machine this is automatic for every repo under `Documents/Tasman Tech/` through a conditional include (`~/.gitconfig-tasmantech`). A personal account gets a 403 on `TasmanTech/falcon-website`.
- The `gh` CLI may be logged in as a personal account. Pass the TasmanTech token for that one command:
  `GH_TOKEN=$(printf 'protocol=https\nhost=github.com\nusername=TasmanTech\n\n' | git credential fill | sed -n 's/^password=//p') gh ...`

## Branches
- Work on `staging`. The remote is named `github`, not `origin`.
- `master` is production. Never commit or push to it directly.
- Stage only the files you changed (`git add <paths>`), never `git add -A`; other sessions may be editing the same tree.

## Before pushing
Run `/quality-check`, or at least:
1. Back end: `npm --prefix apps/back-end run test` and `npm run build:backend`.
2. Front end: `npm --prefix apps/front-end run test`, `npx tsc --noEmit` and `npm run lint` (in `apps/front-end`), and `npm run build:frontend` when pages, config or dependencies changed.
3. Report real pass counts. Known noise: `apps/back-end/test/app.e2e-spec.ts` fails `tsc` on its own; it is not part of the build.

## Deploy
1. Push: `git push github staging`.
2. Run `/pre-deploy`, then open the PR: `gh pr create -R TasmanTech/falcon-website --base master --head staging`. End the body with the Claude Code attribution line.
3. Merge it with a merge commit. Merging needs the owner's permission; if it is blocked, leave the PR open and give the owner the link.

## What the pipeline does (`.github/workflows/ci-cd.yml`)
On every push to `master` (or a manual `workflow_dispatch`, whose `force_backend` / `force_frontend` inputs skip change detection):
1. `dorny/paths-filter` decides what changed: `apps/back-end/**` or `apps/front-end/**`. A change to the root `package.json` counts for both.
2. Each changed app is tested on Node 24 (`npm ci`, then `npm --prefix apps/<app> run test`). A failing test stops that app's deploy.
3. **Back end**: builds `apps/back-end/Dockerfile`, pushes `falcon-backend` to Artifact Registry (`us-central1`) and deploys Cloud Run service `falcon-backend-service` with the Cloud SQL instance attached and env vars from GitHub secrets.
4. **Front end**: builds `apps/front-end/Dockerfile` with `NEXT_PUBLIC_BACKEND_URL=https://api.falconaccess.co.nz` baked in, deploys `falcon-frontend-service`, then **purges the whole Cloudflare cache** (`CLOUDFLARE_ZONE_ID` and `CLOUDFLARE_API_TOKEN` secrets; skipped with a message if they are not set).

Consequences:
- A new back-end env var must be added to the `--set-env-vars` list in the workflow and as a GitHub secret (or variable), or it will be missing in production.
- A new `NEXT_PUBLIC_*` var must be passed as a Docker `--build-arg` and declared as an `ARG` in `apps/front-end/Dockerfile`, because Next.js inlines it at build time.
- Deploy results are in GitHub Actions on `TasmanTech/falcon-website`.

## No deploy needed
Changes limited to `.agents/`, READMEs or other non-app files: commit and push to `staging` only. The path filter would skip them anyway.
