---
name: Back-end Module Layout
description: Guidelines for structuring and laying out modules in the NestJS back-end.
---

# Back-end Module Layout Guidelines

The back-end of this project is a **NestJS** application utilizing **TypeORM**. When creating or modifying back-end modules in `apps/back-end/src/`, strictly adhere to the following resource-based directory structure and naming conventions:

## 1. Resource-based Directory Structure
Each logical resource should have its own directory (e.g., `offer/`, `user/`, `contact/`). All files related to that resource must be housed within its directory.

## 2. Standard Files per Module
A typical module directory should include the following core files, named according to the `[module-name].[type].ts` convention:
- **Module** (`[module].module.ts`): Configures and exports the module, controllers, and services.
- **Controller** (`[module].controller.ts`): Handles incoming HTTP requests and routes them to services.
- **Service** (`[module].service.ts`): Contains business logic and interacts with the repository/entities.
- **Entity** (`[module].entity.ts`): Defines the TypeORM database schema for the resource.

## 3. DTOs (Data Transfer Objects)
- Create a `dto/` subdirectory within the module folder for all data transfer objects.
- Name DTO files using the `[purpose].dto.ts` convention (e.g., `create-[module].dto.ts`, `update-[module].dto.ts`).
- Use `class-validator` and `class-transformer` decorators in DTOs for request validation.

## 4. Supplementary Files
If a module requires additional controllers or services (e.g., for specific secondary routes), name them descriptively but keep them within the same resource folder (e.g., `public-contact.controller.ts` or `cleanup.service.ts`).

Plain helpers that are not Nest providers (rendering, file storage, constants) also live in the resource folder and are named `[module]-[purpose].ts` or `[module].constants.ts`, each with its own `.spec.ts` where it has logic. The `invoice/` module is the reference: `invoice-pdf.ts` (PDF rendering), `invoice-storage.ts` (PDF files on disk) and `invoice.constants.ts`.

## 5. Current Modules
Admin-facing modules (`invoice/`, `lead/`) are guarded by `JwtAuthGuard` at the controller level. Follow the `admin_portal` skill when changing them.

## Example Layout
```
src/
└── contact/
    ├── dto/
    │   ├── create-contact.dto.ts
    │   └── update-contact.dto.ts
    ├── contact.module.ts
    ├── contact.controller.ts
    ├── internal-contact.controller.ts
    ├── contact.service.ts
    └── contact.entity.ts
```
