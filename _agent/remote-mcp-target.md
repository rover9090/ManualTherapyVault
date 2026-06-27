# Remote MCP Target Vault

## Purpose

This repository is the Obsidian vault data repository for the user's manual therapy knowledge system.

It is intended to be readable and writable by a separate remote MCP server through GitHub API.

This repository is not the remote MCP server implementation.

The remote MCP server should live in a separate repository, for example:

```text
obsidian-mcp-server/
```

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

- storing Markdown notes
- storing Obsidian-compatible folder structure
- storing note templates
- storing agent and safety policies
- exposing vault metadata through `.obsidian-mcp/vault.json`
- documenting tool policy through `.obsidian-mcp/tool-policy.md`

This repository is not responsible for:

- hosting the MCP server
- storing GitHub API tokens
- storing Cloudflare secrets
- implementing Cloudflare Worker source code
- exposing public HTTP endpoints

## Remote MCP Server Responsibilities

The remote MCP server is responsible for:

- authenticating requests
- connecting to GitHub API
- enforcing server-side path safety
- reading notes
- creating notes
- appending notes
- optionally searching notes
- committing changes to this repository
- reporting created and modified files

## Local MCP Optional Flow

Local MCP filesystem access may still be useful in the future for:

- full-vault analysis
- large refactors
- local-only workflows
- direct filesystem access when ChatGPT supports local MCP

Local MCP documentation is stored in:

```text
_agent/local-mcp-usage.md
_agent/local-mcp-config-example.json
```

## Security Notes

The remote MCP server must not trust this repository as the only security boundary.

The server must enforce its own allowlist for:

- allowed vault IDs
- allowed repositories
- allowed write folders
- forbidden folders
- supported note types

Never store secrets in this repository.
