---
name: agent-training
description: >-
  Create or update the Antigravity rules, skills and workflows in .agents/. Use when the user asks to
  save a rule, remember a correction, extract a pattern, or create, rename, merge or delete a skill,
  rule or workflow.
---

# Agent Training

All agent configuration for this repo lives in `.agents/`. Do not create `.cursor/` or other tool-specific folders (the legacy `.cursorrules` and `apps/front-end/AGENTS.md` / `CLAUDE.md` already exist; keep them consistent but put new guidance here).

```
.agents/
├── AGENTS.md                    # always-on workspace rules + index of everything below
├── rules/<snake_name>.md        # short constraints, loaded by trigger
├── skills/<snake_name>/SKILL.md # on-demand know-how (plus optional scripts or data files)
└── workflows/<kebab-name>.md    # step-by-step procedures the user runs as /<kebab-name>
```

## 1. Pick the right home
| The user wants... | Put it in |
|---|---|
| A short constraint for the whole repo | `AGENTS.md` (or an `always_on` rule if it is self-contained, like `uk_nz_english`) |
| A constraint for certain files only | a rule with `trigger: glob` |
| Detailed know-how for a type of task | a skill |
| A repeatable procedure they will trigger | a workflow |

Search `.agents/` first and extend the file that already covers the topic. Never create a near-duplicate; if two files overlap, merge them and keep one source of truth.

## 2. Rules (`.agents/rules/<snake_name>.md`)
```markdown
---
trigger: always_on            # or: glob (+ globs:), model_decision (+ description:), manual
---
```
Keep rules short and imperative, with exact paths and class names.

## 3. Skills (`.agents/skills/<snake_name>/SKILL.md`)
```markdown
---
name: kebab-case-name
description: >-
  What the skill covers. Use when <the concrete tasks or files that should trigger it>.
---
```
- The `description` decides when the skill loads, so it must say **when** to use it.
- Body under ~300 lines: headings, bullets, real file paths, real commands, short examples.
- Every path, class, prop, hex value and command must exist in the code today. Check before writing.

## 4. Workflows (`.agents/workflows/<kebab-name>.md`)
```markdown
---
description: One line saying what the workflow does.
---
```
Numbered steps with real, runnable commands. Prefix a safe, read-only or test command with `// turbo` on the line above to let Antigravity auto-run it. Never auto-run commits, pushes or deploys.

## 5. After any change
- Update the index tables in `.agents/AGENTS.md` (no missing entries, no dead names).
- Search `.agents/` for references to anything you renamed or deleted.
- When the user corrects the agent's behaviour, offer to save the correction here.
