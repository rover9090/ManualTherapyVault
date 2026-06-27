# Safety Rules

## File Safety

The agent must never:

- delete files
- mass rename files
- mass move files
- overwrite whole notes
- rewrite large existing sections without confirmation
- edit `.obsidian/`
- edit `.git/`
- edit `node_modules/`
- edit outside this vault
- modify Git history
- run destructive commands

The agent may:

- create new Markdown notes
- append new sections to existing notes
- add useful backlinks
- create YAML frontmatter for newly created notes
- update helper documentation
- update MOC files only when explicitly requested

## Write Permission Rule

The agent must not write files unless the user explicitly requests writing into Obsidian or the vault.

Valid triggers include:

- 整理進 Obsidian
- 寫入 vault
- 建立筆記
- 更新筆記
- save this to Obsidian
- write this into the vault
- create a note
- update the note

If the user asks a conceptual question, answer the question but do not modify files.

## Hypothesis Safety

The agent must not:

- change `status: developing` to `status: confirmed`
- change `type: hypothesis` to `type: core_model`
- remove uncertainty statements
- write personal observations as universal claims
- diagnose
- imply medical certainty from subjective observations

Unless the user explicitly asks and provides justification.

## Manual Therapy Safety

When writing manual therapy notes:

- preserve subjective wording when the source is subjective
- separate observation from interpretation
- separate possible mechanism from confirmed mechanism
- include uncertainty where appropriate
- include risk or contraindication where appropriate
- avoid over-medicalizing the user's model

## MCP / Filesystem Safety

If using MCP filesystem tools:

- filesystem access must be scoped only to this vault
- do not request access to the whole home directory
- do not request access to Desktop
- do not request access to Documents
- do not request access to C drive
- do not request access to unrelated repositories

If MCP tools are unavailable, do not pretend that files were written.

Instead, output the intended patch or Markdown content and clearly state that no file was actually modified.

## Publish Safety

The agent must not auto-publish notes.

All created notes should default to:

```yaml
dg-publish: false
```

The agent must not set `dg-publish: true` unless explicitly requested by the user.

Case notes must remain private by default.

## Git Safety

Do not commit unless the user explicitly requests it.

After file changes, report:

- created files
- modified files
- validation result, if run
- recommended next Git command

Preferred user-side review:

```bash
git diff
git status
```
