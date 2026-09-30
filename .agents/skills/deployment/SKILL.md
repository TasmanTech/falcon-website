---
name: deployment
description: >-
  How to commit, push and deploy Falcon Access: the TasmanTech GitHub account, the staging branch and
  the PR to master that triggers the Cloud Run deploy. Use whenever asked to commit, push or deploy.
---

# Commit, Push & Deploy

## Account
- Commit and push as the **TasmanTech** GitHub account, author `Tasman Tech <admin@tasmantech.co.nz>`.
- On the owner's machine this is automatic for every repo under `Documents/Tasman Tech/` through a
  conditional include (`~/.gitconfig-tasmantech`). A personal account (e.g. `HusseinAljanaby`) gets a
  403 on `TasmanTech/falcon-website`.
- The `gh` CLI may be logged in as a personal account. For `gh` commands, pass the TasmanTech token
  for that command only:
  `GH_TOKEN=$(printf 'protocol=https\nhost=github.com\nusername=TasmanTech\n\n' | git credential fill | sed -n 's/^password=//p') gh ...`

## Branches
- Work on `staging`. The remote is named `github`, not `origin`.
- `master` is production. Never commit or push to it directly.

## Before pushing
1. Back end: `npm --prefix apps/back-end run test` and `npm run build:backend`.
2. Front end: `npx vitest run`, `npx tsc --noEmit` and `npx eslint` on the changed files (from `apps/front-end`).
3. Report the real pass counts. Known noise: `test/app.e2e-spec.ts` fails `tsc` on its own; it is not part of the build.

## Deploy
1. Push `staging`: `git push github staging`.
2. Open a PR: `gh pr create -R TasmanTech/falcon-website --base master --head staging`. End the body
   with the Claude Code attribution line.
3. Merge it with a merge commit. Merging to `master` runs `.github/workflows/ci-cd.yml`, which tests
   and deploys only the app (`apps/back-end`, `apps/front-end`) whose files changed.
4. Merging needs the owner's permission. If it is blocked, leave the PR open and give the owner the link.

## No deploy needed
- Changes limited to `.agents/`, `.claude/`, `README.md` or other non-app files: commit and push to
  `staging` only. The workflow's path filter would skip them anyway.
