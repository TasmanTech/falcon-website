---
name: frontend-testing
description: >-
  Use this skill when writing, reviewing, or generating tests for the Next.js front-end.
  It provides guidelines on how to structure testing specs for React components, Server Actions, and hooks.
---

# Next.js Front-end Testing Guidelines

This skill outlines the strict requirements and procedures for testing the Next.js frontend.

## General Requirements

1. **Test Every Layer**: Every Component, Page, Hook, and Server Action must have an accompanying `.test.tsx` or `.test.ts` file.
2. **Frameworks**: Use `Vitest` or `Jest` alongside `@testing-library/react` and `@testing-library/jest-dom` for DOM testing.
3. **Mocks and Spies**: Always mock external dependencies like `next/navigation`, `next/headers`, third-party APIs, and any backend fetches.
4. **Coverage**: Aim for high test coverage, focusing on user interactions, conditional rendering, and edge cases.

## Component-Specific Guidelines

### 1. Client Components (`use client`)
- Test user interactions (clicks, input changes) using `userEvent` from `@testing-library/user-event`.
- Verify state changes and side effects (e.g., ensuring a loading spinner appears, or an error message displays).
- Mock Next.js routing hooks like `useRouter`, `usePathname`, and `useSearchParams` from `next/navigation`.

### 2. Server Components
- Server components should be tested for their static or dynamic rendering output.
- Since Server Components may be asynchronous, ensure the test environment awaits their resolution before making assertions.
- Mock server-only modules such as `cookies()` or `headers()` from `next/headers`.

### 3. Server Actions
- Isolate the Server Action logic and test it as a standard async function.
- Verify that it properly validates input, interacts with the backend (via fetch), and returns the expected result or throws the expected error.

### 4. Custom Hooks
- Use the `renderHook` utility from `@testing-library/react`.
- Test the initial state, state transitions, and ensure side-effects occur appropriately when dependencies change.

## Verification Step

Before finalizing any front-end feature, run the tests to ensure everything passes:
`npm run test` (or the equivalent test command for the workspace).
