# 009 Self Check and Acceptance Test

## Goal

This document defines the self-check process for Codex after completing the MVP todo sequence.

Codex should use this file to verify that tasks `002` through `008` were completed correctly and that the vault is ready for MCP / command-based Obsidian writing.

This task is a **test and review task**, not a feature implementation task.

---

## Scope

This self-check applies after these todo files have been completed:

```text
002-add-note-templates.md
003-add-package-and-validation.md
004-implement-note-scripts.md
005-add-mcp-config-and-agent-usage.md
006-first-real-write-test.md
007-strengthen-writing-protocol.md
008-future-conversation-ingestion-plan.md
```

This task should not add new features unless a previous task was incomplete.

---

## Global Rules

Codex must follow these rules during self-check:

* Do not delete files.
* Do not modify `.obsidian/`.
* Do not create daily conversation ingestion folders.
* Do not create `_proposals/`.
* Do not implement Docusaurus.
* Do not implement Notion integration.
* Do not start an MCP server.
* Do not install packages unless explicitly required.
* Do not commit changes unless the user explicitly asks.
* If something is missing, report it first.
* Only make minimal fixes if they are clearly required by previous todo acceptance criteria.

---

## Expected MVP Structure

Confirm that the vault root contains:

```text
AGENTS.md
README.md
.gitignore
package.json
todo/
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

Confirm that these folders do **not** exist during MVP unless the user explicitly created them:

```text
90_Inbox/
90_Conversation_Exports/
90_Raw_Conversations/
_proposals/
```

If they exist, report them as warnings and do not delete them without asking.

---

## Check 1: Git State Before Testing

Run:

```bash
git status --short
```

Report current state.

If there are many unrelated changes, stop and ask the user whether to continue.

Expected acceptable changes may include files created or modified by the todo sequence.

---

## Check 2: Validation Script

Run:

```bash
npm run validate
```

Expected result:

```text
Vault validation passed.
```

If validation fails:

1. Report the exact error.
2. Identify which todo likely failed.
3. Do not continue to destructive operations.
4. Apply only minimal fixes if clearly required by earlier todo criteria.
5. Re-run validation.

---

## Check 3: Template Files

Confirm that these files exist:

```text
_templates/core-model.md
_templates/technique.md
_templates/body-region.md
_templates/case.md
_templates/hypothesis.md
_templates/glossary.md
_templates/reference.md
```

For each template, confirm:

* It starts with YAML frontmatter.
* It contains `{{title}}`.
* It contains `{{date}}`.
* It contains `## 相關筆記`.
* It uses Traditional Chinese section headings.
* It does not contain filled real note content.

Report any missing fields.

---

## Check 4: Agent Instruction Files

Confirm that these files exist:

```text
_agent/instructions.md
_agent/safety-rules.md
_agent/note-type-routing.md
_agent/write-protocol.md
_agent/mcp-config-example.json
_agent/mcp-usage.md
_agent/future-conversation-ingestion.md
```

Confirm that `_agent/instructions.md` says:

* the agent is for Obsidian manual therapy knowledge work
* writing is explicit command-based
* ordinary conversation should not be auto-saved
* Traditional Chinese is default
* observation / hypothesis / uncertainty must be preserved

Confirm that `_agent/safety-rules.md` says:

* do not delete files
* do not overwrite whole notes
* do not mass rename or move files
* do not edit `.obsidian/`
* do not edit outside this vault
* do not change hypotheses to confirmed without explicit user instruction

Confirm that `_agent/note-type-routing.md` maps:

```text
core_model  → 10_Core_Model/
technique   → 20_Techniques/
body_region → 30_Body_Regions/
case        → 40_Cases/
hypothesis  → 50_Hypotheses/
glossary    → 60_Glossary/
reference   → 80_References/
```

Confirm that `_agent/write-protocol.md` defines:

* confirm write intent
* identify note type
* search before writing
* create / append / ask decision
* use templates
* preserve epistemic status
* use backlinks carefully
* append safely
* do not update MOC automatically
* validate and report changes
* do not pretend files were written if tools are unavailable

---

## Check 5: MCP Documentation

Validate JSON syntax:

```bash
node -e "JSON.parse(require('fs').readFileSync('_agent/mcp-config-example.json', 'utf8')); console.log('JSON valid')"
```

Expected result:

```text
JSON valid
```

Confirm that `_agent/mcp-config-example.json` includes:

* Windows example
* Mac/Linux example
* filesystem server command
* placeholder vault path scoped only to `ManualTherapyVault`

Confirm that `_agent/mcp-usage.md` includes:

* purpose of MCP
* recommended architecture
* filesystem scope warning
* setup steps
* first connection test
* write command examples
* safety rules
* Git workflow
* troubleshooting
* out-of-scope section

---

## Check 6: Helper Scripts

Confirm that these files exist:

```text
_scripts/validate-vault.mjs
_scripts/search-notes.mjs
_scripts/create-note.mjs
_scripts/append-note-section.mjs
```

Confirm that `package.json` includes:

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

Run search test:

```bash
npm run search -- "徒手治療"
```

Expected:

* at least one Markdown file should be listed
* no file should be modified

Run create-note safety test with a temporary note:

```bash
npm run create-note -- --type hypothesis --title "自我檢查測試假說"
```

Expected created file:

```text
50_Hypotheses/自我檢查測試假說.md
```

Then run duplicate create test:

```bash
npm run create-note -- --type hypothesis --title "自我檢查測試假說"
```

Expected:

* script refuses to overwrite
* exits with non-zero status code

Run append test:

```bash
npm run append-note -- --file "50_Hypotheses/自我檢查測試假說.md" --heading "自我檢查追加" --content "這是一段自我檢查測試內容。"
```

Expected:

* section is appended
* previous content is preserved
* no unrelated file is modified

Important:

The temporary test file may remain unless the user explicitly allows deletion.

If deletion is forbidden by AGENTS.md, do not delete it. Instead, report it as a test artifact.

---

## Check 7: First Real Note

Confirm that this file exists:

```text
50_Hypotheses/頭皮三層觸診模型.md
```

Confirm that it includes:

* YAML frontmatter
* `type: hypothesis`
* `status: developing`
* `confidence: low`
* `# 頭皮三層觸診模型`
* `## 核心說法`
* `## 觀察依據`
* `## 可能機制`
* `## 尚未確認`
* `## 反例或風險`
* `## 相關技法`
* `## 相關筆記`
* `## 下一步驗證`

Confirm that it includes backlinks to:

```text
[[頭皮筋膜]]
[[頸椎角度]]
[[枕下肌]]
[[淺層傾聽]]
```

Confirm that it does **not** claim:

* the second layer is anatomically confirmed
* subjective palpation equals objective anatomy
* the hypothesis is clinically proven

---

## Check 8: Future Conversation Ingestion Plan

Confirm that `_agent/future-conversation-ingestion.md` exists.

Confirm that it clearly says:

* conversation ingestion is not part of MVP
* no daily conversation folders should be created during MVP
* future flow is raw source → proposal → confirmed note
* raw conversation is not formal knowledge
* proposal requires user review
* confirmed note means approved for vault inclusion, not medically proven

Confirm that these folders were not created:

```text
90_Inbox/
90_Conversation_Exports/
90_Raw_Conversations/
_proposals/
```

---

## Check 9: Obsidian Folder Safety

Run:

```bash
git status --short .obsidian
```

Expected:

* ideally no tracked changes
* if workspace files changed, they should be ignored by `.gitignore`

Confirm `.gitignore` includes:

```gitignore
.obsidian/workspace*
.obsidian/cache
.trash/
.DS_Store
Thumbs.db
node_modules/
```

If `.obsidian/workspace.json` is tracked and keeps changing, report:

```text
workspace.json appears to be tracked. Recommend:
git rm --cached .obsidian/workspace.json
```

Do not run the command unless the user explicitly asks.

---

## Check 10: Final Validation

Run:

```bash
npm run validate
```

Expected:

```text
Vault validation passed.
```

Run:

```bash
git status --short
```

Report final status.

---

## Final Report Format

After completing this self-check, report:

```text
Completed: todo/009-self-check-and-acceptance-test.md

Validation:
- npm run validate: passed / failed
- MCP config JSON: valid / invalid

Structure:
- required folders: passed / failed
- forbidden MVP folders absent: passed / warnings

Templates:
- passed / failed

Agent protocol files:
- passed / failed

Scripts:
- search: passed / failed
- create-note: passed / failed
- duplicate refusal: passed / failed
- append-note: passed / failed

First real note:
- 頭皮三層觸診模型.md: passed / failed

Conversation ingestion plan:
- documented only: passed / failed
- future folders not created: passed / warnings

Obsidian safety:
- .obsidian unchanged or ignored: passed / warnings

Created test artifacts:
- 50_Hypotheses/自我檢查測試假說.md, if created

Modified files:
- ...

Warnings:
- ...

Recommended next steps:
- ...
```

---

## Done Criteria

This self-check is complete when:

* all core validations pass
* any warnings are clearly reported
* no destructive action was taken
* no `.obsidian/` files were intentionally modified
* no future ingestion folders were created
* the user has enough information to decide whether to commit or request fixes
