# MCP Usage Guide

## Purpose

MCP is used to give an AI client safe filesystem access to this Obsidian vault.

MCP does not organize notes by itself.
The AI agent organizes notes.
The MCP filesystem server only provides controlled file access.

## Recommended Architecture

```text
AI client / Codex / local agent
→ MCP filesystem server
→ ManualTherapyVault folder
→ Obsidian displays Markdown files
→ Git tracks changes
```

## Filesystem Scope

The filesystem MCP server must be scoped only to the ManualTherapyVault folder.

Do not grant MCP filesystem access to:

- the whole home directory
- Desktop
- Documents
- C drive
- unrelated repositories

## Setup Steps

1. Confirm the vault absolute path.
2. Copy the matching example from `_agent/mcp-config-example.json`.
3. Replace the placeholder path with the real vault path.
4. Add it to the chosen MCP-capable client.
5. Restart the client if needed.
6. Test read access first.
7. Test write access with a harmless test file.

## First Connection Test

Read-only test:

```text
Please list the root directory of the ManualTherapyVault.
Do not modify any files.
```

Write test:

```text
Please create 60_Glossary/mcp-test.md with the content:

# MCP Test

MCP write access confirmed.

Do not modify any other files.
```

Read-back test:

```text
Please read 60_Glossary/mcp-test.md and report its content.
Do not modify any files.
```

Review test artifacts after testing. Keep them only if useful, or remove them manually.

## Write Command Examples

Create a new note:

```text
把剛剛討論的「頭皮三層觸診模型」整理進 Obsidian。

類型：hypothesis
位置：50_Hypotheses
要求：
- 建立新筆記
- 使用 hypothesis 模板
- 保留觀察 / 推測 / 尚未確認
- 加 backlinks：[[頭皮筋膜]]、[[頸椎角度]]、[[枕下肌]]、[[淺層傾聽]]
- 不要修改其他檔案
```

Append to an existing note:

```text
把剛剛的補充追加到 [[頭皮三層觸診模型]]。

要求：
- 先讀取既有筆記
- 在底部追加一個新段落
- 不要覆蓋原文
- 完成後回報修改檔案
```

## Safety Rules

- Do not delete files.
- Do not overwrite whole notes.
- Do not mass rename or move files.
- Do not edit .obsidian/.
- Do not edit outside this vault.
- Do not change hypothesis status to confirmed unless explicitly requested.
- Do not remove uncertainty markers.

## Git Workflow

Before AI write tests:

```bash
git status
git add .
git commit -m "Before AI write test"
```

After AI writes:

```bash
git diff
git status
```

If good:

```bash
git add .
git commit -m "Add MCP write test"
```

If bad:

```bash
git restore .
```

## Troubleshooting

- MCP client cannot find `npx`: confirm Node.js is installed and restart the client or terminal.
- Wrong vault path: use the absolute path to the `ManualTherapyVault` folder.
- Server scoped to the wrong folder: update the MCP config so only this vault is exposed.
- AI says it wrote files but no files appeared: check the configured path and client logs.
- Permission denied: check filesystem permissions and whether the client can access the folder.
- `workspace.json` keeps changing: `.gitignore` should include:

```gitignore
.obsidian/workspace*
```

## Out of Scope

This task does not implement:

- automatic daily conversation ingestion
- Docusaurus publishing
- Notion integration
- vector database
- custom UI
