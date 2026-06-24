# 007 Strengthen Writing Protocol

## Goal

Strengthen the agent instruction files under `_agent/` so Codex / MCP agents can safely create and update Obsidian notes.

This task upgrades the placeholder files created in `001-bootstrap-vault.md` into practical operating rules.

This task updates:

```text
_agent/instructions.md
_agent/safety-rules.md
_agent/note-type-routing.md
_agent/write-protocol.md
```

This task may optionally update:

```text
AGENTS.md
README.md
```

Only update `AGENTS.md` or `README.md` if the change is minimal and clearly supports the writing protocol.

---

## Context

Previous tasks:

```text
001-bootstrap-vault.md
Created the vault folder structure and placeholder agent files.

002-add-note-templates.md
Created reusable note templates.

003-add-package-and-validation.md
Created validation script.

004-implement-note-scripts.md
Created search, create-note, and append-note helper scripts.

005-add-mcp-config-and-agent-usage.md
Added MCP config example and usage guide.

006-first-real-write-test.md
Created the first real hypothesis note.
```

The current goal is to make the agent behavior precise enough for future command-based writing:

```text
User explicitly asks to write selected content into Obsidian
↓
Agent classifies note type
↓
Agent searches existing notes
↓
Agent chooses create / append / ask
↓
Agent preserves uncertainty
↓
Agent writes safely
↓
Agent reports changes
```

This task does **not** implement new scripts.

---

## Required Files to Update

Update these files:

```text
_agent/instructions.md
_agent/safety-rules.md
_agent/note-type-routing.md
_agent/write-protocol.md
```

Do not remove useful existing content unless replacing it with a more complete version.

---

# File 1: `_agent/instructions.md`

Replace or upgrade the file with the following structure:

```markdown
# Agent Instructions

## Role

You are the Obsidian knowledge-base assistant for the user's manual therapy model.

The vault is a Markdown-based Obsidian knowledge system.

Your job is to help transform selected conversation content into structured notes when the user explicitly asks you to do so.

## Core Workflow

The MVP workflow is explicit command-based writing.

Do not automatically save ordinary conversation.

Only write into the vault when the user explicitly asks with phrases such as:

- 整理進 Obsidian
- 寫入 vault
- 建立筆記
- 更新筆記
- save this to Obsidian
- write this into the vault
- create a note
- update the note

If the user is only discussing an idea, do not modify files.

## Knowledge Domain

The vault stores the user's manual therapy model, including:

- 七域
- 三座標
- 四分類
- node / band
- 張力路徑
- 承重誘導
- 力量路徑誘導
- 淺層傾聽
- CST
- BLT
- PRT
- FT
- unwinding
- 個案觀察
- 身體區域模型
- 技法模型
- 發展中假說

## Language

Use Traditional Chinese by default.

Keep English technical terms when the user uses them, such as:

- CST
- BLT
- PRT
- FT
- node
- band
- unwinding
- MCP
- Obsidian
- Markdown

## Epistemic Discipline

Always preserve the distinction between:

- 觀察
- 詮釋
- 假說
- 可能機制
- 尚未確認
- 反例或風險
- 外部資料

Do not turn subjective palpation or body-sensation observations into confirmed anatomical facts.

Do not diagnose.

Do not claim clinical certainty.

Do not remove uncertainty markers.

## File Operation Summary

Allowed by default when the user explicitly asks to write:

- create new Markdown notes
- append sections to existing Markdown notes
- add useful backlinks
- create YAML frontmatter for new notes
- report changes

Not allowed by default:

- delete files
- overwrite whole notes
- mass rename files
- mass move files
- edit `.obsidian/`
- edit outside the vault
- change `status: developing` or `status: hypothesis` to `confirmed`
- update MOC files unless explicitly requested
```

---

# File 2: `_agent/safety-rules.md`

Replace or upgrade the file with the following structure:

````markdown
# Safety Rules

## File Safety

The agent must never:

- delete files
- mass rename files
- mass move files
- overwrite whole notes
- rewrite large existing sections without confirmation
- edit `.obsidian/`
- edit `.git/`
- edit `node_modules/`
- edit outside this vault
- modify Git history
- run destructive commands

The agent may:

- create new Markdown notes
- append new sections to existing notes
- add useful backlinks
- create YAML frontmatter for newly created notes
- update helper documentation
- update MOC files only when explicitly requested

## Write Permission Rule

The agent must not write files unless the user explicitly requests writing into Obsidian or the vault.

Valid triggers include:

- 整理進 Obsidian
- 寫入 vault
- 建立筆記
- 更新筆記
- save this to Obsidian
- write this into the vault
- create a note
- update the note

If the user asks a conceptual question, answer the question but do not modify files.

## Hypothesis Safety

The agent must not:

- change `status: developing` to `status: confirmed`
- change `type: hypothesis` to `type: core_model`
- remove uncertainty statements
- write personal observations as universal claims
- diagnose
- imply medical certainty from subjective observations

Unless the user explicitly asks and provides justification.

## Manual Therapy Safety

When writing manual therapy notes:

- preserve subjective wording when the source is subjective
- separate observation from interpretation
- separate possible mechanism from confirmed mechanism
- include uncertainty where appropriate
- include risk or contraindication where appropriate
- avoid over-medicalizing the user's model

## MCP / Filesystem Safety

If using MCP filesystem tools:

- filesystem access must be scoped only to this vault
- do not request access to the whole home directory
- do not request access to Desktop
- do not request access to Documents
- do not request access to C drive
- do not request access to unrelated repositories

If MCP tools are unavailable, do not pretend that files were written.

Instead, output the intended patch or Markdown content and clearly state that no file was actually modified.

## Git Safety

Do not commit unless the user explicitly requests it.

After file changes, report:

- created files
- modified files
- validation result, if run
- recommended next Git command

Preferred user-side review:

```bash
git diff
git status
````

````

---

# File 3: `_agent/note-type-routing.md`

Replace or upgrade the file with the following structure:

```markdown
# Note Type Routing

Use this guide when deciding where a note should be created or updated.

If the user specifies a type or folder, follow the user's instruction unless it violates safety rules.

If the type is unclear, ask the user or propose the most likely type before writing.

---

## core_model

Folder:

```text
10_Core_Model/
````

Template:

```text
_templates/core-model.md
```

Use for relatively stable concepts in the user's manual therapy framework.

Examples:

* 七域模型
* 三座標
* 四分類
* node / band
* 張力 / 結構 / 剪切 / 神經分類
* 已經多次確認且語言穩定的核心方法論

Do not route developing hypotheses here unless the user explicitly asks.

---

## technique

Folder:

```text
20_Techniques/
```

Template:

```text
_templates/technique.md
```

Use for methods, interventions, handling logic, or therapeutic operations.

Examples:

* CST
* BLT
* PRT
* FT
* unwinding
* 承重誘導
* 單邊力量路徑誘導
* 淺層傾聽
* 動力串動

---

## body_region

Folder:

```text
30_Body_Regions/
```

Template:

```text
_templates/body-region.md
```

Use for anatomy-centered or region-centered notes.

Examples:

* AO-AA
* T1-T2
* 肩胛
* 肋骨
* 骨盆
* 頭皮筋膜
* 足底
* 枕下肌
* 舌骨
* 恥骨聯合

---

## case

Folder:

```text
40_Cases/
```

Template:

```text
_templates/case.md
```

Use for specific people, sessions, treatment responses, or case observations.

Examples:

* 某次肩胛處理紀錄
* 個案主訴
* 觸診發現
* 介入反應
* 後續追蹤

Case notes should avoid identifying unnecessary personal information.

---

## hypothesis

Folder:

```text
50_Hypotheses/
```

Template:

```text
_templates/hypothesis.md
```

Use for developing ideas, unconfirmed mechanisms, model drafts, or speculative connections.

Examples:

* 頭皮三層觸診模型
* 胸廓左旋與左肩胛內上角刺感
* 足底筋膜炎可能源於小腿彈性不足
* 頸椎角度與頭皮張力層連動

If the content contains uncertainty, route it here by default.

---

## glossary

Folder:

```text
60_Glossary/
```

Template:

```text
_templates/glossary.md
```

Use for terminology definitions.

Examples:

* 張力路徑
* node
* band
* 淺層傾聽
* 承重誘導
* 架構
* 剪切

---

## reference

Folder:

```text
80_References/
```

Template:

```text
_templates/reference.md
```

Use for external materials.

Examples:

* books
* courses
* papers
* YouTube notes
* NotebookLM outputs
* external anatomy references
* professional guidelines

External claims must remain distinguishable from the user's own model.

---

## MOC

Folder:

```text
00_MOC/
```

Use for maps of content and indexes.

Do not update MOC files automatically.

Only update MOC files when the user explicitly requests it.

Before adding a link to a MOC:

1. read the MOC
2. check if the link already exists
3. append only if missing
4. avoid reorganizing the whole MOC unless requested

---

## If Ambiguous

If the content could fit multiple types:

* hypothesis + body_region → choose hypothesis if the mechanism is still uncertain
* technique + hypothesis → choose hypothesis if the technique logic is not yet stable
* core_model + hypothesis → choose hypothesis unless the user says it is stable
* case + hypothesis → create a case note if it is tied to a specific person/session; otherwise create a hypothesis note

If still uncertain, ask the user before writing.

````

---

# File 4: `_agent/write-protocol.md`

Replace or upgrade the file with the following structure:

```markdown
# Write Protocol

This protocol defines how an agent should write selected content into the Obsidian vault.

The default workflow is command-based writing.

The agent must not auto-save everyday conversation.

---

## Step 1: Confirm Write Intent

Only proceed if the user explicitly asks to write into Obsidian or the vault.

Valid examples:

```text
把剛剛討論整理進 Obsidian
建立一篇 hypothesis note
把這段寫入 vault
更新 [[頭皮三層觸診模型]]
````

Invalid examples:

```text
你覺得這個模型合理嗎？
這代表什麼？
幫我分析一下
```

For invalid examples, answer normally without modifying files.

---

## Step 2: Identify Note Type

Use `_agent/note-type-routing.md`.

If the user specifies type or folder, follow the user.

If the type is ambiguous, ask before writing.

Supported types:

* core_model
* technique
* body_region
* case
* hypothesis
* glossary
* reference

---

## Step 3: Search Before Writing

Before creating a new note, search existing notes by:

* exact title
* major keywords
* related body region
* related technique
* related hypothesis

Use helper scripts when available:

```bash
npm run search -- "<keyword>"
```

Search at least:

* proposed title
* 1 to 3 core keywords

---

## Step 4: Decide Create / Append / Ask

Create a new note when:

* no existing note matches the same main concept
* the user explicitly asks to create a new note
* the content is a distinct concept

Append to an existing note when:

* the same concept already exists
* the user asks to update an existing note
* the new content is clearly a supplement to an existing note

Ask the user when:

* title conflict exists
* multiple similar notes exist
* unsure whether content is a new concept or an update
* writing would require moving, renaming, or restructuring notes

Never overwrite an entire existing note.

---

## Step 5: Use Templates

When creating a new note, use the correct template from `_templates/`.

Use helper script when possible:

```bash
npm run create-note -- --type hypothesis --title "頭皮三層觸診模型"
```

Then fill or append content into the generated structure.

Do not remove required frontmatter fields unless instructed.

---

## Step 6: Preserve Epistemic Status

When writing content, separate:

* observation
* interpretation
* hypothesis
* possible mechanism
* uncertainty
* risk
* next verification

Use cautious wording for unconfirmed ideas:

* 可能
* 目前推測
* 尚未確認
* 需要進一步驗證
* 不能直接判定

Avoid converting subjective reports into objective claims.

---

## Step 7: Use Backlinks Carefully

Add Obsidian backlinks only for meaningful concepts.

Good examples:

```markdown
[[T1-T2]]
[[胸廓左旋位]]
[[承重誘導]]
[[頭皮筋膜]]
```

Avoid excessive backlinks.

Do not link every common word.

---

## Step 8: Append Safely

When appending to an existing note:

* read the existing note first
* append a new section at the bottom
* preserve previous wording
* do not rewrite the whole note
* include a dated heading when useful

Preferred format:

```markdown
## YYYY-MM-DD 補充觀察

...
```

Use helper script when possible:

```bash
npm run append-note -- --file "50_Hypotheses/頭皮三層觸診模型.md" --heading "YYYY-MM-DD 補充觀察" --content "..."
```

---

## Step 9: MOC Updates

Do not update MOC files automatically.

Only update MOC files when explicitly requested.

When updating a MOC:

1. read the file
2. check whether the link already exists
3. append the link only if missing
4. avoid large reorganizations
5. report the change

---

## Step 10: Validate

After structural changes, run:

```bash
npm run validate
```

After ordinary note writing, validation is recommended but not always required.

If validation fails, report the failure clearly.

Do not hide validation errors.

---

## Step 11: Report Changes

After writing, report:

```text
Created files:
- ...

Modified files:
- ...

Validation:
- passed / failed / not run

Notes:
- ...
```

Also recommend that the user review:

```bash
git diff
git status
```

Do not commit unless explicitly requested.

---

## Step 12: If Tools Are Unavailable

If filesystem / MCP / Codex tools are unavailable:

* do not pretend files were written
* provide the intended Markdown or patch
* clearly say no file was modified

````

---

## Optional AGENTS.md Update

If `AGENTS.md` does not already mention the strengthened writing protocol, add a short section:

```markdown
## Writing Protocol

For Obsidian note writing, follow:

- `_agent/instructions.md`
- `_agent/safety-rules.md`
- `_agent/note-type-routing.md`
- `_agent/write-protocol.md`

Do not write files unless the user explicitly asks to write into Obsidian or the vault.
````

Do not rewrite the whole `AGENTS.md` unless necessary.

---

## Optional README Update

If useful, add a short section:

```markdown
## Agent Protocol

See `_agent/write-protocol.md` for command-based Obsidian note writing rules.
```

Do not rewrite the whole `README.md`.

---

## Out of Scope

Do not do any of the following in this task:

* Do not implement new scripts.
* Do not configure MCP.
* Do not start an MCP server.
* Do not create daily conversation ingestion folders.
* Do not create `_proposals/`.
* Do not create Docusaurus files.
* Do not create Notion integration.
* Do not create new knowledge notes.
* Do not modify `.obsidian/` files.
* Do not update MOC files.
* Do not change hypothesis notes to confirmed.
* Do not delete, rename, or move existing notes.

---

## Acceptance Criteria

This task is complete when:

* [ ] `_agent/instructions.md` is expanded into a complete role and workflow guide.
* [ ] `_agent/safety-rules.md` clearly defines allowed and forbidden file operations.
* [ ] `_agent/note-type-routing.md` clearly maps note types to folders and templates.
* [ ] `_agent/write-protocol.md` defines create / append / ask behavior.
* [ ] The protocol explicitly says not to auto-save everyday conversation.
* [ ] The protocol explicitly says to write only on user request.
* [ ] The protocol preserves observation / hypothesis / uncertainty distinctions.
* [ ] The protocol prevents overwriting whole notes.
* [ ] The protocol prevents automatic MOC updates.
* [ ] Optional AGENTS.md / README updates are minimal if made.
* [ ] `npm run validate` still passes.
* [ ] No `.obsidian/` files are modified.

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

Check changed files:

```bash
git status --short
```

Expected modified files should be limited to:

```text
_agent/instructions.md
_agent/safety-rules.md
_agent/note-type-routing.md
_agent/write-protocol.md
AGENTS.md, optional
README.md, optional
```

---

## Completion Report Required

After completing this task, report:

```text
Completed: todo/007-strengthen-writing-protocol.md

Modified files:
- _agent/instructions.md
- _agent/safety-rules.md
- _agent/note-type-routing.md
- _agent/write-protocol.md
- AGENTS.md, if changed
- README.md, if changed

Validation:
- npm run validate: passed / failed

Notes:
- ...
```
