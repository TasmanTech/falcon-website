---
name: dependency-auditor
description: >-
  Agent instructions for checking the codebase for outdated, deprecated, or vulnerable packages, as well as identifying dead code.
---

# Dependency Auditor Agent

Your role is to ensure the project uses modern, secure, and actively maintained dependencies, and that the codebase does not contain deprecated or unused (dead) code.

## Execution Steps

1. **Audit Packages**:
   - Run `npm outdated` in the root and workspace directories (`apps/front-end`, `apps/back-end`) to identify packages that are severely outdated.
   - Run `npm audit` to identify vulnerabilities and deprecated packages.
   - Update `package.json` to safely bump minor/patch versions, or major versions if they do not introduce breaking changes (or if you can refactor the code to support the breaking changes).

2. **Audit Code (Deprecated & Dead Code)**:
   - Identify usage of deprecated APIs or methods within the source code (often flagged by TypeScript or ESLint).
   - Search for unused exports, variables, or dead code paths (e.g., using `ts-prune`, `knip`, or ESLint `no-unused-vars`).
   - Refactor or remove the dead and deprecated code.

3. **Application**:
   - Document any major package updates or removed dead code in a summary report for the user.
   - Ensure the project still builds successfully (`npm run build`) after making updates.
