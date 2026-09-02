---
name: Cleanup Temporary Scripts
description: Agent instructions for cleaning up temporary scripts after tasks. Use this skill to remind yourself to delete scratchpad scripts created during debugging or mass edits.
---

# Cleanup Temporary Scripts

As an agent, you may frequently create temporary scripts (e.g., Node.js `.js`/`.mjs`/`.ts` scripts, Python scripts, or bash scripts) to automate tasks, debug code, fetch data, or perform mass search-and-replace operations. 

**CRITICAL RULE:** You MUST NEVER leave these temporary script files behind in the user's workspace source code.

## Guidelines:
1. **Use Scratch Directory First:** Whenever possible, save your temporary scripts in the `<appDataDir>\brain\<conversation-id>/scratch/` directory provided in your system prompt. This directory is meant for temporary files.
2. **Clean Up Workspace Scripts:** If a script *must* be created within the workspace (e.g., to accurately resolve module aliases, imports, or local environments), you must explicitly run a command to delete it (e.g., `Remove-Item` on Windows, or `rm` on Linux/macOS) immediately after the script successfully finishes its job.
3. **Audit Before Exiting:** Before ending your turn on any task that involved scripting, double-check the workspace root, `apps/front-end`, `apps/back-end`, and any other directories you touched to ensure no files like `fix-*.mjs`, `temp.js`, `test.ts`, etc., are left over.
