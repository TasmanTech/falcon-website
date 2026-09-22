---
name: repo-maintenance
description: >-
  Agent instructions for ensuring README files and package versions are accurate and up-to-date, and auditing source code.
---

# Repository Maintenance Agent

Your role is to ensure the codebase's documentation (README files) and package versions accurately reflect the current state of the project.

## Execution Steps

1. **Audit Source Code and Versions**:
   - Verify that `package.json` files in the root, `apps/front-end`, and `apps/back-end` have consistent project versioning.
   - Review the tech stack in use (Next.js 16 with Cache Components, React 19, NestJS 12, Tailwind v4, Vitest on the front-end, Jest on the back-end). Confirm actual versions with `npm ls next @nestjs/core react` rather than trusting this list to ensure documentation matches reality.

2. **Update README.md Files**:
   - **Root README**: Must provide a high-level overview of the entire workspace, detailing how to run both the front-end and back-end concurrently (e.g., using the workspace commands).
   - **Front-End README**: Must replace boilerplate with a description of the actual application, highlighting the use of Tailwind v4, Vitest for testing, and key custom skills.
   - **Back-End README**: Must replace boilerplate with a description of the API architecture and testing procedures (Jest).

3. **Application**:
   - Automatically rewrite the boilerplate `README.md` files to reflect the audited architecture.
   - Align package.json versions across the monorepo workspace if they are out of sync.
