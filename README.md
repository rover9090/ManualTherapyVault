# Manual Therapy Vault

This is an Obsidian vault data repository for the user's manual therapy knowledge system.

The remote MCP server is implemented and operated outside this repository.

This repository should contain vault data, note templates, and vault metadata only. It should not contain MCP server source code, Cloudflare Worker code, API tokens, or secrets.

The portable control contract for external MCP tools is:

```text
.obsidian-mcp/vault.json
_templates/
```

## Remote MCP Workflow

This repository is the Obsidian vault data repository.

The remote MCP server should live in a separate repository, such as:

```text
obsidian-mcp-server/
```

Expected primary flow:

```text
ChatGPT
→ remote MCP server
→ GitHub API
→ this repository
→ local/mobile git pull
→ Obsidian
```

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
```

This repository should not contain remote MCP server source code.

## Initial GitHub Setup

After reviewing local changes:

```powershell
git status --short
git add .
git commit -m "chore: finalize GitHub-backed Obsidian vault"
```

Then create a GitHub repository named `ManualTherapyVault` and push:

```powershell
git remote add origin <YOUR_GITHUB_REPO_URL>
git branch -M main
git push -u origin main
```
