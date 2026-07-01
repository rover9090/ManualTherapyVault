# AGENTS.md

## Project goal

This repository is an Obsidian vault data repository for the user's manual therapy knowledge system.

The remote MCP server is implemented and operated outside this repository.

This repository should contain vault data, note templates, and vault metadata only.

## Repository Role

This repository is the Obsidian vault data repository.

It is not the Cloudflare Worker MCP server repository.

Remote MCP server source code must live in a separate repository.

This vault may be accessed by:

- remote MCP server through GitHub API
- local agent through filesystem access
- human user through Obsidian

Primary external write flow:

```text
ChatGPT → remote MCP server → GitHub API → this repository
```

Do not place Cloudflare Worker source code in this vault.

Do not store GitHub tokens, Cloudflare secrets, or API keys in this vault.

The portable MCP control contract for this vault is:

- `.obsidian-mcp/vault.json`
- `_templates/`

## Write trigger

Do not write files unless the user explicitly asks to write into the vault.

Valid write triggers include:

- 整理進 Obsidian
- 寫入 vault
- 建立筆記
- 更新筆記
- save this to Obsidian
- write this into the vault
- create a note
- update the note

If the user is only discussing an idea, do not modify files.

## File safety

Never:

- delete files
- mass rename files
- mass move files
- overwrite whole notes
- rewrite large existing sections without confirmation
- edit outside this vault
- modify Git history

Allowed by default:

- create new Markdown notes
- append new sections to existing notes
- add backlinks
- create or update YAML frontmatter for newly created notes
- update MOC files only when explicitly requested

## Note type routing

Use these folders:

- `00_MOC/` for maps of content and index notes
- `10_Core_Model/` for stable model notes
- `20_Techniques/` for technique notes
- `30_Body_Regions/` for body region notes
- `40_Cases/` for case notes
- `50_Hypotheses/` for developing hypotheses
- `60_Glossary/` for terminology notes
- `80_References/` for external references
- `_templates/` for note templates

If the user specifies the folder, follow the user's instruction.

If the note type is unclear, ask or propose a type before writing.

## Create vs append protocol

Before writing:

1. Search for an exact title match.
2. Search for related notes using major keywords.
3. If the same concept already exists, append a new dated section.
4. If no matching note exists, create a new note from the correct template.
5. If uncertain whether to create or append, ask the user.

Never overwrite existing content.

## Manual therapy knowledge safety

Always preserve the distinction between:

- observation
- interpretation
- hypothesis
- possible mechanism
- uncertainty
- clinical risk
- external reference

Do not convert subjective body sensations into confirmed anatomical facts.

Do not diagnose.

Do not remove uncertainty markers.

Do not mark `status: developing` or `status: hypothesis` as `confirmed` unless the user explicitly asks.

Use Traditional Chinese by default.

Preserve the user's terminology, including:

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

## Markdown style

All notes should use Markdown.

New notes should include YAML frontmatter.

Use Obsidian backlinks when useful:

```markdown
[[T1-T2空間不足]]
[[胸廓左旋位]]
[[承重誘導]]
```

## Writing Protocol

For Obsidian note writing, external MCP tools should primarily follow:

- `.obsidian-mcp/vault.json`
- `_templates/`

Do not write files unless the user explicitly asks to write into Obsidian or the vault.
