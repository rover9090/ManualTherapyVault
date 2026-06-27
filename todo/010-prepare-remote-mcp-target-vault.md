# 010 Prepare Remote MCP Target Vault

## Goal

Prepare `ManualTherapyVault` to become a GitHub-backed Obsidian vault target for a separate remote MCP server.

This task updates the vault repo so it clearly declares:

```text
This repository is the Obsidian vault data repository.
It is not the Cloudflare Worker / remote MCP server repository.
A separate MCP server may read and write this vault through GitHub API.
```

This task also repositions the existing local MCP documentation as an optional local workflow, not the primary workflow.

---

## Context

Current architectural decision:

```text
One Obsidian vault = one Git repository
ManualTherapyVault = Obsidian vault / data repo
obsidian-mcp-server = separate remote MCP server repo, to be created later
```

Primary future flow:

```text
ChatGPT
→ remote MCP server
→ GitHub API
→ ManualTherapyVault repo
→ local/mobile git pull
→ Obsidian
```

Optional local future flow:

```text
local MCP-capable client
→ local filesystem MCP server
→ local ManualTherapyVault folder
→ Obsidian
```

The vault should support both flows conceptually, but the primary next architecture is remote MCP through GitHub API.

---

## Required Changes

### 1. Create `.obsidian-mcp/`

Create a new folder:

```text
.obsidian-mcp/
```

This folder is for MCP-related vault metadata and policy.

Do not confuse this with `.obsidian/`, which belongs to Obsidian itself.

---

### 2. Create `.obsidian-mcp/vault.json`

Create:

```text
.obsidian-mcp/vault.json
```

Content:

```json
{
  "vaultId": "manual-therapy",
  "displayName": "Manual Therapy Vault",
  "description": "Manual therapy model, techniques, body regions, cases, hypotheses, glossary, and references.",
  "language": "zh-TW",
  "defaultBranch": "main",
  "noteTypeRoutes": {
    "core_model": "10_Core_Model",
    "technique": "20_Techniques",
    "body_region": "30_Body_Regions",
    "case": "40_Cases",
    "hypothesis": "50_Hypotheses",
    "glossary": "60_Glossary",
    "reference": "80_References"
  },
  "allowedWriteFolders": [
    "10_Core_Model",
    "20_Techniques",
    "30_Body_Regions",
    "40_Cases",
    "50_Hypotheses",
    "60_Glossary",
    "80_References"
  ],
  "restrictedWriteFolders": [
    "00_MOC"
  ],
  "readonlyFolders": [
    "_agent",
    "_templates",
    "_scripts",
    "todo",
    ".obsidian-mcp"
  ],
  "forbiddenFolders": [
    ".git",
    ".obsidian",
    "node_modules"
  ],
  "templates": {
    "core_model": "_templates/core-model.md",
    "technique": "_templates/technique.md",
    "body_region": "_templates/body-region.md",
    "case": "_templates/case.md",
    "hypothesis": "_templates/hypothesis.md",
    "glossary": "_templates/glossary.md",
    "reference": "_templates/reference.md"
  },
  "mocPolicy": {
    "autoUpdate": false,
    "updateOnlyOnExplicitRequest": true
  },
  "publish": {
    "default": false,
    "field": "dg-publish"
  }
}
```

Important:

This file is metadata for the vault.

It is not a secret file.

Do not store GitHub tokens, API keys, or Cloudflare secrets here.

The remote MCP server must still enforce its own hard-coded or server-side allowlist. This file is a declaration, not the only security boundary.

---

### 3. Create `.obsidian-mcp/tool-policy.md`

Create:

```text
.obsidian-mcp/tool-policy.md
```

Content:

````markdown
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
````

## Allowed Tool Behaviors

### listVaults

May return this vault as:

```text
vaultId: manual-therapy
displayName: Manual Therapy Vault
```

### listNotes

May list Markdown files from these folders:

* `00_MOC/`
* `10_Core_Model/`
* `20_Techniques/`
* `30_Body_Regions/`
* `40_Cases/`
* `50_Hypotheses/`
* `60_Glossary/`
* `80_References/`

Must not list files from:

* `.git/`
* `.obsidian/`
* `node_modules/`

### readNote

May read Markdown files from:

* `00_MOC/`
* `10_Core_Model/`
* `20_Techniques/`
* `30_Body_Regions/`
* `40_Cases/`
* `50_Hypotheses/`
* `60_Glossary/`
* `80_References/`
* `_agent/`
* `_templates/`
* `.obsidian-mcp/`

Must not read:

* `.git/`
* `.obsidian/`
* `node_modules/`
* files outside this repository

### createNote

May create new Markdown notes only in:

* `10_Core_Model/`
* `20_Techniques/`
* `30_Body_Regions/`
* `40_Cases/`
* `50_Hypotheses/`
* `60_Glossary/`
* `80_References/`

Must use `noteTypeRoutes` from `.obsidian-mcp/vault.json`.

Must not overwrite existing files.

Must not create files in:

* `00_MOC/`, unless the user explicitly requests MOC creation
* `_agent/`
* `_templates/`
* `_scripts/`
* `todo/`
* `.obsidian-mcp/`
* `.obsidian/`
* `.git/`

### appendNote

May append sections to existing Markdown notes in:

* `10_Core_Model/`
* `20_Techniques/`
* `30_Body_Regions/`
* `40_Cases/`
* `50_Hypotheses/`
* `60_Glossary/`
* `80_References/`

Must:

* read the existing note first
* preserve existing content
* append a new section
* avoid rewriting the whole note
* preserve uncertainty markers

Must not append to:

* `.obsidian/`
* `.git/`
* `node_modules/`
* files outside this repository

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

* title
* path
* YAML frontmatter
* headings
* short snippets

Search should exclude:

* `.git/`
* `.obsidian/`
* `node_modules/`

Search may include:

* note folders
* `00_MOC/`
* `_agent/`
* `_templates/`

The remote MCP server may use GitHub API, local cache, or an index, but GitHub remains the source of truth.

## Forbidden Behaviors

The MCP server and agent must not:

* delete files
* mass rename files
* mass move files
* overwrite whole notes
* rewrite large sections without explicit user approval
* modify `.obsidian/`
* modify `.git/`
* modify `node_modules/`
* modify files outside this repository
* store secrets in this repository
* turn hypotheses into confirmed claims without explicit user instruction
* auto-publish notes
* auto-update MOC files

## Epistemic Safety

When writing manual therapy notes, preserve the distinction between:

* observation
* interpretation
* hypothesis
* possible mechanism
* uncertainty
* clinical risk
* external reference

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

```
```

---

### 4. Reposition local MCP files

Existing files:

```text
_agent/mcp-config-example.json
_agent/mcp-usage.md
```

These were originally for local filesystem MCP usage.

Rename them to:

```text
_agent/local-mcp-config-example.json
_agent/local-mcp-usage.md
```

If the files do not exist, do not fail the task. Instead, report that they were not found.

After renaming, update references in any documentation if necessary.

The new meaning is:

```text
local MCP = optional local filesystem workflow
remote MCP = primary future ChatGPT → GitHub API workflow
```

Do not delete the local MCP documentation.

---

### 5. Create `_agent/remote-mcp-target.md`

Create:

```text
_agent/remote-mcp-target.md
```

Content:

````markdown
# Remote MCP Target Vault

## Purpose

This repository is the Obsidian vault data repository for the user's manual therapy knowledge system.

It is intended to be readable and writable by a separate remote MCP server through GitHub API.

This repository is not the remote MCP server implementation.

The remote MCP server should live in a separate repository, for example:

```text
obsidian-mcp-server/
````

## Primary Flow

```text
ChatGPT
→ remote MCP server
→ GitHub API
→ ManualTherapyVault repository
→ local/mobile git pull
→ Obsidian
```

## Repository Responsibilities

This repository is responsible for:

* storing Markdown notes
* storing Obsidian-compatible folder structure
* storing note templates
* storing agent and safety policies
* exposing vault metadata through `.obsidian-mcp/vault.json`
* documenting tool policy through `.obsidian-mcp/tool-policy.md`

This repository is not responsible for:

* hosting the MCP server
* storing GitHub API tokens
* storing Cloudflare secrets
* implementing Cloudflare Worker source code
* exposing public HTTP endpoints

## Remote MCP Server Responsibilities

The remote MCP server is responsible for:

* authenticating requests
* connecting to GitHub API
* enforcing server-side path safety
* reading notes
* creating notes
* appending notes
* optionally searching notes
* committing changes to this repository
* reporting created and modified files

## Local MCP Optional Flow

Local MCP filesystem access may still be useful in the future for:

* full-vault analysis
* large refactors
* local-only workflows
* direct filesystem access when ChatGPT supports local MCP

Local MCP documentation is stored in:

```text
_agent/local-mcp-usage.md
_agent/local-mcp-config-example.json
```

## Security Notes

The remote MCP server must not trust this repository as the only security boundary.

The server must enforce its own allowlist for:

* allowed vault IDs
* allowed repositories
* allowed write folders
* forbidden folders
* supported note types

Never store secrets in this repository.

````

---

### 6. Update `AGENTS.md`

Add a section if it does not already exist:

```markdown
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
````

Do not place Cloudflare Worker source code in this vault.

Do not store GitHub tokens, Cloudflare secrets, or API keys in this vault.

````

Keep the update minimal. Do not rewrite the whole file unless necessary.

---

### 7. Update `README.md`

Add or update a section:

```markdown
## Remote MCP Workflow

This repository is the Obsidian vault data repository.

The remote MCP server should live in a separate repository, such as:

```text
obsidian-mcp-server/
````

Expected primary flow:

```text
ChatGPT
→ remote MCP server
→ GitHub API
→ this repository
→ local/mobile git pull
→ Obsidian
```

Local filesystem MCP usage is optional and documented in:

```text
_agent/local-mcp-usage.md
```

````

Keep the update minimal.

---

### 8. Update validation script

Update:

```text
_scripts/validate-vault.mjs
````

Add validation for:

```text
.obsidian-mcp/vault.json
.obsidian-mcp/tool-policy.md
_agent/remote-mcp-target.md
```

Validate that `.obsidian-mcp/vault.json`:

* is valid JSON
* has `vaultId`
* has `displayName`
* has `noteTypeRoutes`
* has `allowedWriteFolders`
* has `readonlyFolders`
* has `forbiddenFolders`
* has `templates`
* has `mocPolicy`
* has `publish`
* includes `.git` in `forbiddenFolders`
* includes `.obsidian` in `forbiddenFolders`
* includes `node_modules` in `forbiddenFolders`

Validate that `noteTypeRoutes` includes:

```text
core_model
technique
body_region
case
hypothesis
glossary
reference
```

Validate that `templates` includes paths for:

```text
core_model
technique
body_region
case
hypothesis
glossary
reference
```

If the validation script currently requires old local MCP filenames:

```text
_agent/mcp-config-example.json
_agent/mcp-usage.md
```

update it to require the new names instead:

```text
_agent/local-mcp-config-example.json
_agent/local-mcp-usage.md
```

If local MCP files do not exist and this repo never had them, do not make them mandatory unless they were created by previous tasks.

---

## Out of Scope

Do not do any of the following in this task:

* Do not create Cloudflare Worker source code.
* Do not create `obsidian-mcp-server/` inside this repository.
* Do not create `wrangler.jsonc`.
* Do not install MCP packages.
* Do not start an MCP server.
* Do not create GitHub tokens.
* Do not store secrets.
* Do not create daily conversation ingestion folders.
* Do not create `_proposals/`.
* Do not create Docusaurus files.
* Do not create Digital Garden site files.
* Do not modify `.obsidian/`.
* Do not create new manual therapy knowledge notes.
* Do not delete local MCP documentation.

---

## Acceptance Criteria

This task is complete when:

* [ ] `.obsidian-mcp/vault.json` exists.
* [ ] `.obsidian-mcp/vault.json` is valid JSON.
* [ ] `.obsidian-mcp/tool-policy.md` exists.
* [ ] `_agent/remote-mcp-target.md` exists.
* [ ] Existing local MCP docs are renamed to local MCP names if present.
* [ ] `AGENTS.md` states this repo is the vault data repo, not the MCP server repo.
* [ ] `README.md` documents the remote MCP workflow.
* [ ] `validate-vault.mjs` checks remote MCP target metadata.
* [ ] `npm.cmd run validate` passes.
* [ ] No `.obsidian/` files are modified.
* [ ] No Cloudflare Worker server files are created in this repo.
* [ ] No secrets are added.

---

## Manual Test Commands

Run:

```powershell
npm.cmd run validate
```

Expected:

```text
Vault validation passed.
```

Validate JSON manually:

```powershell
node -e "JSON.parse(require('fs').readFileSync('.obsidian-mcp/vault.json', 'utf8')); console.log('vault.json valid')"
```

Expected:

```text
vault.json valid
```

Check Git status:

```powershell
git status --short
```

Expected modified or created files may include:

```text
.obsidian-mcp/vault.json
.obsidian-mcp/tool-policy.md
_agent/remote-mcp-target.md
_agent/local-mcp-config-example.json
_agent/local-mcp-usage.md
AGENTS.md
README.md
_scripts/validate-vault.mjs
```

Expected files must not include:

```text
.obsidian/
wrangler.jsonc
src/
worker/
```

---

## Completion Report Required

After completing this task, report:

```text
Completed: todo/010-prepare-remote-mcp-target-vault.md

Created files:
- .obsidian-mcp/vault.json
- .obsidian-mcp/tool-policy.md
- _agent/remote-mcp-target.md

Renamed files:
- _agent/mcp-config-example.json → _agent/local-mcp-config-example.json, if present
- _agent/mcp-usage.md → _agent/local-mcp-usage.md, if present

Modified files:
- AGENTS.md
- README.md
- _scripts/validate-vault.mjs

Validation:
- npm.cmd run validate: passed / failed
- vault.json JSON validation: passed / failed

Confirmed not created:
- Cloudflare Worker source files
- wrangler.jsonc
- daily conversation ingestion folders
- _proposals/

Notes:
- ...
```
