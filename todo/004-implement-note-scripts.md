# 004 Implement Note Helper Scripts

## Goal

Implement local helper scripts for searching, creating, and safely appending Obsidian Markdown notes.

This task creates:

```text
_scripts/search-notes.mjs
_scripts/create-note.mjs
_scripts/append-note-section.mjs
```

It also updates:

```text
package.json
```

These scripts will support future Codex / MCP / filesystem-based workflows.

---

## Context

Previous tasks:

```text
001-bootstrap-vault.md
Created the vault folder structure.

002-add-note-templates.md
Created reusable note templates.

003-add-package-and-validation.md
Created package.json and _scripts/validate-vault.mjs.
```

This task adds basic note operations:

```text
search notes
create note from template
append section to existing note
```

These scripts must be conservative and safe.

They must not delete files, rename files, move files, or overwrite existing notes.

---

## Required Files

Create:

```text
_scripts/search-notes.mjs
_scripts/create-note.mjs
_scripts/append-note-section.mjs
```

Update:

```text
package.json
```

---

## Package Scripts

Update `package.json` scripts to include:

```json
{
  "scripts": {
    "validate": "node _scripts/validate-vault.mjs",
    "search": "node _scripts/search-notes.mjs",
    "create-note": "node _scripts/create-note.mjs",
    "append-note": "node _scripts/append-note-section.mjs"
  }
}
```

Do not remove the existing `validate` script.

No external dependencies are required.

Use Node.js built-in modules only.

---

## Shared Requirements

All scripts must:

* run from the vault root
* use only Node.js built-in modules
* avoid modifying `.obsidian/`
* avoid modifying `.git/`
* avoid modifying `node_modules/`
* print clear success or failure messages
* exit with non-zero status code on fatal errors
* never delete files
* never overwrite existing notes unless explicitly designed to append

Use:

```js
import fs from "node:fs/promises";
import path from "node:path";
```

---

# Script 1: `_scripts/search-notes.mjs`

## Goal

Search Markdown notes in the vault by keyword.

## Usage

```bash
node _scripts/search-notes.mjs "T1-T2"
```

or:

```bash
npm run search -- "T1-T2"
```

## Behavior

The script should:

1. Accept a single keyword argument.
2. Search all `.md` files under the vault.
3. Exclude these directories:

   * `.git/`
   * `.obsidian/`
   * `node_modules/`
4. Include files under:

   * `00_MOC/`
   * `10_Core_Model/`
   * `20_Techniques/`
   * `30_Body_Regions/`
   * `40_Cases/`
   * `50_Hypotheses/`
   * `60_Glossary/`
   * `80_References/`
   * `_agent/`
   * `_templates/`
   * `todo/`
5. Match case-insensitively for English text.
6. Print matching file paths.
7. Optionally print matching line numbers if easy to implement.
8. If no match is found, print a clear message.

## Example Output

```text
Found 2 matching files:

30_Body_Regions/T1-T2.md
50_Hypotheses/胸廓左旋與左肩胛內上角刺感.md
```

If no matches:

```text
No matching notes found for: T1-T2
```

## Errors

If no keyword is provided:

```text
Usage: node _scripts/search-notes.mjs "<keyword>"
```

Exit with non-zero status code.

---

# Script 2: `_scripts/create-note.mjs`

## Goal

Create a new Markdown note from a template.

## Usage

```bash
node _scripts/create-note.mjs --type hypothesis --title "頭皮三層觸診模型"
```

or:

```bash
npm run create-note -- --type hypothesis --title "頭皮三層觸診模型"
```

## Supported Types

The script must support these note types:

```text
core_model
technique
body_region
case
hypothesis
glossary
reference
```

Map them to folders and templates:

```text
core_model  → 10_Core_Model/     → _templates/core-model.md
technique   → 20_Techniques/     → _templates/technique.md
body_region → 30_Body_Regions/   → _templates/body-region.md
case        → 40_Cases/          → _templates/case.md
hypothesis  → 50_Hypotheses/     → _templates/hypothesis.md
glossary    → 60_Glossary/       → _templates/glossary.md
reference   → 80_References/     → _templates/reference.md
```

## Behavior

The script should:

1. Parse `--type`.
2. Parse `--title`.
3. Validate that `--type` is supported.
4. Validate that `--title` is non-empty.
5. Load the correct template.
6. Replace `{{title}}` with the provided title.
7. Replace `{{date}}` with current local date in `YYYY-MM-DD`.
8. Create a safe filename from the title.
9. Create the note in the correct folder.
10. Refuse to overwrite if a file already exists.
11. Print the created file path.

## Filename Rules

The filename should be based on the title.

Keep Chinese characters.

Remove or replace unsafe filename characters:

```text
< > : " / \ | ? *
```

Replace unsafe characters with `-`.

Trim leading and trailing whitespace.

Collapse repeated spaces.

Append `.md`.

Example:

```text
頭皮三層觸診模型 → 頭皮三層觸診模型.md
T1-T2 / shoulder model → T1-T2 - shoulder model.md
```

## Example Output

```text
Created note: 50_Hypotheses/頭皮三層觸診模型.md
```

## Errors

If required args are missing:

```text
Usage: node _scripts/create-note.mjs --type hypothesis --title "頭皮三層觸診模型"
```

If unsupported type:

```text
Unsupported note type: xyz
Supported types: core_model, technique, body_region, case, hypothesis, glossary, reference
```

If file already exists:

```text
Note already exists: 50_Hypotheses/頭皮三層觸診模型.md
Refusing to overwrite.
```

Exit with non-zero status code for errors.

---

# Script 3: `_scripts/append-note-section.mjs`

## Goal

Safely append a new Markdown section to an existing note.

## Usage

```bash
node _scripts/append-note-section.mjs --file "50_Hypotheses/頭皮三層觸診模型.md" --heading "新增觀察" --content "測試內容"
```

or:

```bash
npm run append-note -- --file "50_Hypotheses/頭皮三層觸診模型.md" --heading "新增觀察" --content "測試內容"
```

## Behavior

The script should:

1. Parse `--file`.
2. Parse `--heading`.
3. Parse `--content`.
4. Validate that the target file exists.
5. Validate that the target file is inside the vault.
6. Validate that the target file is a `.md` file.
7. Reject paths inside:

   * `.git/`
   * `.obsidian/`
   * `node_modules/`
8. Append a new section to the bottom of the file.
9. Never overwrite existing content.
10. Print the modified file path.

## Append Format

Append content like:

```markdown
## {{heading}}

{{content}}
```

If the user passes `--date-heading`, optionally support:

```markdown
## 2026-06-24 {{heading}}

{{content}}
```

Optional `--date-heading` is nice to have but not required.

## Example Output

```text
Appended section to: 50_Hypotheses/頭皮三層觸診模型.md
```

## Errors

If file does not exist:

```text
Target file does not exist: ...
```

If target is outside vault:

```text
Refusing to modify file outside the vault.
```

If target is forbidden:

```text
Refusing to modify forbidden path: .obsidian/...
```

Exit with non-zero status code for errors.

---

## Out of Scope

Do not do any of the following in this task:

* Do not configure MCP.
* Do not create MCP config examples.
* Do not create Docusaurus files.
* Do not create Notion integration.
* Do not create daily conversation ingestion folders.
* Do not create `_proposals/`.
* Do not modify `.obsidian/` files.
* Do not create real manual therapy notes except temporary test files if needed.
* Do not keep temporary test notes unless explicitly required.
* Do not delete or rename existing notes.

---

## Acceptance Criteria

This task is complete when:

* [x] `_scripts/search-notes.mjs` exists.
* [x] `_scripts/create-note.mjs` exists.
* [x] `_scripts/append-note-section.mjs` exists.
* [x] `package.json` includes `search`, `create-note`, and `append-note` scripts.
* [x] `npm run validate` still passes.
* [x] Search script can find existing Markdown content.
* [x] Create-note script can create a note from a template.
* [x] Create-note script refuses to overwrite existing files.
* [x] Append-note script can append a section to an existing note.
* [x] Append-note script refuses to modify `.obsidian/`.
* [x] Append-note script refuses to modify files outside the vault.
* [x] No `.obsidian/` files are modified.

---

## Manual Test Commands

After implementing this task, run:

```bash
npm run validate
```

Expected:

```text
Vault validation passed.
```

Search test:

```bash
npm run search -- "徒手治療"
```

Expected:

```text
At least one matching Markdown file is listed.
```

Create-note test:

```bash
npm run create-note -- --type hypothesis --title "測試假說"
```

Expected:

```text
Created note: 50_Hypotheses/測試假說.md
```

Duplicate create-note test:

```bash
npm run create-note -- --type hypothesis --title "測試假說"
```

Expected:

```text
Note already exists...
Refusing to overwrite.
```

Append test:

```bash
npm run append-note -- --file "50_Hypotheses/測試假說.md" --heading "測試追加" --content "這是一段測試內容。"
```

Expected:

```text
Appended section to: 50_Hypotheses/測試假說.md
```

Final validation:

```bash
npm run validate
```

Expected:

```text
Vault validation passed.
```

Codex may leave `50_Hypotheses/測試假說.md` as a test artifact only if it clearly reports it. Prefer removing the test artifact before final report unless removal violates AGENTS.md. If deletion is disallowed, ask the user before removing.

---

## Completion Report Required

After completing this task, report:

```text
Completed: todo/004-implement-note-scripts.md

Created files:
- _scripts/search-notes.mjs
- _scripts/create-note.mjs
- _scripts/append-note-section.mjs

Modified files:
- package.json

Validation:
- npm run validate: passed / failed

Manual tests:
- search: passed / failed
- create-note: passed / failed
- duplicate create-note refusal: passed / failed
- append-note: passed / failed

Test artifacts:
- ...

Notes:
- ...
```
