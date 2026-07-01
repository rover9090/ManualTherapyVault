# MCP Tool Policy for ManualTherapyVault

## Repository Role

This repository is the Obsidian vault data repository.

It is not the remote MCP server repository.

A separate remote MCP server may read and write this vault through GitHub API.

Expected primary flow:

```text
ChatGPT
→ remote MCP server
→ GitHub API
→ this repository
→ local/mobile git pull
→ Obsidian
```

## Allowed Tool Behaviors

### listVaults

May return this vault as:

```text
vaultId: manual-therapy
displayName: Manual Therapy Vault
```

### listNotes

May list Markdown files from these folders:

- `00_MOC/`
- `10_Core_Model/`
- `20_Techniques/`
- `30_Body_Regions/`
- `40_Cases/`
- `50_Hypotheses/`
- `60_Glossary/`
- `80_References/`

Must not list files from:

- `.git/`
- `.obsidian/`
- `node_modules/`

### readNote

May read Markdown files from:

- `00_MOC/`
- `10_Core_Model/`
- `20_Techniques/`
- `30_Body_Regions/`
- `40_Cases/`
- `50_Hypotheses/`
- `60_Glossary/`
- `80_References/`
- `_templates/`
- `.obsidian-mcp/`

Must not read:

- `.git/`
- `.obsidian/`
- `node_modules/`
- files outside this repository

### createNote

May create new Markdown notes only in:

- `10_Core_Model/`
- `20_Techniques/`
- `30_Body_Regions/`
- `40_Cases/`
- `50_Hypotheses/`
- `60_Glossary/`
- `80_References/`

Must use `noteTypeRoutes` from `.obsidian-mcp/vault.json`.

Must not overwrite existing files.

Must not create files in:

- `00_MOC/`, unless the user explicitly requests MOC creation
- `_templates/`
- `.obsidian-mcp/`
- `.obsidian/`
- `.git/`

### appendNote

May append sections to existing Markdown notes in:

- `10_Core_Model/`
- `20_Techniques/`
- `30_Body_Regions/`
- `40_Cases/`
- `50_Hypotheses/`
- `60_Glossary/`
- `80_References/`

Must:

- read the existing note first
- preserve existing content
- append a new section
- avoid rewriting the whole note
- preserve uncertainty markers

Must not append to:

- `.obsidian/`
- `.git/`
- `node_modules/`
- files outside this repository

### updateMoc

MOC updates are restricted.

The agent must not update MOC files automatically.

MOC updates are allowed only when the user explicitly requests them.

When updating a MOC:

1. read the MOC first
2. check whether the link already exists
3. append only if missing
4. avoid reorganizing the whole page unless explicitly requested

### searchNotes

Search should be lightweight in the first implementation.

Search should prioritize:

- title
- path
- YAML frontmatter
- headings
- short snippets

Search should exclude:

- `.git/`
- `.obsidian/`
- `node_modules/`

Search may include:

- note folders
- `00_MOC/`
- `_templates/`

The remote MCP server may use GitHub API, local cache, or an index, but GitHub remains the source of truth.

## Forbidden Behaviors

The MCP server and agent must not:

- delete files
- mass rename files
- mass move files
- overwrite whole notes
- rewrite large sections without explicit user approval
- modify `.obsidian/`
- modify `.git/`
- modify `node_modules/`
- modify files outside this repository
- store secrets in this repository
- turn hypotheses into confirmed claims without explicit user instruction
- auto-publish notes
- auto-update MOC files

## Epistemic Safety

When writing manual therapy notes, preserve the distinction between:

- observation
- interpretation
- hypothesis
- possible mechanism
- uncertainty
- clinical risk
- external reference

Do not convert subjective palpation or body-sensation observations into confirmed anatomical facts.

Do not diagnose.

Do not remove uncertainty markers.

## Publish Safety

This vault may later support Digital Garden publishing.

Default publishing state should be:

```yaml
dg-publish: false
```

The MCP server must not set `dg-publish: true` unless the user explicitly requests publication.

Case notes must never be auto-published.
