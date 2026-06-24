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
```

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

- core_model
- technique
- body_region
- case
- hypothesis
- glossary
- reference

---

## Step 3: Search Before Writing

Before creating a new note, search existing notes by:

- exact title
- major keywords
- related body region
- related technique
- related hypothesis

Use helper scripts when available:

```bash
npm run search -- "<keyword>"
```

Search at least:

- proposed title
- 1 to 3 core keywords

---

## Step 4: Decide Create / Append / Ask

Create a new note when:

- no existing note matches the same main concept
- the user explicitly asks to create a new note
- the content is a distinct concept

Append to an existing note when:

- the same concept already exists
- the user asks to update an existing note
- the new content is clearly a supplement to an existing note

Ask the user when:

- title conflict exists
- multiple similar notes exist
- unsure whether content is a new concept or an update
- writing would require moving, renaming, or restructuring notes

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

- observation
- interpretation
- hypothesis
- possible mechanism
- uncertainty
- risk
- next verification

Use cautious wording for unconfirmed ideas:

- 可能
- 目前推測
- 尚未確認
- 需要進一步驗證
- 不能直接判定

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

- read the existing note first
- append a new section at the bottom
- preserve previous wording
- do not rewrite the whole note
- include a dated heading when useful

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

- do not pretend files were written
- provide the intended Markdown or patch
- clearly say no file was modified
