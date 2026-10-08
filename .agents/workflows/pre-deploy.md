---
description: Go / no-go check before merging staging into master, which deploys production. Verifies only; never pushes or merges.
---

Merging `staging` into `master` triggers `.github/workflows/ci-cd.yml`, which deploys each changed app to Cloud Run and purges the Cloudflare cache. This workflow only checks. Never push, open or merge a PR unless the user explicitly says to (`deployment` skill).

1. Run `git fetch github`, then `git log --oneline github/master..github/staging` and `git diff --stat github/master...github/staging`. Confirm local `staging` has been pushed (`git status -sb`). Summarise what would ship, grouped by front-end, back-end and other, and say which deploy jobs the path filter will run (a root `package.json` change runs both).

2. **Schema check**: TypeORM runs with `synchronize: true` and no migrations. For every changed `*.entity.ts`, flag any renamed, retyped or removed column, or a new non-nullable column without a default. These can lose data or fail on start in production. Treat as a blocker until the user confirms.

3. **Env check**: search the diff for new `process.env.X` or `config.get('X')` keys. Each back-end key must be in the `--set-env-vars` list of `ci-cd.yml` (ask the user to confirm the GitHub secret exists). A new `NEXT_PUBLIC_*` key must be a `--build-arg` in the workflow and an `ARG` in `apps/front-end/Dockerfile`. Also check the reverse: a key the code reads with a `||` fallback but the workflow never sets fails silently in production. A missing key is a blocker.

4. **CSP check**: if the diff adds a third-party script, embed, image or API origin, confirm `next.config.ts` allows it in the right directive and that `localhost` is still development-only.

5. **Assets check**: new files the back-end reads at runtime must be committed under `apps/back-end/assets/`. Nothing in the diff should be a stray script or report (`scratch_*.js`, `fix-*.mjs`, `temp.js`, `lighthouse-report.json`, coverage output); flag any as a blocker.

6. **Content check**: grep the changed copy, metadata and `public/llms.txt` for "24/7", "24 hours", "web design", "web development" and minutes-based arrival times. Confirm new public pages are in `app/sitemap.ts` and `public/llms.txt`.

// turbo
7. Run `npm ci` from the repo root if any `package.json` or `package-lock.json` changed. It must pass without `--legacy-peer-deps`.

// turbo
8. Run `npm --prefix apps/front-end run test`.

// turbo
9. Run `npm --prefix apps/back-end run test`.

// turbo
10. Run `npm run build:frontend`.

// turbo
11. Run `npm run build:backend`.

12. Give a go / no-go verdict listing every blocker. If it is a go, give the PR command from the `deployment` skill (`gh pr create -R TasmanTech/falcon-website --base master --head staging`) for the user to run or approve, and remind them that deploy results show in GitHub Actions.
