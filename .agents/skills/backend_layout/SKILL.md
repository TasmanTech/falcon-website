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
If a module requires additional controllers or services (e.g., for admin specific routes), name them descriptively but keep them within the same resource folder (e.g., `admin-user.controller.ts` or `cleanup.service.ts`).

## Example Layout
```
src/
└── user/
    ├── dto/
    │   ├── update-profile.dto.ts
    │   └── customer.dto.ts
    ├── user.module.ts
    ├── user.controller.ts
    ├── admin-user.controller.ts
    ├── user.service.ts
    └── user.entity.ts
```
