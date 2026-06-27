# 012 Finalize Vault Repo for GitHub Sync

## Goal

Finalize `ManualTherapyVault` as a clean GitHub-backed Obsidian vault repository.

This task verifies that the repository is ready to be pushed to GitHub and used as the target vault for a future separate remote MCP server.

This task does **not** implement the remote MCP server.

This task does **not** create Cloudflare Worker files.

This task is repo hygiene, documentation, and final readiness validation.

---

## Context

Current architecture:

```text
ManualTherapyVault
= Obsidian vault / GitHub-backed data repository

obsidian-mcp-server
= future separate Cloudflare Worker / remote MCP server repository
```

Expected future flow:

```text
ChatGPT
→ remote MCP server
→ GitHub API
→ ManualTherapyVault repository
→ local/mobile git pull
→ Obsidian
```

This repository should be ready to act as the target vault for that workflow.

---

## Required Checks and Updates

### 1. Confirm repository role

Confirm these files clearly state that this repository is the vault data repo, not the MCP server repo:

```text
AGENTS.md
README.md
_agent/remote-mcp-target.md
.obsidian-mcp/tool-policy.md
```

They should communicate:

```text
This repository stores the Obsidian vault data.
Remote MCP server code must live in a separate repository.
No Cloudflare Worker source code belongs here.
No GitHub tokens, Cloudflare secrets, or API keys belong here.
```

If any file is unclear, update it minimally.

---

### 2. Confirm `.gitignore`

Ensure `.gitignore` includes:

```gitignore
.obsidian/workspace*
.obsidian/cache
.trash/
.DS_Store
Thumbs.db
node_modules/
```

If missing, add them.

Do not ignore the entire `.obsidian/` folder unless the user explicitly requests it.

The goal is to ignore volatile workspace state while still allowing useful Obsidian settings to be versioned if desired.

---

### 3. Confirm no unwanted tracked workspace files

Run:

```powershell
git status --short .obsidian
```

Expected:

```text
No tracked changes in .obsidian/
```

If `.obsidian/workspace.json` or `.obsidian/workspace-mobile.json` appears as tracked or modified, do **not** remove it automatically.

Instead, report the issue and recommend:

```powershell
git rm --cached .obsidian/workspace.json
git rm --cached .obsidian/workspace-mobile.json
```

Only run those commands if the user explicitly approves.

---

### 4. Confirm no test artifacts

Check for known test artifacts:

```text
50_Hypotheses/自我檢查測試假說.md
60_Glossary/mcp-test.md
60_Glossary/test-mcp.md
```

If any exist, report them.

Do not delete them automatically unless they are clearly untracked disposable test artifacts and AGENTS.md permits deletion.

If deletion is not allowed, ask the user.

The real note below is allowed and should remain:

```text
50_Hypotheses/頭皮三層觸診模型.md
```

---

### 5. Confirm no future conversation folders were created

These folders should not exist yet:

```text
90_Inbox/
90_Conversation_Exports/
90_Raw_Conversations/
_proposals/
```

If any exist, report them as warnings.

Do not delete without user approval.

---

### 6. Confirm no server code exists in this repo

These should not exist in this repository:

```text
wrangler.jsonc
worker/
src/index.ts
src/mcp/
src/github/
src/storage/
```

If any exist, report them as warnings.

This repository should not contain Cloudflare Worker MCP server source code.

---

### 7. Confirm MCP target metadata

Run validation through:

```powershell
npm.cmd run validate
```

Expected:

```text
Vault validation passed.
```

Also validate `.obsidian-mcp/vault.json` manually:

```powershell
node -e "JSON.parse(require('fs').readFileSync('.obsidian-mcp/vault.json', 'utf8')); console.log('vault.json valid')"
```

Expected:

```text
vault.json valid
```

Confirm `vault.json` includes:

```text
vaultId
displayName
language
defaultBranch
noteTypeRoutes
allowedWriteFolders
restrictedWriteFolders
readonlyFolders
forbiddenFolders
templates
mocPolicy
publish
```

Confirm `forbiddenFolders` includes:

```text
.git
.obsidian
node_modules
```

Confirm `publish` includes:

```text
default: false
field: dg-publish
requiresExplicitUserRequest: true
forbiddenAutoPublishTypes includes case
```

---

### 8. Confirm templates are safe

Confirm all templates include:

```yaml
dg-publish: false
```

Confirm `_templates/case.md` includes:

```yaml
privacy: private
```

Confirm no template includes:

```yaml
dg-publish: true
```

PowerShell check:

```powershell
Select-String -Path "_templates/*.md" -Pattern "dg-publish: true"
```

Expected:

```text
No results.
```

PowerShell check:

```powershell
Select-String -Path "_templates/*.md" -Pattern "dg-publish: false"
```

Expected:

```text
Every template should be listed.
```

---

### 9. Confirm package scripts

Confirm `package.json` includes:

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

Do not add external dependencies.

---

### 10. Confirm README has GitHub sync instructions

Ensure `README.md` includes a short section explaining the expected sync flow:

````markdown
## GitHub Sync Workflow

This repository is intended to be pushed to GitHub as the source of truth for the Obsidian vault.

Expected flow:

```text
ChatGPT
→ remote MCP server
→ GitHub API
→ this repository
→ local/mobile git pull
→ Obsidian
````

This repository should not contain remote MCP server source code.

````

Keep the update minimal.

---

### 11. Add optional manual GitHub setup notes

If useful, add a short section to `README.md`:

```markdown
## Initial GitHub Setup

After reviewing local changes:

```powershell
git status --short
npm.cmd run validate
git add .
git commit -m "chore: finalize GitHub-backed Obsidian vault"
````

Then create a GitHub repository named `ManualTherapyVault` and push:

```powershell
git remote add origin <YOUR_GITHUB_REPO_URL>
git branch -M main
git push -u origin main
```

````

Do not insert a real GitHub URL.

Use placeholder text.

---

## Out of Scope

Do not do any of the following in this task:

- Do not create Cloudflare Worker source code.
- Do not create `obsidian-mcp-server/`.
- Do not create `wrangler.jsonc`.
- Do not install packages.
- Do not start an MCP server.
- Do not create GitHub tokens.
- Do not store secrets.
- Do not create daily conversation ingestion folders.
- Do not create `_proposals/`.
- Do not create Docusaurus files.
- Do not create a Digital Garden website.
- Do not modify `.obsidian/` files.
- Do not create new manual therapy knowledge notes.
- Do not delete tracked files without explicit user approval.
- Do not commit changes unless explicitly asked.

---

## Acceptance Criteria

This task is complete when:

- [x] `README.md` clearly states this is the vault data repo.
- [x] `AGENTS.md` clearly states this is not the MCP server repo.
- [x] `.gitignore` ignores volatile Obsidian workspace files.
- [x] `.obsidian-mcp/vault.json` exists and is valid JSON.
- [x] `.obsidian-mcp/tool-policy.md` exists.
- [x] `_agent/remote-mcp-target.md` exists.
- [x] all templates include `dg-publish: false`.
- [x] case template includes `privacy: private`.
- [x] no `dg-publish: true` appears in templates.
- [x] no Cloudflare Worker source files exist in this repo.
- [x] no future conversation ingestion folders exist.
- [x] `npm.cmd run validate` passes.
- [x] `.obsidian/` files are not modified.
- [x] no secrets are present.
- [x] git status is reported.

---

## Manual Test Commands

Run:

```powershell
npm.cmd run validate
````

Expected:

```text
Vault validation passed.
```

Run:

```powershell
node -e "JSON.parse(require('fs').readFileSync('.obsidian-mcp/vault.json', 'utf8')); console.log('vault.json valid')"
```

Expected:

```text
vault.json valid
```

Run:

```powershell
Select-String -Path "_templates/*.md" -Pattern "dg-publish: true"
```

Expected:

```text
No results.
```

Run:

```powershell
git status --short
```

Report the result.

---

## Completion Report Required

After completing this task, report:

```text
Completed: todo/012-finalize-vault-repo-for-github-sync.md

Validation:
- npm.cmd run validate: passed / failed
- vault.json JSON validation: passed / failed
- dg-publish true in templates: found / not found

Repository role:
- README states vault data repo: yes / no
- AGENTS.md states not MCP server repo: yes / no

Git hygiene:
- .gitignore checked: yes / no
- .obsidian modified: yes / no
- test artifacts found: yes / no
- future conversation folders found: yes / no
- Worker server files found: yes / no

Modified files:
- ...

Warnings:
- ...

Recommended next steps:
- ...
```
