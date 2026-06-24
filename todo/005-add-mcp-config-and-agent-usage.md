# 005 Add MCP Config and Agent Usage Guide

## Goal

Add MCP configuration examples and usage documentation for connecting an AI client / Codex / local agent to this Obsidian vault through filesystem access.

This task creates:

```text id="vhssyp"
_agent/mcp-config-example.json
_agent/mcp-usage.md
```

This task does **not** start or install the MCP server automatically.

It only documents the intended setup and adds safe configuration examples.

---

## Context

Previous tasks:

```text id="nx5xh8"
001-bootstrap-vault.md
Created the vault folder structure.

002-add-note-templates.md
Created reusable note templates.

003-add-package-and-validation.md
Created package.json and validation script.

004-implement-note-scripts.md
Created helper scripts for search, create-note, and append-note.
```

The target workflow is:

```text id="ly67dc"
User explicitly asks AI to write selected content into Obsidian
↓
AI client uses MCP filesystem access scoped only to this vault
↓
AI creates or appends Markdown notes
↓
Obsidian displays the updated files
↓
Git tracks changes
```

The first implementation is **command-based writing**, not automatic daily conversation ingestion.

---

## Required Files

Create:

```text id="vwp0h5"
_agent/mcp-config-example.json
_agent/mcp-usage.md
```

Optionally update:

```text id="mf1rx6"
README.md
```

Only update `README.md` if adding a short link or section pointing to `_agent/mcp-usage.md`.

Do not modify `.obsidian/`.

---

## File: `_agent/mcp-config-example.json`

Create a JSON file with both Windows and Mac/Linux examples.

The file should be valid JSON.

Since JSON cannot contain comments, use this structure:

```json id="hvjhkw"
{
  "description": "Example MCP filesystem server configuration for this Obsidian vault. Replace the placeholder paths with the real absolute vault path. Scope the filesystem server only to the ManualTherapyVault folder.",
  "windows": {
    "mcpServers": {
      "manual-therapy-vault": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-filesystem",
          "C:\\Users\\Gino\\Documents\\Obsidian\\ManualTherapyVault"
        ]
      }
    }
  },
  "mac_linux": {
    "mcpServers": {
      "manual-therapy-vault": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-filesystem",
          "/Users/gino/Documents/Obsidian/ManualTherapyVault"
        ]
      }
    }
  }
}
```

Important:

* Keep this as an example.
* Do not attempt to detect the user's real path.
* Do not write any machine-specific config outside this repo.
* Do not install any package.
* Do not run `npx`.
* Do not start a server.

---

## File: `_agent/mcp-usage.md`

Create a usage guide with the following content structure.

### Required Sections

```markdown id="c4c2un"
# MCP Usage Guide

## Purpose

## Recommended Architecture

## Filesystem Scope

## Setup Steps

## First Connection Test

## Write Command Examples

## Safety Rules

## Git Workflow

## Troubleshooting

## Out of Scope
```

---

## Required Content Details

### Purpose

Explain that MCP is used to give an AI client safe filesystem access to the Obsidian vault.

Clarify:

```text id="krm1lb"
MCP does not organize notes by itself.
The AI agent organizes notes.
The MCP filesystem server only provides controlled file access.
```

### Recommended Architecture

Include:

```text id="hm00hu"
AI client / Codex / local agent
→ MCP filesystem server
→ ManualTherapyVault folder
→ Obsidian displays Markdown files
→ Git tracks changes
```

### Filesystem Scope

Clearly state:

```text id="zycmdq"
The filesystem MCP server must be scoped only to the ManualTherapyVault folder.
```

Explicitly warn not to grant access to:

```text id="8deql7"
- the whole home directory
- Desktop
- Documents
- C drive
- unrelated repositories
```

### Setup Steps

Include high-level steps:

```text id="6r46n7"
1. Confirm the vault absolute path.
2. Copy the matching example from _agent/mcp-config-example.json.
3. Replace the placeholder path with the real vault path.
4. Add it to the chosen MCP-capable client.
5. Restart the client if needed.
6. Test read access first.
7. Test write access with a harmless test file.
```

Do not claim a specific client UI path unless known.

### First Connection Test

Include these test prompts:

```text id="cjryvd"
Please list the root directory of the ManualTherapyVault.
Do not modify any files.
```

Then:

```text id="tbdc1a"
Please create 60_Glossary/mcp-test.md with the content:

# MCP Test

MCP write access confirmed.

Do not modify any other files.
```

Then:

```text id="o77xep"
Please read 60_Glossary/mcp-test.md and report its content.
Do not modify any files.
```

Warn that test artifacts should be reviewed and either kept or removed manually.

### Write Command Examples

Include examples for real usage:

```text id="n4vfde"
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

And:

```text id="fbpcc3"
把剛剛的補充追加到 [[頭皮三層觸診模型]]。

要求：
- 先讀取既有筆記
- 在底部追加一個新段落
- 不要覆蓋原文
- 完成後回報修改檔案
```

### Safety Rules

Include:

```text id="l6hr5f"
- Do not delete files.
- Do not overwrite whole notes.
- Do not mass rename or move files.
- Do not edit .obsidian/.
- Do not edit outside this vault.
- Do not change hypothesis status to confirmed unless explicitly requested.
- Do not remove uncertainty markers.
```

### Git Workflow

Include:

```bash id="01jes0"
git status
git add .
git commit -m "Before AI write test"
```

After AI writes:

```bash id="71hd10"
git diff
git status
```

If good:

```bash id="l6vtvm"
git add .
git commit -m "Add MCP write test"
```

If bad:

```bash id="qagx4d"
git restore .
```

### Troubleshooting

Include common issues:

```text id="2vvo3k"
- MCP client cannot find npx
- wrong vault path
- server scoped to the wrong folder
- AI says it wrote files but no files appeared
- permission denied
- workspace.json keeps changing
```

For `workspace.json`, mention `.gitignore` should include:

```gitignore id="n3pcrh"
.obsidian/workspace*
```

### Out of Scope

State that this task does not implement:

```text id="bq05le"
- automatic daily conversation ingestion
- Docusaurus publishing
- Notion integration
- vector database
- custom UI
```

---

## Optional README Update

If updating `README.md`, add only a short section:

```markdown id="p8jq88"
## MCP Usage

See `_agent/mcp-usage.md` for MCP filesystem setup and safety rules.
```

Do not rewrite the whole README.

---

## Out of Scope

Do not do any of the following in this task:

* Do not install MCP packages.
* Do not run `npx`.
* Do not start an MCP server.
* Do not modify external client configuration.
* Do not create real knowledge notes.
* Do not create daily conversation ingestion folders.
* Do not create `_proposals/`.
* Do not create Docusaurus files.
* Do not create Notion integration.
* Do not modify `.obsidian/` files.
* Do not change existing scripts unless required by validation.

---

## Acceptance Criteria

This task is complete when:

* [ ] `_agent/mcp-config-example.json` exists.
* [ ] `_agent/mcp-config-example.json` is valid JSON.
* [ ] `_agent/mcp-config-example.json` includes Windows and Mac/Linux examples.
* [ ] `_agent/mcp-usage.md` exists.
* [ ] `_agent/mcp-usage.md` explains the purpose of MCP.
* [ ] `_agent/mcp-usage.md` warns to scope filesystem access only to the vault.
* [ ] `_agent/mcp-usage.md` includes first connection test prompts.
* [ ] `_agent/mcp-usage.md` includes real write command examples.
* [ ] `_agent/mcp-usage.md` includes Git workflow.
* [ ] Optional README update is minimal.
* [ ] `npm run validate` still passes.
* [ ] No `.obsidian/` files are modified.

---

## Manual Test Commands

After implementing this task, run:

```bash id="7lsqbr"
npm run validate
```

Expected:

```text id="2o9mjl"
Vault validation passed.
```

Validate JSON syntax:

```bash id="tx7wjd"
node -e "JSON.parse(require('fs').readFileSync('_agent/mcp-config-example.json', 'utf8')); console.log('JSON valid')"
```

Expected:

```text id="iq1gmx"
JSON valid
```

---

## Completion Report Required

After completing this task, report:

```text id="iihydx"
Completed: todo/005-add-mcp-config-and-agent-usage.md

Created files:
- _agent/mcp-config-example.json
- _agent/mcp-usage.md

Modified files:
- README.md, if changed

Validation:
- npm run validate: passed / failed
- JSON validation: passed / failed

Notes:
- ...
```
