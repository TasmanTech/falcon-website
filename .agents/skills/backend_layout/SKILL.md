---
name: backend-layout
description: >-
  Folder layout, file naming and wiring for NestJS modules in apps/back-end/src. Use when creating a new
  back-end module, adding a controller, service, entity, DTO or helper, or registering a module in
  app.module.ts.
---

# Back-end Module Layout

The back-end is NestJS 12 with TypeORM on PostgreSQL, bundled by webpack (`webpack.config.cjs`) into `dist/main.mjs`. Relative imports are written **without** a file extension (`import { InvoiceService } from './invoice.service';`), matching the existing code.

## Current modules (`apps/back-end/src/`)
| Folder | Contents | Notes |
|---|---|---|
| `admin/` | `admin.entity.ts` | Admin users, registered by `AuthModule`; managed with `scripts/create-admin.mjs` |
| `auth/` | controller, service, module, `jwt-auth.guard.ts`, `auth.constants.ts`, `dto/login.dto.ts` | `/auth/login`, `/auth/refresh`, `/auth/logout`; JWT access + refresh tokens |
| `contact/` | controller, service, module, `dto/create-contact.dto.ts` | Public `POST /contact`; emails the enquiry, no entity |
| `invoice/` | controller, service, module, entity, DTOs, `invoice-pdf.ts`, `invoice-storage.ts`, `invoice.constants.ts` | Admin only (`JwtAuthGuard`), see `admin_portal` skill |
| `lead/` | controller, service, module, entity, DTOs | Admin only (`JwtAuthGuard`), see `admin_portal` skill |
| `common/assets/` | `assets.util.ts` | Resolves files in `apps/back-end/assets/` (e.g. the invoice badge) |
| root | `main.ts`, `app.module.ts`, `app.controller.ts`, `app.service.ts`, `redirect.filter.ts` | Bootstrap, DB config, global 404 redirect filter |

## Conventions
- One folder per resource, files named `<resource>.<type>.ts`: `.module`, `.controller`, `.service`, `.entity`.
- DTOs in `dto/`, named `<action>-<resource>.dto.ts` (`create-invoice.dto.ts`, `update-lead-status.dto.ts`, `list-invoices.dto.ts`), decorated with `class-validator` / `class-transformer`.
- Plain helpers that are not providers live in the same folder as `<resource>-<purpose>.ts` or `<resource>.constants.ts` (see `invoice/`).
- Every file with logic has a colocated `<name>.spec.ts` (`backend_testing` skill).
- Admin-only controllers use `@UseGuards(JwtAuthGuard)` at class level.
- Entities are picked up by `autoLoadEntities: true`; register each entity with `TypeOrmModule.forFeature([...])` in its module.
- Add the module to `imports` in `app.module.ts`.
- Files the runtime reads from disk go in `apps/back-end/assets/`, are committed, and are resolved through `common/assets/assets.util.ts`. If one is required, add a check to `apps/back-end/Dockerfile` like the existing `invoice-badge.png` check.

## Example
```
src/invoice/
├── dto/
│   ├── create-invoice.dto.ts
│   ├── create-invoice.dto.spec.ts
│   ├── list-invoices.dto.ts
│   └── update-invoice-status.dto.ts
├── invoice.constants.ts
├── invoice.controller.ts (+ .spec.ts)
├── invoice.entity.ts
├── invoice.module.ts (+ .spec.ts)
├── invoice.service.ts (+ .spec.ts)
├── invoice-pdf.ts (+ .spec.ts)
└── invoice-storage.ts (+ .spec.ts)
```
