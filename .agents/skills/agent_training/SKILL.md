---
name: Agent Skill Training
description: Guidelines for dynamically creating and updating skills based on user feedback and new project patterns.
---

# Agent Skill Training Guidelines

When the user requests to create a new skill, extract a new pattern, or save a rule for future reference, follow these steps to "train" a new skill on the go:

## 1. Skill Directory Structure
- Create a new directory within `.agents/skills/` (relative to the workspace root) named logically for the skill (e.g., `api_design/`).
- Inside that directory, create a `SKILL.md` file.

## 2. SKILL.md Format
- The file MUST begin with YAML frontmatter containing `name` and `description`.
- The `description` should be extremely clear, as the system uses it to automatically trigger and load the skill when relevant.
- Follow the frontmatter with a detailed Markdown body (keep under 500 lines). 
- Use clear headings, bullet points, and provide code examples.

## Example Format
```markdown
---
name: [Human Readable Skill Name]
description: [Brief explanation of what this skill does and when to use it]
---

# [Skill Title]
[Detailed instructions, context, constraints, and code snippets...]
```

## 3. Rules vs. Skills
- **Global Rules**: If the instruction is a universal constraint (e.g., "Never use `any` in TypeScript"), append it to the workspace `.agents/AGENTS.md` file instead of creating a standalone skill.
- **Domain-Specific Skills**: If the instruction is a focused pattern (e.g., "How to design a dashboard widget" or "SEO guidelines"), create a new directory and `SKILL.md`.

## 4. On-the-Fly Updates
- When the user corrects an agent's behavior, proactively ask if they would like to save the correction to an existing skill or create a new one.
- Use file editing tools to refine existing `SKILL.md` files or `AGENTS.md` based on new insights during a conversation.
