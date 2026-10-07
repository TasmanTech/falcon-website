# Falcon Access Back-end

NestJS API for the Falcon Access website. It emails contact-form enquiries and powers the private `/admin` portal: admin login, invoices (PDF generation, storage and email) and leads.

## Stack
- NestJS 12 on Express, with Helmet, a global `ValidationPipe` (`class-validator`) and a login throttler.
- TypeORM on PostgreSQL (Cloud SQL in production), `synchronize: true`, no migrations.
- Nodemailer through a Google Workspace service account; pdfkit for invoice PDFs.
- Bundled by webpack (`webpack.config.cjs`) to `dist/main.mjs`; tested with Jest + `@swc/jest`.

## Getting started
Create `apps/back-end/.env` (names below), then from the repo root:
```bash
npm install
npm run dev:back-end      # or, in this folder: npm run start:dev
```
The API listens on `PORT` (default 3001). It needs a reachable Postgres database to start.

## Scripts (in this folder)
| Script | Does |
|---|---|
| `npm run start:dev` | Rebuild with webpack and restart on changes (nodemon) |
| `npm run build` | Webpack build to `dist/main.mjs` |
| `npm start` / `npm run start:prod` | Run `dist/main.mjs` |
| `npm run lint` | ESLint with `--fix` |
| `npm test` / `npm run test:cov` | Jest unit tests (`src/**/*.spec.ts`) / with coverage |
| `npm run test:e2e` | E2E tests (`test/jest-e2e.json`; not run in CI) |

## Modules and routes
| Module | Routes | Access |
|---|---|---|
| `app` | `GET /` | Public |
| `contact` | `POST /contact` | Public (emails the enquiry) |
| `auth` | `POST /auth/login`, `/auth/refresh`, `/auth/logout` | Public (throttled login) |
| `invoice` | `GET/POST /invoices`, `POST /invoices/preview`, `GET /invoices/:id/pdf`, `PATCH /invoices/:id/status`, `DELETE /invoices/:id` | `JwtAuthGuard` |
| `lead` | `GET/POST /leads`, `PUT /leads/:id`, `PATCH /leads/:id/status`, `DELETE /leads/:id` | `JwtAuthGuard` |

Unknown routes are redirected to the website by `redirect.filter.ts`.

## Environment variables
Names only; never commit values. In production they come from GitHub secrets via `.github/workflows/ci-cd.yml`.

| Variable | Purpose |
|---|---|
| `PORT` | Listen port (default 3001; Cloud Run sets 8080) |
| `FRONTEND_URLS` | Allowed CORS origins, separated by `\|` |
| `FRONTEND_URL` | Optional. Where unknown routes redirect (defaults to `https://falconaccess.co.nz`) |
| `DB_HOST` | Cloud Run: `/cloudsql/<project>:<region>:<instance>`. Locally: the instance's public IP (SSL), or `127.0.0.1` with the Cloud SQL Auth Proxy |
| `DB_NAME`, `DB_USER`, `DB_PASS` | Postgres database and credentials |
| `JWT_SECRET`, `JWT_REFRESH_SECRET` | Two different long random strings: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM` | Outgoing mail; `SMTP_FROM` is also BCC'd on every invoice email |
| `SERVICE_ACCOUNT_CLIENT_ID`, `SERVICE_ACCOUNT_PRIVATE_KEY` | Google Workspace service account used to send mail |
| `GST_NUMBER` | Optional. Printed on invoices and required before GST can be charged |
| `INVOICE_STORAGE_DIR` | Optional. Where PDFs are kept. Defaults to `/app/data/invoices` on Cloud Run (the Cloud Storage volume mounted at `/app/data`) and `data/invoices` locally |

`NODE_ENV=production` scopes the refresh cookie to `.falconaccess.co.nz`; `K_SERVICE` (set by Cloud Run) turns off database SSL for the Cloud SQL socket.

## Admin users
Admins live in the `admin` table. Create one, or reset a password, after the back-end has started once (so the table exists). Run from this folder (it reads `.env`):

```bash
node scripts/create-admin.mjs info@falconaccess.co.nz '<password>'
```

Changing an admin's password signs out their sessions; rotating `JWT_REFRESH_SECRET` signs out everyone.

The invoice badge (`assets/invoice-badge.png`) is regenerated with `node scripts/generate-invoice-badge.mjs`. The Dockerfile fails the build if it is missing.

## Deployment
Built from `apps/back-end/Dockerfile` and deployed to Cloud Run as `falcon-backend-service` (with the Cloud SQL instance attached) when a back-end change reaches `master`. A new env var must also be added to the workflow's `--set-env-vars`. See the root README.

## Agent guidance
See [`../../.agents/AGENTS.md`](../../.agents/AGENTS.md), especially the `backend_layout`, `backend_testing` and `admin_portal` skills.
