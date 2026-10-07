---
name: backend-testing
description: >-
  How to write and run Jest specs for the NestJS back-end. Use when writing, reviewing or fixing
  .spec.ts files for back-end entities, DTOs, controllers, services, modules or helpers.
---

# Back-end Testing

- **Runner**: Jest 30 with `@swc/jest`, configured in `apps/back-end/package.json` (`rootDir: src`, files matching `*.spec.ts`). Use `@nestjs/testing` for modules.
- **Location**: colocate `<name>.spec.ts` next to the file it tests (e.g. `invoice/invoice.service.spec.ts`).
- **Run**: `npm --prefix apps/back-end run test` from the repo root (CI runs exactly this), or `npm test` / `npm run test:cov` in `apps/back-end`. `npm run test:e2e` uses `test/jest-e2e.json` and needs a database, so it is not part of CI.

## What to test
Every new or changed entity, DTO, controller, service, module and helper with logic gets a spec.

- **Services**: provide repositories and other dependencies as mocks in `Test.createTestingModule` (`getRepositoryToken(Entity)`). Cover success paths and thrown exceptions (`NotFoundException`, `BadRequestException`). Mock `ConfigService.get` and Nodemailer transports; never send real email or hit a real database.
- **Controllers**: mock the service fully and check routing, status codes and that the work is delegated. No business logic in controller specs.
- **DTOs**: validate edge-case payloads with `class-validator`'s `validate` (see `invoice/dto/create-invoice.dto.spec.ts`).
- **Modules**: a smoke test that the module compiles with its providers resolved (see `invoice/invoice.module.spec.ts`).
- **Helpers**: test pure functions directly (see `invoice/invoice-pdf.spec.ts`, `invoice/invoice-storage.spec.ts`).

Mock with `jest.fn()`, `jest.spyOn()` and `jest.mock()`, and reset mocks between tests. Report real pass counts when you finish.
