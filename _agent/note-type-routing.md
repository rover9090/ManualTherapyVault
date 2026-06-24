# Note Type Routing

Use this guide when deciding where a note should be created or updated.

If the user specifies a type or folder, follow the user's instruction unless it violates safety rules.

If the type is unclear, ask the user or propose the most likely type before writing.

---

## core_model

Folder:

```text
10_Core_Model/
```

Template:

```text
_templates/core-model.md
```

Use for relatively stable concepts in the user's manual therapy framework.

Examples:

- 七域模型
- 三座標
- 四分類
- node / band
- 張力 / 結構 / 剪切 / 神經分類
- 已經多次確認且語言穩定的核心方法論

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

- CST
- BLT
- PRT
- FT
- unwinding
- 承重誘導
- 單邊力量路徑誘導
- 淺層傾聽
- 動力串動

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

- AO-AA
- T1-T2
- 肩胛
- 肋骨
- 骨盆
- 頭皮筋膜
- 足底
- 枕下肌
- 舌骨
- 恥骨聯合

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

- 某次肩胛處理紀錄
- 個案主訴
- 觸診發現
- 介入反應
- 後續追蹤

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

- 頭皮三層觸診模型
- 胸廓左旋與左肩胛內上角刺感
- 足底筋膜炎可能源於小腿彈性不足
- 頸椎角度與頭皮張力層連動

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

- 張力路徑
- node
- band
- 淺層傾聽
- 承重誘導
- 架構
- 剪切

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

- books
- courses
- papers
- YouTube notes
- NotebookLM outputs
- external anatomy references
- professional guidelines

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

- hypothesis + body_region → choose hypothesis if the mechanism is still uncertain
- technique + hypothesis → choose hypothesis if the technique logic is not yet stable
- core_model + hypothesis → choose hypothesis unless the user says it is stable
- case + hypothesis → create a case note if it is tied to a specific person/session; otherwise create a hypothesis note

If still uncertain, ask the user before writing.
