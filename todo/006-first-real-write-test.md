# 006 First Real Write Test

## Goal

Run the first real end-to-end write test for the Manual Therapy Obsidian vault.

This task verifies that the vault can create a real manual therapy hypothesis note using the existing template and helper scripts.

This task should create one real test note:

```text
50_Hypotheses/頭皮三層觸診模型.md
```

This note is allowed to remain in the vault because it represents an actual useful hypothesis from the user's manual therapy model, not a disposable test artifact.

---

## Context

Previous tasks:

```text
001-bootstrap-vault.md
Created the vault folder structure.

002-add-note-templates.md
Created reusable note templates.

003-add-package-and-validation.md
Created package.json and validation script.

004-implement-note-scripts.md
Created helper scripts for search, create-note, and append-note.

005-add-mcp-config-and-agent-usage.md
Added MCP configuration example and usage guide.
```

This task is the first real workflow test:

```text
create note from template
↓
append structured content
↓
verify note exists
↓
verify validation passes
↓
review with Git diff
```

---

## Required Output Note

Create this note:

```text
50_Hypotheses/頭皮三層觸診模型.md
```

Use the `hypothesis` template.

The note should preserve uncertainty and avoid turning subjective palpation observation into confirmed anatomy.

---

## Test Source Content

Use the following source content:

```text
頭皮觸診可能分成三層：

第一層是可被外力滑移的淺層柔軟層。

第二層是不能直接被外力滑移，但會隨頸椎角度改變位置的深層硬層。

第三層才是真正的顱骨。

目前這只是觸診觀察，尚未確認第二層的組織學對應。

相關觀察包括：
仰頭到底時，感覺頭皮會向後、向枕下移動；
側屈到底時，頭皮也會往相對方向移動。
```

---

## Required Note Structure

The final note should contain these sections.

If the `hypothesis` template already includes these headings, fill or append content under them.

If a heading does not exist, append it as a new section.

### Required YAML

The note should include YAML frontmatter like:

```yaml
---
type: hypothesis
status: developing
created: YYYY-MM-DD
updated: YYYY-MM-DD
confidence: low
regions:
  - scalp
  - cervical
domains:
  - tension
  - fascial-glide
techniques:
  - listening
tags:
  - manual-therapy
  - hypothesis
---
```

The actual date should use the current local date in `YYYY-MM-DD`.

Do not mark this note as confirmed.

### Required title

```markdown
# 頭皮三層觸診模型
```

### Required content

The note must include:

```markdown
## 核心說法
```

Content should explain:

```text
頭皮觸診可能存在三個可被手感區分的層次：
1. 可被外力滑移的淺層柔軟層
2. 不易被外力直接滑移，但會隨頸椎角度改變位置的深層硬層
3. 真正的顱骨層
```

```markdown
## 觀察依據
```

Content should include:

```text
仰頭到底時，使用者感覺頭皮會向後、向枕下移動。
側屈到底時，頭皮也會往相對方向移動。
這些觀察目前屬於主觀觸診與本體感覺紀錄。
```

```markdown
## 可能機制
```

Content should include cautious wording:

```text
這可能與頭皮筋膜、枕下肌群、頸椎角度變化、淺層傾聽時感受到的張力層連動有關。
但目前不能直接判定第二層對應到特定解剖組織。
```

```markdown
## 尚未確認
```

Content should include:

```text
- 第二層深層硬層的組織學對應尚未確認。
- 這個三層手感是否能在他人身上穩定重現仍未確認。
- 頸椎角度造成的頭皮位移感，可能包含筋膜、肌肉、皮下組織、感覺誤差等多重因素。
```

```markdown
## 反例或風險
```

Content should include:

```text
- 不應直接將觸診層次等同於解剖層次。
- 不應把個人主觀手感直接推廣成一般臨床定論。
- 若出現神經症狀、頭暈、視覺異常或明顯疼痛，應避免過度自我測試。
```

```markdown
## 相關技法
```

Content should include backlinks:

```markdown
- [[淺層傾聽]]
- [[CST]]
```

```markdown
## 相關筆記
```

Content should include backlinks:

```markdown
- [[頭皮筋膜]]
- [[頸椎角度]]
- [[枕下肌]]
- [[張力層]]
```

```markdown
## 下一步驗證
```

Content should include:

```text
- 在他人身上測試是否能穩定區分三層手感。
- 比較不同頸椎角度下，頭皮滑移方向是否一致。
- 區分外力可滑移與主動姿勢造成的張力層位移。
- 觀察這個模型是否能解釋顱頸區域的傾聽與放鬆反應。
```

---

## Recommended Implementation Steps

Codex should perform these steps.

### Step 1: Validate current vault

Run:

```bash
npm run validate
```

If validation fails, stop and report the issue.

Do not proceed to create the note until validation passes.

### Step 2: Search existing notes

Run:

```bash
npm run search -- "頭皮三層觸診模型"
```

Also search:

```bash
npm run search -- "頭皮筋膜"
npm run search -- "頸椎角度"
```

If `50_Hypotheses/頭皮三層觸診模型.md` already exists, do not overwrite it.

Instead, append a new dated section only if it is safe.

If uncertain, stop and ask the user.

### Step 3: Create note

If the note does not exist, run:

```bash
npm run create-note -- --type hypothesis --title "頭皮三層觸診模型"
```

Expected file:

```text
50_Hypotheses/頭皮三層觸診模型.md
```

### Step 4: Fill note content

After creating the note, update it with the required content.

Preferred safe approach:

* read the generated file
* replace only the empty template sections
* preserve the YAML and heading structure
* do not alter unrelated files

If using direct file editing, ensure the final note matches the required structure.

### Step 5: Run validation

Run:

```bash
npm run validate
```

Expected:

```text
Vault validation passed.
```

### Step 6: Report Git status

Run:

```bash
git status --short
```

Do not commit unless explicitly asked by the user.

Report changed files.

---

## Out of Scope

Do not do any of the following in this task:

* Do not configure MCP.
* Do not start an MCP server.
* Do not create daily conversation ingestion folders.
* Do not create `_proposals/`.
* Do not create Docusaurus files.
* Do not create Notion integration.
* Do not create other real knowledge notes.
* Do not modify `.obsidian/` files.
* Do not update MOC files unless explicitly requested.
* Do not mark the hypothesis as confirmed.
* Do not delete or rename existing notes.

---

## Acceptance Criteria

This task is complete when:

* [x] `npm run validate` passes before note creation.
* [x] Existing notes are searched before writing.
* [x] `50_Hypotheses/頭皮三層觸診模型.md` exists.
* [x] The note uses hypothesis-style frontmatter.
* [x] The note has `status: developing`.
* [x] The note has `confidence: low`.
* [x] The note preserves uncertainty.
* [x] The note separates observation from possible mechanism.
* [x] The note includes required backlinks.
* [x] The note does not claim confirmed anatomy.
* [x] `npm run validate` passes after note creation.
* [x] No `.obsidian/` files are modified.
* [x] No MOC files are modified unless explicitly requested.
* [x] Git status is reported.

---

## Manual Review Checklist

The user should review:

```bash
git diff
```

Confirm:

* the note is useful enough to keep
* the note preserves uncertainty
* no unrelated files were modified
* no `.obsidian/` files were modified
* the date and frontmatter are correct

If good, the user may commit manually:

```bash
git add .
git commit -m "test: add first real hypothesis note"
```

---

## Completion Report Required

After completing this task, report:

```text
Completed: todo/006-first-real-write-test.md

Validation before write:
- npm run validate: passed / failed

Search results:
- 頭皮三層觸診模型: ...
- 頭皮筋膜: ...
- 頸椎角度: ...

Created files:
- 50_Hypotheses/頭皮三層觸診模型.md

Modified files:
- ...

Validation after write:
- npm run validate: passed / failed

Git status:
- ...

Notes:
- ...
```
