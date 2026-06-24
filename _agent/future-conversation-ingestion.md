# Future Conversation Ingestion Plan

## Purpose

This document describes a future optional workflow for importing selected chat transcripts or historical conversations into the Obsidian vault.

Conversation ingestion is for later.
The current MVP is explicit command-based note writing.

## Why This Is Not Part of MVP

The user does not want to start by manually processing everyday conversations.

The first useful workflow is direct MCP / Codex writing when the user explicitly requests it.

Conversation ingestion adds complexity and should be built only after command-based writing is stable.

## Future Architecture

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

## Proposed Folder Structure

Possible future folders:

```text
90_Conversation_Exports/
90_Raw_Conversations/
_proposals/
```

Intended usage:

```text
90_Conversation_Exports/
For manually exported conversations from ChatGPT or other AI clients.

90_Raw_Conversations/
For raw transcript-like data that should not be treated as formal knowledge.

_proposals/
For agent-generated candidate notes awaiting user confirmation.
```

These folders are future-phase only.
Do not create them during MVP unless the user explicitly asks.

## Source vs Proposal vs Confirmed Note

Raw source:
Unprocessed conversation or transcript.
Not considered knowledge.

Proposal:
Agent-generated candidate note.
May contain extracted observations, hypotheses, or concepts.
Requires user review.

Confirmed note:
A user-approved note written into formal folders.
Still may be `status: developing` or `type: hypothesis`.
Confirmed only means approved for vault inclusion, not clinically proven.

Approved for vault inclusion does not mean medically confirmed.

## Workflow A: Manual Export Ingestion

Future workflow:

1. User exports selected conversation as `.md`, `.txt`, or `.json`.
2. User places it in `90_Conversation_Exports/`.
3. Agent reads the file.
4. Agent extracts candidate concepts.
5. Agent creates proposal files in `_proposals/`.
6. User reviews proposals.
7. Agent writes approved notes into formal folders.

Example command:

```text
請掃描 90_Conversation_Exports/2026-06-24-shoulder.md。
只產生 proposal，不要寫入正式筆記。
```

## Workflow B: Chat Transcript Folder

Future workflow:

1. Multiple exported conversations are placed into `90_Raw_Conversations/`.
2. Agent scans by topic, date, or keyword.
3. Agent groups related content.
4. Agent creates proposal notes.
5. User approves selected proposals.

Example command:

```text
請掃描 90_Raw_Conversations/ 中所有提到 T1-T2、肩胛、胸廓左旋的內容。
先產生 proposal，不要修改正式筆記。
```

## Workflow C: Current Conversation Capture Through MCP Client

Workflow closest to the MVP:

1. User is talking with an MCP-capable AI client.
2. User says: 把剛剛這段整理進 Obsidian.
3. Agent uses current conversation context.
4. Agent writes directly into formal folders.

This is not daily conversation ingestion.
This is explicit current-conversation command capture.

## Proposal Rules

Proposals should:

- preserve original source date if available
- link to source file if available
- separate observation from interpretation
- preserve uncertainty
- suggest note type
- suggest target folder
- list candidate backlinks
- ask for confirmation before formal writing

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

## Confirmation Rules

The agent must not move proposal content into formal folders until the user explicitly confirms.

Valid confirmation examples:

```text
批准這個 proposal，寫成 hypothesis note
把這份 proposal 整理進 50_Hypotheses
這個可以正式進 vault
```

If user approval is ambiguous, ask before writing.

## Safety Rules

The agent must not:

- auto-convert all raw conversation into notes
- treat raw conversation as confirmed knowledge
- write proposals into formal folders without approval
- erase uncertainty
- merge multiple distinct ideas into one note without explanation
- create excessive backlinks
- update MOC files automatically
- delete raw source files
- delete rejected proposals unless explicitly asked

The agent should:

- preserve source context
- maintain uncertainty markers
- keep raw source separate from formal notes
- ask when classification is ambiguous
- report created and modified files

## Out of Scope for MVP

This project does not implement these in MVP:

- `90_Conversation_Exports/`
- `90_Raw_Conversations/`
- `_proposals/`
- conversation scanning scripts
- automatic transcript import
- automatic ChatGPT history sync
- vector database
- Docusaurus publishing
- Notion integration
