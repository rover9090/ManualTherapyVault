# 003 Add Package and Vault Validation

## Goal

Add a minimal Node.js package setup and implement a vault validation script.

This task creates:

```text
package.json
_scripts/validate-vault.mjs
```

The validation script will be used by Codex, MCP agents, and the user to verify that the Obsidian vault structure remains valid.

---

## Context

Previous tasks:

```text
001-bootstrap-vault.md
Created the initial vault folder structure and placeholder files.

002-add-note-templates.md
Created reusable Markdown templates under _templates/.
```

This task should verify that the required folders, templates, and agent instruction files exist.

This task does **not** create note helper scripts yet. Search, create-note, and append-note scripts are handled in the next task.

---

## Required Files

Create or update the following files:

```text
package.json
_scripts/validate-vault.mjs
```

Do not create these files in this task:

```text
_scripts/search-notes.mjs
_scripts/create-note.mjs
_scripts/append-note-section.mjs
_agent/mcp-config-example.json
```

Those belong to later tasks.

---

## `package.json`

Create `package.json` at the vault root.

Required content:

```json
{
  "name": "manual-therapy-vault",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "validate": "node _scripts/validate-vault.mjs"
  }
}
```

No external dependencies are required.

Use Node.js built-in modules only.

---

## `_scripts/validate-vault.mjs`

Implement a validation script using only Node.js built-in modules.

Use:

```js
import fs from "node:fs/promises";
import path from "node:path";
```

The script should run from the vault root.

If the user runs it from another directory, print a clear error message.

---

## Validation Requirements

The validation script must check all of the following.

### 1. Required folders exist

Required folders:

```text
00_MOC
10_Core_Model
20_Techniques
30_Body_Regions
40_Cases
50_Hypotheses
60_Glossary
80_References
_agent
_templates
_scripts
todo
```

If any folder is missing, report it.

---

### 2. Required MOC files exist

Required files:

```text
00_MOC/徒手治療模型總覽.md
00_MOC/技法總覽.md
00_MOC/身體區域總覽.md
00_MOC/假說總覽.md
```

---

### 3. Required agent files exist

Required files:

```text
_agent/instructions.md
_agent/safety-rules.md
_agent/note-type-routing.md
_agent/write-protocol.md
```

---

### 4. Required template files exist

Required files:

```text
_templates/core-model.md
_templates/technique.md
_templates/body-region.md
_templates/case.md
_templates/hypothesis.md
_templates/glossary.md
_templates/reference.md
```

---

### 5. Root project files exist

Required files:

```text
AGENTS.md
README.md
package.json
.gitignore
```

---

### 6. Templates contain required placeholders

Every required template file must contain:

```text
{{title}}
{{date}}
```

Every required template file must also contain:

```text
## 相關筆記
```

If a template is missing any of these, report it.

---

### 7. Templates contain YAML frontmatter

Every required template file must start with:

```text
---
```

and contain another:

```text
---
```

after the first line.

This does not need to parse YAML. A simple structural check is enough.

---

### 8. MOC files contain a level-1 heading

Every required MOC file must contain at least one line starting with:

```text
# 
```

---

### 9. Forbidden MVP folders should not exist

For this MVP phase, the following folders should not exist yet:

```text
90_Inbox
90_Conversation_Exports
90_Raw_Conversations
_proposals
```

If they exist, report them as warnings, not fatal errors.

The script should still pass if only warnings exist.

---

## Output Format

On success with no errors:

```text
Vault validation passed.
```

If warnings exist but no errors:

```text
Vault validation passed with warnings.

Warnings:
- ...
```

If errors exist:

```text
Vault validation failed.

Errors:
- ...
```

Then exit with non-zero status code.

---

## Implementation Details

Use helper functions where appropriate:

```js
async function pathExists(relativePath) {}
async function readText(relativePath) {}
function hasYamlFrontmatter(content) {}
function hasHeading(content) {}
```

Suggested structure:

```js
const errors = [];
const warnings = [];

check required folders
check required files
check template contents
check MOC contents
check forbidden folders

if errors.length > 0:
  print failure
  process.exit(1)

if warnings.length > 0:
  print passed with warnings
  process.exit(0)

print passed
process.exit(0)
```

---

## Out of Scope

Do not do any of the following in this task:

* Do not implement search script.
* Do not implement create-note script.
* Do not implement append-note script.
* Do not configure MCP.
* Do not create daily conversation ingestion folders.
* Do not create `_proposals/`.
* Do not create Docusaurus files.
* Do not create Notion integration.
* Do not create real knowledge notes.
* Do not modify `.obsidian/` files.

---

## Acceptance Criteria

This task is complete when:

* [x] `package.json` exists.
* [x] `package.json` has a `validate` script.
* [x] `_scripts/validate-vault.mjs` exists.
* [x] The validation script uses only Node.js built-in modules.
* [x] `npm run validate` succeeds when the vault structure is correct.
* [x] Missing required folders are reported as errors.
* [x] Missing required files are reported as errors.
* [x] Missing template placeholders are reported as errors.
* [x] Missing template frontmatter is reported as an error.
* [x] Forbidden MVP folders are reported as warnings, not fatal errors.
* [x] The script does not modify any files.
* [x] No `.obsidian/` files are modified.

---

## Manual Test Commands

After implementing this task, run:

```bash
npm run validate
```

Expected result:

```text
Vault validation passed.
```

If warnings exist, expected result:

```text
Vault validation passed with warnings.
```

There should be no validation errors.

---

## Completion Report Required

After completing this task, report:

```text
Completed: todo/003-add-package-and-validation.md

Created files:
- package.json
- _scripts/validate-vault.mjs

Modified files:
- ...

Validation:
- npm run validate: passed / failed

Warnings:
- ...

Notes:
- ...
```
