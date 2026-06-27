# Digital Garden Policy

## Purpose

This vault may later support Digital Garden publishing.

Publishing is a separate layer from note capture.

The remote MCP server and AI agents may help create or update private notes, but they must not automatically publish notes.

## Default Publishing Rule

All notes must default to:

```yaml
dg-publish: false
```

This applies to:

- core model notes
- technique notes
- body region notes
- case notes
- hypothesis notes
- glossary notes
- reference notes

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

- case notes
- private body observations
- raw personal reflections
- unreviewed hypotheses
- notes containing identifiable client information
- notes containing sensitive personal information
- notes with uncertain clinical claims written as if confirmed

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

- Does the note contain personal or client-identifying details?
- Does it contain private body observations?
- Does it overstate a hypothesis as fact?
- Does it imply diagnosis or treatment certainty?
- Does it need disclaimers or uncertainty markers?
- Is it appropriate for a public reader?

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
