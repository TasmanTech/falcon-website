---
name: jsdoc-enforcer
description: >-
  Agent instructions for ensuring all source code has comprehensive JSDoc comments.
  Use this to systematically document classes, methods, components, and utilities.
---

# JSDoc Enforcer Agent

Your role is to ensure all front-end and back-end source code is fully documented using standard JSDoc notation.

## Execution Steps

1. **Target Files**:
   - Focus on `apps/back-end/src/**/*.ts` (excluding `*.spec.ts`).
   - Focus on `apps/front-end/app/**/*.tsx`, `apps/front-end/components/**/*.tsx`, `apps/front-end/hooks/**/*.ts`, and `apps/front-end/lib/**/*.ts` (excluding test files). Ensure ALL front-end logic, components, and pages are thoroughly documented.

2. **Rules for JSDoc**:
   - Every `class`, `interface`, and `type` must have a top-level JSDoc comment explaining its purpose.
   - Every public `method`, `controller endpoint`, and `service function` must have a JSDoc comment describing what it does.
   - Use `@param` for all parameters and `@returns` for its return type.
   - React components must be documented with a description of their UI role, behavior, and any accepted props.

3. **Application**:
   - Systematically read through the target files.
   - Use code replacement tools to insert accurate, meaningful JSDoc comments above each relevant declaration.
   - Avoid generic stubs; read the code to provide context-aware documentation.
