---
name: backend-testing
description: >-
  Use this skill when writing, reviewing, or generating tests for the NestJS back-end.
  It provides guidelines on how to structure testing specs for entities, controllers, services, and modules.
---

# NestJS Back-end Testing Guidelines

This skill outlines the strict requirements and procedures for testing the NestJS backend.

## General Requirements

1. **Test Every Layer**: Every Entity, Controller, Service, and Module must have an accompanying `.spec.ts` file.
2. **Frameworks**: Use `Jest` and `@nestjs/testing` for all unit and integration tests.
3. **Mocks and Spies**: Always mock external dependencies (e.g., database repositories, third-party APIs, config services). Use `jest.mock()` and `jest.spyOn()` to isolate the unit under test.
4. **Coverage**: Aim for high test coverage, specifically focusing on edge cases, validation failure states, and error handling.

## Layer-Specific Guidelines

### 1. Services
- Services contain the core business logic.
- Ensure all injected repositories or dependencies are provided as mocks in the `Test.createTestingModule` setup.
- Test both successful operations and thrown exceptions (e.g., `NotFoundException`, `BadRequestException`).

### 2. Controllers
- Controllers handle HTTP routing and DTO validation.
- Focus on testing routing, status codes, and whether the controller correctly delegates the workload to the underlying Service.
- Mock the Service completely. Do not test business logic in the controller spec.

### 3. Entities / DTOs
- While entities and DTOs are mostly classes with decorators, ensure that custom methods, getters, or data transformations are unit tested.
- If using `class-validator`, you can write tests to ensure validation rules work as expected for edge-case payloads.

### 4. Modules
- Ensure that the module is configured correctly.
- A basic smoke test should be written to verify that the Module compiles and its dependencies are resolved successfully using `Test.createTestingModule`.

## Verification Step

Before finalizing any back-end feature, run the tests to ensure everything passes:
`npm run test` (or the equivalent test command for the workspace).
