# Manual Therapy Vault

This is an Obsidian vault for the user's manual therapy knowledge system.

The MVP goal is command-based AI writing into Obsidian Markdown notes through Codex / MCP / local filesystem access.

Daily conversation ingestion is a later phase, not the first milestone.

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

Local filesystem MCP usage is optional and documented in:

```text
_agent/local-mcp-usage.md
```
