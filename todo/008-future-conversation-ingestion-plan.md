# 008 Future Conversation Ingestion Plan

## Goal

Document a future plan for processing daily or historical conversations into the Obsidian vault.

This task is **documentation only**.

Do not implement conversation ingestion in this task.

Do not create conversation folders yet.

Do not create scripts for conversation ingestion yet.

---

## Context

Previous tasks:

```text
001-bootstrap-vault.md
Created the vault folder structure.

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

007-strengthen-writing-protocol.md
Strengthened agent rules for command-based writing.
```

The MVP workflow is still:

```text
User explicitly asks to write selected content into Obsidian
↓
Agent creates or appends a structured note
↓
Git tracks changes
```

This task only documents a later phase:

```text
Conversation export
↓
Raw source storage
↓
Agent extracts candidate notes
↓
Agent creates proposals
↓
User reviews
↓
Confirmed notes are written into formal folders
```

---

## Important Clarification

The user does **not** want the first milestone to be manual daily conversation processing.

The first milestone is MCP / Codex / filesystem-based command writing.

Conversation ingestion is a future phase.

This file exists to prevent future agents from confusing the MVP with automatic chat logging.

---

## Required File

Create:

```text
_agent/future-conversation-ingestion.md
```

Optional:

Update `README.md` with one short link to this document.

Do not create any of the following folders in this task:

```text
90_Inbox/
90_Conversation_Exports/
90_Raw_Conversations/
_proposals/
```

These folders are only proposed for a future phase.

---

# File: `_agent/future-conversation-ingestion.md`

Create the file with the following structure:

```markdown
# Future Conversation Ingestion Plan

## Purpose

## Why This Is Not Part of MVP

## Future Architecture

## Proposed Folder Structure

## Source vs Proposal vs Confirmed Note

## Workflow A: Manual Export Ingestion

## Workflow B: Chat Transcript Folder

## Workflow C: Current Conversation Capture Through MCP Client

## Proposal Rules

## Confirmation Rules

## Safety Rules

## Out of Scope for MVP
```

---

## Required Content Details

### Purpose

Explain that this document describes a future optional workflow for importing selected chat transcripts or historical conversations into the Obsidian vault.

Clarify:

```text
Conversation ingestion is for later.
The current MVP is explicit command-based note writing.
```

---

### Why This Is Not Part of MVP

Include:

```text
The user does not want to start by manually processing everyday conversations.
The first useful workflow is direct MCP / Codex writing when the user explicitly requests it.
Conversation ingestion adds complexity and should be built only after command-based writing is stable.
```

---

### Future Architecture

Include:

```text
Raw conversation source
↓
Agent scans source
↓
Agent extracts candidate ideas
↓
Agent creates proposal notes
↓
User approves or rejects
↓
Agent writes confirmed notes into formal folders
```

Formal folders are:

```text
10_Core_Model/
20_Techniques/
30_Body_Regions/
40_Cases/
50_Hypotheses/
60_Glossary/
80_References/
```

---

### Proposed Folder Structure

Document possible future folders, but do not create them yet:

```text
90_Conversation_Exports/
90_Raw_Conversations/
_proposals/
```

Explain intended usage:

```text
90_Conversation_Exports/
For manually exported conversations from ChatGPT or other AI clients.

90_Raw_Conversations/
For raw transcript-like data that should not be treated as formal knowledge.

_proposals/
For agent-generated candidate notes awaiting user confirmation.
```

State clearly:

```text
These folders are future-phase only.
Do not create them during MVP unless the user explicitly asks.
```

---

### Source vs Proposal vs Confirmed Note

Define three levels:

```text
Raw source
Unprocessed conversation or transcript.
Not considered knowledge.

Proposal
Agent-generated candidate note.
May contain extracted observations, hypotheses, or concepts.
Requires user review.

Confirmed note
A user-approved note written into formal folders.
Still may be status: developing or hypothesis.
Confirmed only means approved for vault inclusion, not clinically proven.
```

Emphasize:

```text
Approved for vault inclusion does not mean medically confirmed.
```

---

### Workflow A: Manual Export Ingestion

Document future workflow:

```text
1. User exports selected conversation as .md, .txt, or .json.
2. User places it in 90_Conversation_Exports/.
3. Agent reads the file.
4. Agent extracts candidate concepts.
5. Agent creates proposal files in _proposals/.
6. User reviews proposals.
7. Agent writes approved notes into formal folders.
```

Example command:

```text
請掃描 90_Conversation_Exports/2026-06-24-shoulder.md。
只產生 proposal，不要寫入正式筆記。
```

---

### Workflow B: Chat Transcript Folder

Document future workflow:

```text
1. Multiple exported conversations are placed into 90_Raw_Conversations/.
2. Agent scans by topic, date, or keyword.
3. Agent groups related content.
4. Agent creates proposal notes.
5. User approves selected proposals.
```

Example command:

```text
請掃描 90_Raw_Conversations/ 中所有提到 T1-T2、肩胛、胸廓左旋的內容。
先產生 proposal，不要修改正式筆記。
```

---

### Workflow C: Current Conversation Capture Through MCP Client

Document the workflow closest to the MVP:

```text
1. User is talking with an MCP-capable AI client.
2. User says: 把剛剛這段整理進 Obsidian.
3. Agent uses current conversation context.
4. Agent writes directly into formal folders.
```

Clarify:

```text
This is not daily conversation ingestion.
This is explicit current-conversation command capture.
```

---

### Proposal Rules

Proposals should:

* preserve original source date if available
* link to source file if available
* separate observation from interpretation
* preserve uncertainty
* suggest note type
* suggest target folder
* list candidate backlinks
* ask for confirmation before formal writing

Proposal filename format:

```text
_proposals/YYYY-MM-DD-topic.proposal.md
```

Suggested proposal structure:

```markdown
---
type: proposal
status: pending-review
source: ""
created: YYYY-MM-DD
suggested_target_type: hypothesis
suggested_target_folder: 50_Hypotheses
tags:
  - manual-therapy
  - proposal
---

# Proposal: {{title}}

## Source

## Extracted Summary

## Candidate Note Type

## Proposed Target Folder

## Suggested Backlinks

## Uncertainty / Caveats

## Proposed Final Note Draft

## User Review

- [ ] approve
- [ ] revise
- [ ] reject
```

---

### Confirmation Rules

The agent must not move proposal content into formal folders until the user explicitly confirms.

Valid confirmation examples:

```text
批准這個 proposal，寫成 hypothesis note
把這份 proposal 整理進 50_Hypotheses
這個可以正式進 vault
```

If user approval is ambiguous, ask before writing.

---

### Safety Rules

The agent must not:

* auto-convert all raw conversation into notes
* treat raw conversation as confirmed knowledge
* write proposals into formal folders without approval
* erase uncertainty
* merge multiple distinct ideas into one note without explanation
* create excessive backlinks
* update MOC files automatically
* delete raw source files
* delete rejected proposals unless explicitly asked

The agent should:

* preserve source context
* maintain uncertainty markers
* keep raw source separate from formal notes
* ask when classification is ambiguous
* report created and modified files

---

### Out of Scope for MVP

Explicitly list:

```text
This project does not implement these in MVP:

- 90_Conversation_Exports/
- 90_Raw_Conversations/
- _proposals/
- conversation scanning scripts
- automatic transcript import
- automatic ChatGPT history sync
- vector database
- Docusaurus publishing
- Notion integration
```

---

## Optional README Update

If updating `README.md`, add only this short section:

```markdown
## Future Conversation Ingestion

Conversation ingestion is a future phase and is not part of the MVP.

See `_agent/future-conversation-ingestion.md`.
```

Do not rewrite the whole README.

---

## Out of Scope

Do not do any of the following in this task:

* Do not create `90_Inbox/`.
* Do not create `90_Conversation_Exports/`.
* Do not create `90_Raw_Conversations/`.
* Do not create `_proposals/`.
* Do not implement conversation ingestion scripts.
* Do not configure MCP.
* Do not start an MCP server.
* Do not create Docusaurus files.
* Do not create Notion integration.
* Do not create real knowledge notes.
* Do not modify `.obsidian/`.
* Do not update MOC files.
* Do not delete, rename, or move existing notes.

---

## Acceptance Criteria

This task is complete when:

* [ ] `_agent/future-conversation-ingestion.md` exists.
* [ ] The document clearly says conversation ingestion is not part of MVP.
* [ ] The document explains raw source vs proposal vs confirmed note.
* [ ] The document proposes future folders without creating them.
* [ ] The document includes future workflows A, B, and C.
* [ ] The document includes proposal rules.
* [ ] The document includes confirmation rules.
* [ ] The document includes safety rules.
* [ ] Optional README update is minimal if made.
* [ ] `npm run validate` still passes.
* [ ] No future conversation folders are created.
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

Check that future folders were not created:

```bash
ls
```

or on Windows PowerShell:

```powershell
Get-ChildItem
```

Confirm these do not exist unless the user explicitly created them elsewhere:

```text
90_Inbox/
90_Conversation_Exports/
90_Raw_Conversations/
_proposals/
```

---

## Completion Report Required

After completing this task, report:

```text
Completed: todo/008-future-conversation-ingestion-plan.md

Created files:
- _agent/future-conversation-ingestion.md

Modified files:
- README.md, if changed

Validation:
- npm run validate: passed / failed

Confirmed not created:
- 90_Inbox/
- 90_Conversation_Exports/
- 90_Raw_Conversations/
- _proposals/

Notes:
- ...
```
