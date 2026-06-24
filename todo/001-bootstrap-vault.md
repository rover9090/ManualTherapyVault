# 001 Bootstrap Vault

## Goal

Create the initial Obsidian vault structure for the Manual Therapy knowledge system.

This task only bootstraps folders and minimal placeholder files.

Do **not** implement templates, scripts, MCP configuration, Docusaurus, Notion integration, or daily conversation ingestion in this task.

---

## Context

This repository is an Obsidian vault for a manual therapy knowledge system.

The MVP workflow is:

```text
User explicitly asks AI to write selected content into Obsidian
↓
AI creates or appends Markdown notes through Codex / MCP / filesystem access
↓
Obsidian displays the notes
↓
Git tracks changes
```

This MVP is **command-based writing**, not automatic daily conversation capture.

Therefore, do **not** create any of the following folders in this task:

```text
90_Inbox/
90_Conversation_Exports/
90_Raw_Conversations/
_proposals/
```

Those may be added in a later phase.

---

## Required Folder Structure

Create the following folders at the vault root:

```text
00_MOC/
10_Core_Model/
20_Techniques/
30_Body_Regions/
40_Cases/
50_Hypotheses/
60_Glossary/
80_References/
_agent/
_templates/
_scripts/
```

---

## Required Placeholder Files

Create the following placeholder files if they do not already exist.

### MOC files

```text
00_MOC/徒手治療模型總覽.md
00_MOC/技法總覽.md
00_MOC/身體區域總覽.md
00_MOC/假說總覽.md
```

### Agent files

```text
_agent/instructions.md
_agent/safety-rules.md
_agent/note-type-routing.md
_agent/write-protocol.md
```

### Template placeholder

Create this placeholder file:

```text
_templates/.gitkeep
```

### Script placeholder

Create this placeholder file:

```text
_scripts/.gitkeep
```

---

## File Contents

### `00_MOC/徒手治療模型總覽.md`

```markdown
---
type: moc
status: developing
tags:
  - manual-therapy
  - moc
---

# 徒手治療模型總覽

## 核心模型

- [[七域模型]]
- [[三座標]]
- [[四分類]]
- [[node and band]]

## 技法

- [[CST]]
- [[BLT]]
- [[PRT]]
- [[FT]]
- [[unwinding]]
- [[承重誘導]]
- [[單邊力量路徑誘導]]

## 身體區域

- [[AO-AA]]
- [[T1-T2]]
- [[肩胛]]
- [[肋骨]]
- [[骨盆]]
- [[頭皮筋膜]]
- [[足底]]

## 假說

See: [[假說總覽]]
```

### `00_MOC/技法總覽.md`

```markdown
---
type: moc
status: developing
tags:
  - manual-therapy
  - moc
---

# 技法總覽

## 輕手法

- [[CST]]
- [[BLT]]
- [[PRT]]
- [[FT]]
- [[unwinding]]

## 力量路徑相關

- [[承重誘導]]
- [[單邊力量路徑誘導]]
```

### `00_MOC/身體區域總覽.md`

```markdown
---
type: moc
status: developing
tags:
  - manual-therapy
  - moc
---

# 身體區域總覽

- [[AO-AA]]
- [[T1-T2]]
- [[肩胛]]
- [[肋骨]]
- [[骨盆]]
- [[頭皮筋膜]]
- [[足底]]
```

### `00_MOC/假說總覽.md`

```markdown
---
type: moc
status: developing
tags:
  - manual-therapy
  - moc
---

# 假說總覽

此頁只收錄尚未確認、仍在發展中的模型假說。

新增假說時，可以手動或由 AI 在明確要求下更新此頁。
```

---

## Agent Placeholder Contents

### `_agent/instructions.md`

```markdown
# Agent Instructions

This vault is an Obsidian knowledge base for the user's manual therapy model.

The MVP workflow is explicit command-based writing.

The agent must not automatically save everyday conversations.

Only write into the vault when the user explicitly asks to write selected content into Obsidian.
```

### `_agent/safety-rules.md`

```markdown
# Safety Rules

The agent must not:

- delete files
- overwrite existing notes
- mass rename files
- mass move files
- edit outside this vault
- remove uncertainty markers
- turn hypotheses into confirmed claims without explicit user instruction

The agent may:

- create new Markdown notes
- append new sections to existing notes
- add useful Obsidian backlinks
- report proposed changes before large edits
```

### `_agent/note-type-routing.md`

```markdown
# Note Type Routing

Use these folders:

- `10_Core_Model/` for stable model notes
- `20_Techniques/` for technique notes
- `30_Body_Regions/` for body region notes
- `40_Cases/` for case notes
- `50_Hypotheses/` for developing hypotheses
- `60_Glossary/` for terminology notes
- `80_References/` for external references
- `00_MOC/` for maps of content and indexes

If the note type is unclear, ask the user or propose a type before writing.
```

### `_agent/write-protocol.md`

```markdown
# Write Protocol

When the user asks to write selected content into Obsidian:

1. Determine the note type.
2. Search for existing related notes before creating a new note.
3. If the same concept already exists, append a new section instead of overwriting.
4. If no related note exists, create a new Markdown note in the correct folder.
5. Preserve uncertainty by separating:
   - observation
   - interpretation
   - hypothesis
   - possible mechanism
   - uncertainty
   - risk
6. Add useful backlinks.
7. Report created files and modified files after writing.
```

---

## Out of Scope

Do not do any of the following in this task:

* Do not create note templates beyond `.gitkeep`.
* Do not implement Node scripts.
* Do not create `package.json`.
* Do not configure MCP.
* Do not create Docusaurus files.
* Do not create Notion integration.
* Do not create daily conversation ingestion folders.
* Do not process existing notes.
* Do not delete or rename existing Obsidian files.
* Do not modify `.obsidian/` files.

---

## Acceptance Criteria

This task is complete when:

* [ ] All required folders exist.
* [ ] All required MOC files exist.
* [ ] All required `_agent/` placeholder files exist.
* [ ] `_templates/.gitkeep` exists.
* [ ] `_scripts/.gitkeep` exists.
* [ ] No daily conversation ingestion folders were created.
* [ ] No files inside `.obsidian/` were modified.
* [ ] No existing notes were deleted or renamed.

---

## Expected Final Structure After This Task

```text
ManualTherapyVault/
├── AGENTS.md
├── README.md
├── todo/
│   ├── 000-overview.md
│   └── 001-bootstrap-vault.md
├── .obsidian/
├── 00_MOC/
│   ├── 徒手治療模型總覽.md
│   ├── 技法總覽.md
│   ├── 身體區域總覽.md
│   └── 假說總覽.md
├── 10_Core_Model/
├── 20_Techniques/
├── 30_Body_Regions/
├── 40_Cases/
├── 50_Hypotheses/
├── 60_Glossary/
├── 80_References/
├── _agent/
│   ├── instructions.md
│   ├── safety-rules.md
│   ├── note-type-routing.md
│   └── write-protocol.md
├── _templates/
│   └── .gitkeep
└── _scripts/
    └── .gitkeep
```

---

## Completion Report Required

After completing this task, report:

```text
Completed: todo/001-bootstrap-vault.md

Created folders:
- ...

Created files:
- ...

Modified files:
- ...

Skipped / intentionally not created:
- 90_Inbox/
- 90_Conversation_Exports/
- 90_Raw_Conversations/
- _proposals/

Notes:
- ...
```
