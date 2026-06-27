# 011 Add Digital Garden Safety Policy

## Goal

Prepare `ManualTherapyVault` for possible future Digital Garden publishing while keeping all notes private by default.

This task does **not** set up a Digital Garden website.

This task only adds safe publishing metadata and policy.

The primary rule is:

```text
All notes must default to private.
No agent may auto-publish notes.
```

---

## Context

Previous architectural decisions:

```text
ManualTherapyVault = Obsidian vault / data repository
obsidian-mcp-server = separate remote MCP server repository, to be created later
```

Future possible publishing layer:

```text
ManualTherapyVault
→ selected notes with dg-publish: true
→ Digital Garden / static site
```

This must remain separate from the capture/write workflow:

```text
ChatGPT
→ remote MCP server
→ GitHub API
→ ManualTherapyVault
→ local/mobile git pull
→ Obsidian
```

The MCP write workflow should never auto-publish notes.

---

## Required Changes

### 1. Update all note templates

Update the following files:

```text
_templates/core-model.md
_templates/technique.md
_templates/body-region.md
_templates/case.md
_templates/hypothesis.md
_templates/glossary.md
_templates/reference.md
```

Each template frontmatter must include:

```yaml
dg-publish: false
```

Add it near the top of the YAML frontmatter, preferably after `status`.

Example:

```yaml
---
type: hypothesis
status: developing
dg-publish: false
created: {{date}}
updated: {{date}}
...
---
```

Do not set `dg-publish: true` in any template.

---

### 2. Case template must stay private by default

In `_templates/case.md`, make sure the frontmatter includes:

```yaml
dg-publish: false
privacy: private
```

If `privacy` does not exist, add it.

Case notes may contain client observations or session details, so they must never be auto-published.

---

### 3. Hypothesis template must stay unpublished by default

In `_templates/hypothesis.md`, make sure the frontmatter includes:

```yaml
dg-publish: false
```

Do not add `privacy: public`.

Developing hypotheses should remain private unless explicitly converted into a publishable essay by the user.

---

### 4. Add `_agent/digital-garden-policy.md`

Create:

```text
_agent/digital-garden-policy.md
```

Content:

````markdown
# Digital Garden Policy

## Purpose

This vault may later support Digital Garden publishing.

Publishing is a separate layer from note capture.

The remote MCP server and AI agents may help create or update private notes, but they must not automatically publish notes.

## Default Publishing Rule

All notes must default to:

```yaml
dg-publish: false
````

This applies to:

* core model notes
* technique notes
* body region notes
* case notes
* hypothesis notes
* glossary notes
* reference notes

## Explicit Permission Required

An agent may set:

```yaml
dg-publish: true
```

only when the user explicitly asks to publish a note.

Valid examples:

```text
這篇可以公開到 Digital Garden
把這篇設成 dg-publish: true
發布這篇筆記
```

Ambiguous examples are not enough:

```text
這篇整理得很好
這篇可以留下
這篇進正式 vault
```

"Approved for vault inclusion" does not mean "approved for public publishing."

## Forbidden Auto-Publish Types

The agent must never automatically publish:

* case notes
* private body observations
* raw personal reflections
* unreviewed hypotheses
* notes containing identifiable client information
* notes containing sensitive personal information
* notes with uncertain clinical claims written as if confirmed

## Case Notes

Case notes must remain:

```yaml
dg-publish: false
privacy: private
```

Case notes should not be published unless they are transformed into a fully anonymized teaching case and the user explicitly requests publication.

## Hypothesis Notes

Hypothesis notes must remain unpublished by default.

A hypothesis can only be published if:

1. the user explicitly asks to publish it
2. uncertainty markers are preserved
3. it is not written as clinical certainty
4. it does not contain private case information

## Public Writing Safety

Before setting `dg-publish: true`, check:

* Does the note contain personal or client-identifying details?
* Does it contain private body observations?
* Does it overstate a hypothesis as fact?
* Does it imply diagnosis or treatment certainty?
* Does it need disclaimers or uncertainty markers?
* Is it appropriate for a public reader?

If uncertain, ask the user before publishing.

## MCP Server Policy

Remote MCP tools must not expose an "auto publish" behavior.

The MCP server may support a future `setPublishStatus` or `updateFrontmatter` tool, but it must require explicit user instruction.

The default create and append tools must always preserve or create:

```yaml
dg-publish: false
```

## Digital Garden Is a Publishing Layer

Digital Garden is not the primary storage layer.

Primary storage remains:

```text
ManualTherapyVault Git repository
```

Publishing flow, if later implemented:

```text
Private Obsidian note
→ user marks dg-publish: true
→ Digital Garden plugin / static site generator
→ public website
```

````

---

### 5. Update `_agent/instructions.md`

Add a short section:

```markdown
## Digital Garden Safety

All new notes should default to:

```yaml
dg-publish: false
````

Do not set `dg-publish: true` unless the user explicitly asks to publish a note.

Case notes and private observations must not be auto-published.

See `_agent/digital-garden-policy.md`.

````

Keep the update minimal.

---

### 6. Update `_agent/safety-rules.md`

Add a short section:

```markdown
## Publish Safety

The agent must not auto-publish notes.

All created notes should default to:

```yaml
dg-publish: false
````

The agent must not set `dg-publish: true` unless explicitly requested by the user.

Case notes must remain private by default.

````

Keep the update minimal.

---

### 7. Update `.obsidian-mcp/vault.json`

If `.obsidian-mcp/vault.json` exists, update its `publish` section.

Expected publish section:

```json
"publish": {
  "default": false,
  "field": "dg-publish",
  "requiresExplicitUserRequest": true,
  "forbiddenAutoPublishTypes": [
    "case"
  ]
}
````

If `publish` already exists, merge these fields without removing other useful fields.

Do not add secrets.

---

### 8. Update validation script

Update:

```text
_scripts/validate-vault.mjs
```

Add validation checks:

1. `_agent/digital-garden-policy.md` exists.
2. Every required template includes `dg-publish: false`.
3. `_templates/case.md` includes `privacy: private`.
4. `.obsidian-mcp/vault.json` publish section exists.
5. `.obsidian-mcp/vault.json` publish.default is `false`.
6. `.obsidian-mcp/vault.json` publish.field is `"dg-publish"`.
7. `.obsidian-mcp/vault.json` publish.requiresExplicitUserRequest is `true`.
8. `.obsidian-mcp/vault.json` publish.forbiddenAutoPublishTypes includes `"case"`.

If `.obsidian-mcp/vault.json` does not exist, report the existing validation error from the previous task.

---

## Out of Scope

Do not do any of the following in this task:

* Do not install Digital Garden plugin.
* Do not create a Digital Garden website.
* Do not create GitHub Pages / Cloudflare Pages / Netlify config.
* Do not create Docusaurus files.
* Do not set `dg-publish: true` anywhere.
* Do not publish any note.
* Do not modify existing real notes unless required for validation.
* Do not create new manual therapy knowledge notes.
* Do not modify `.obsidian/`.
* Do not create Cloudflare Worker source files.
* Do not store secrets.

---

## Acceptance Criteria

This task is complete when:

* [x] All templates include `dg-publish: false`.
* [x] `_templates/case.md` includes `privacy: private`.
* [x] `_agent/digital-garden-policy.md` exists.
* [x] `_agent/instructions.md` mentions Digital Garden safety.
* [x] `_agent/safety-rules.md` mentions publish safety.
* [x] `.obsidian-mcp/vault.json` publish policy requires explicit user request.
* [x] `.obsidian-mcp/vault.json` forbids auto-publishing case notes.
* [x] `validate-vault.mjs` checks Digital Garden safety metadata.
* [x] `npm.cmd run validate` passes.
* [x] No `dg-publish: true` is introduced.
* [x] No `.obsidian/` files are modified.
* [x] No publishing site files are created.

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

Search for accidental publishing:

```powershell
Select-String -Path "_templates/*.md" -Pattern "dg-publish: true"
```

Expected:

```text
No results.
```

Search for required default publishing metadata:

```powershell
Select-String -Path "_templates/*.md" -Pattern "dg-publish: false"
```

Expected:

```text
Each template should be listed.
```

Check Git status:

```powershell
git status --short
```

Expected modified or created files may include:

```text
_templates/core-model.md
_templates/technique.md
_templates/body-region.md
_templates/case.md
_templates/hypothesis.md
_templates/glossary.md
_templates/reference.md
_agent/digital-garden-policy.md
_agent/instructions.md
_agent/safety-rules.md
.obsidian-mcp/vault.json
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
Completed: todo/011-add-digital-garden-safety-policy.md

Created files:
- _agent/digital-garden-policy.md

Modified files:
- _templates/core-model.md
- _templates/technique.md
- _templates/body-region.md
- _templates/case.md
- _templates/hypothesis.md
- _templates/glossary.md
- _templates/reference.md
- _agent/instructions.md
- _agent/safety-rules.md
- .obsidian-mcp/vault.json
- _scripts/validate-vault.mjs

Validation:
- npm.cmd run validate: passed / failed

Safety checks:
- dg-publish true introduced: yes / no
- case template privacy private: yes / no
- .obsidian modified: yes / no

Notes:
- ...
```
