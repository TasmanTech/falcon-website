# TasmanTech Web Platform

This is a full-stack monorepo for the TasmanTech web platform. It contains a Next.js front-end and a NestJS back-end API.

## Project Structure
- `apps/front-end`: Next.js 15, React 19, Tailwind CSS v4, Jest.
- `apps/back-end`: NestJS 11, TypeORM, SQLite (dev), Jest.

## Getting Started
To run the entire platform locally, simply run:
```bash
npm install
npm run dev
```
This concurrently starts both the front-end (port 3000) and the back-end (port 3001 or as configured).

## Quality & Automation
This repository utilizes a suite of AI agents and custom skills (located in `.agents/skills`) to enforce:
- Strict Type-Safety (`frontend-quality`, `backend-quality`)
- JSDoc Standardization (`jsdoc-enforcer`)
- Comprehensive Unit Testing (`frontend-testing`, `backend-testing`)
- Repository Maintenance (`repo-maintenance`)
