# 002 Add Note Templates

## Goal

Create reusable Markdown templates for the Manual Therapy Obsidian vault.

These templates will be used later by scripts, Codex, MCP agents, or human users to create structured notes.

This task only creates template files under `_templates/`.

Do **not** implement scripts, MCP configuration, Docusaurus, Notion integration, daily conversation ingestion, or real knowledge notes in this task.

---

## Context

The vault has already been bootstrapped by `todo/001-bootstrap-vault.md`.

The current MVP workflow is command-based writing:

```text
User explicitly asks AI to write selected content into Obsidian
↓
AI determines note type
↓
AI uses the corresponding Markdown template
↓
AI creates or appends a note in the correct folder
```

The templates created in this task define the expected structure of each note type.

---

## Required Template Files

Create the following files under `_templates/`:

```text
_templates/core-model.md
_templates/technique.md
_templates/body-region.md
_templates/case.md
_templates/hypothesis.md
_templates/glossary.md
_templates/reference.md
```

If `_templates/.gitkeep` already exists, keep it unless Codex decides it is unnecessary after real files are created. Do not delete it unless explicitly safe and reported.

---

## Template Conventions

All templates must:

* use Markdown
* include YAML frontmatter
* include `type`
* include `status`
* include `created`
* include `updated`
* include `tags`
* include a level-1 heading using `{{title}}`
* preserve uncertainty when relevant
* use Traditional Chinese section headings
* use Obsidian backlinks section: `## 相關筆記`

Use these placeholders:

```text
{{title}}
{{date}}
```

Do not replace these placeholders in template files.

---

## File Contents

### `_templates/core-model.md`

```markdown
---
type: core_model
status: stable
created: {{date}}
updated: {{date}}
tags:
  - manual-therapy
  - core-model
---

# {{title}}

## 定義

## 模型位置

## 使用方式

## 與其他模型的關係

## 臨床應用

## 限制

## 相關筆記

- [[]]
```

---

### `_templates/technique.md`

```markdown
---
type: technique
status: developing
created: {{date}}
updated: {{date}}
related_regions: []
related_domains: []
tags:
  - manual-therapy
  - technique
---

# {{title}}

## 定義

## 操作邏輯

## 適用情境

## 手感指標

## 常見錯誤

## 禁忌與風險

## 與其他技法的差異

## 相關筆記

- [[]]
```

---

### `_templates/body-region.md`

```markdown
---
type: body_region
status: developing
created: {{date}}
updated: {{date}}
region: []
tags:
  - manual-therapy
  - body-region
---

# {{title}}

## 區域定義

## 相關結構

## 常見張力模式

## 觸診線索

## 可能相關技法

## 相關假說

## 相關筆記

- [[]]
```

---

### `_templates/case.md`

```markdown
---
type: case
status: developing
created: {{date}}
updated: {{date}}
person: ""
regions: []
techniques: []
tags:
  - manual-therapy
  - case
---

# {{title}}

## 背景

## 主訴或觀察

## 觸診發現

## 介入方式

## 反應

## 推測

## 後續追蹤

## 相關筆記

- [[]]
```

---

### `_templates/hypothesis.md`

```markdown
---
type: hypothesis
status: developing
created: {{date}}
updated: {{date}}
confidence: low
regions: []
domains: []
techniques: []
tags:
  - manual-therapy
  - hypothesis
---

# {{title}}

## 核心說法

## 觀察依據

## 可能機制

## 尚未確認

## 反例或風險

## 相關技法

## 相關筆記

- [[]]

## 下一步驗證
```

---

### `_templates/glossary.md`

```markdown
---
type: glossary
status: developing
created: {{date}}
updated: {{date}}
tags:
  - manual-therapy
  - glossary
---

# {{title}}

## 定義

## 使用語境

## 與相近概念的差異

## 相關筆記

- [[]]
```

---

### `_templates/reference.md`

```markdown
---
type: reference
status: raw
created: {{date}}
updated: {{date}}
source_type: ""
source_url: ""
tags:
  - manual-therapy
  - reference
---

# {{title}}

## 來源

## 摘要

## 對我的模型可能有用的部分

## 與我的模型的差異

## 待驗證

## 相關筆記

- [[]]
```

---

## Out of Scope

Do not do any of the following in this task:

* Do not implement `_scripts/`.
* Do not create `package.json`.
* Do not configure MCP.
* Do not create `90_Inbox/`.
* Do not create `90_Conversation_Exports/`.
* Do not create `_proposals/`.
* Do not create Docusaurus files.
* Do not create Notion integration.
* Do not create real concept notes in `10_Core_Model/`, `20_Techniques/`, etc.
* Do not modify `.obsidian/` files.
* Do not modify existing MOC files unless required to fix a clear typo introduced by this task.

---

## Acceptance Criteria

This task is complete when:

* [ ] `_templates/core-model.md` exists.
* [ ] `_templates/technique.md` exists.
* [ ] `_templates/body-region.md` exists.
* [ ] `_templates/case.md` exists.
* [ ] `_templates/hypothesis.md` exists.
* [ ] `_templates/glossary.md` exists.
* [ ] `_templates/reference.md` exists.
* [ ] Every template has YAML frontmatter.
* [ ] Every template has `{{title}}`.
* [ ] Every template has `{{date}}` in `created` and `updated`.
* [ ] Every template has a `## 相關筆記` section.
* [ ] No non-template knowledge notes were created.
* [ ] No daily conversation ingestion folders were created.
* [ ] No `.obsidian/` files were modified.

---

## Expected Final Structure After This Task

```text
_templates/
├── .gitkeep
├── core-model.md
├── technique.md
├── body-region.md
├── case.md
├── hypothesis.md
├── glossary.md
└── reference.md
```

---

## Completion Report Required

After completing this task, report:

```text
Completed: todo/002-add-note-templates.md

Created files:
- ...

Modified files:
- ...

Intentionally not created:
- 90_Inbox/
- 90_Conversation_Exports/
- _proposals/
- package.json
- MCP config

Notes:
- ...
```
