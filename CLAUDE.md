# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Garden is a personal AI knowledge base built with **Obsidian** for writing and **Quartz 4** for publishing as a static site with backlinks, graph view, and full-text search.

**Two-repository architecture:**

- **Writing repository** (Gitee `MeverikC/ai-garden-contents`): Content-only repository optimized for fast multi-device sync in China. This is the single source of truth. Vault root = repository root.
- **Site repository** (this repository): Quartz engine + content copy + CI/CD. Content in `content/` is synced from Gitee via GitHub Actions.

**Sync is unidirectional:** Gitee → GitHub. Direct edits to `content/` in this repository will be overwritten on the next sync (max 1 hour interval).

## Development Commands

```bash
# Local development
npm ci                          # Install dependencies (lockfile-based)
npm run dev                     # Serve at http://localhost:8080 with hot reload
npx quartz build --serve --port 3000  # Use custom port

# Build and validation
npm run build                   # Build to public/
node scripts/check-content.mjs  # Validate structure, links, anchors, redirects

# Code quality
npm run check                   # TypeScript type check + Prettier format check
npm run format                  # Auto-format code (excludes content/)

# Content sync (emergency only)
./scripts/push-vault.sh         # Sync content/ → Gitee and push
./scripts/push-vault.sh -n      # Dry run (show changes without committing)

# Deployment
gh workflow run deploy.yaml -R Ryn-Mic/ai-garden  # Trigger immediate publish
```

## Repository Structure

```
ai-garden/
├── content/                    # Content copy synced from Gitee (DO NOT edit directly)
│   ├── index.md                # Homepage
│   ├── series/                 # 01-05 ordered learning paths
│   ├── tutorials/              # Step-by-step guides (basics/software/skills/mcp/development)
│   ├── toolbox/                # Skill/MCP tool documentation (skills/mcp)
│   ├── concepts/               # Standalone knowledge nodes referenced by series
│   ├── research/               # Analysis, products, comparisons, papers
│   ├── maintenance/            # Writing, sync, deployment, and project records
│   ├── assets/                 # Images and materials
│   ├── templates/              # Obsidian templates (not published)
│   └── .obsidian/              # Obsidian configuration (versioned)
│
├── quartz/                     # Quartz framework source code
├── scripts/
│   ├── check-content.mjs       # Content structure validator (required before publish)
│   └── push-vault.sh           # Emergency content push script
│
├── .vault-cache/               # Script workspace for push-vault.sh (gitignored)
├── quartz.config.ts            # Site configuration (title, baseUrl, theme, plugins)
├── quartz.layout.ts            # Page layout configuration
└── package.json
```

## Architecture

### Content Organization

**Two-layer structure:**

1. **Primary content** lives in type-based directories (`tutorials/`, `toolbox/`, `concepts/`, `research/`)
2. **Learning sequences** in `series/` reference primary content with `1 → 2 → 3` ordering

Each series specifies:

- `sequence`: ordered array of main-path documents
- `knowledge_points`: supplementary concept nodes for fill-in learning
- Station headings (`### 1.`, `### 2.`, etc.) that match sequence indices

**Content does not duplicate.** Old directory structures use `aliases` frontmatter for URL compatibility.

### Sync Mechanism

`.github/workflows/deploy.yaml` triggers on:

- Push to `main` branch
- Hourly cron (`17 * * * *`)
- Manual `workflow_dispatch`

**Single workflow design:** Combined sync + build + deploy prevents the `GITHUB_TOKEN` push triggering issue (GITHUB_TOKEN commits don't trigger other workflows).

Gitee fetch failures emit warnings but don't block builds — existing `content/` is used as fallback.

### Publishing Pipeline

1. Sync Gitee → `content/`
2. Quartz transforms markdown → static HTML with:
   - Absolute path wikilink resolution (`[[concepts/Skill]]`)
   - Alias-based redirects
   - Search index and graph data generation
3. Deploy to GitHub Pages via `actions/deploy-pages`

## Configuration

### Critical Settings Already Set

`quartz.config.ts`:

- `baseUrl: "Ryn-Mic.github.io/ai-garden"` — matches GitHub Pages project site
- `locale: "zh-CN"` — Chinese language site
- `ignorePatterns: ["private", "templates", ".obsidian"]` — excludes non-content
- `markdownLinkResolution: "absolute"` — matches Obsidian absolute link format

Obsidian (`.obsidian/app.json`):

- New link format: `absolute` (full vault paths)
- Attachment folder: `assets`
- Template folder: `templates`

### When Changing Deployment Target

| Target                    | baseUrl value                                      |
| ------------------------- | -------------------------------------------------- |
| GitHub Pages project site | `username.github.io/repo-name`                     |
| GitHub Pages user site    | `username.github.io`                               |
| Custom domain             | `your.domain.com` (no protocol, no trailing slash) |

## Content Standards

### Frontmatter Requirements

Every markdown file (except `index.md` files) must include:

```yaml
---
title: "Page Title"
type: tutorial | tool-note | concept | research | agent | comparison | resource | series | project
tags: [tag1, tag2]
track: toolbox | guides | research | meta
audience: non-programmer | practitioner | developer | maintainer
difficulty: beginner | intermediate | advanced
status: seedling | growing | evergreen
---
```

Required tag patterns:

- `track/<track-value>` (e.g., `track/toolbox`)
- `level/<difficulty>` (e.g., `level/beginner`)

Required admonition in content body:

```markdown
> [!info] 阅读定位
> (Visible reading level description)
```

### Linking Conventions

- Use **complete vault paths** with display text: `[[concepts/Skill|Skill]]`
- Do NOT use leading slashes or bare names (causes disambiguation issues with old aliases)
- Assets: `[[assets/image.png]]`
- Interactive HTML diagrams: keep the HTML in the **writing vault** and use a complete vault path with straight quotes, e.g. `<iframe src="assets/diagram.html" title="Diagram"></iframe>`. Do not use a bare filename or a site-root URL. Quartz preserves `.html` for these assets and iframe URLs so GitHub Pages serves `text/html`. Run the full content validator to catch missing iframe targets before publishing.
- Anchors: `[[tutorials/basics/first-task#section|Section]]`

### Series Navigation

Pages referenced by series must include bidirectional navigation:

```markdown
<!-- series-navigation:start -->

← [[series/01-日常AI入门|返回系列 01]] | [[series/02-把工作流程变成Skill|下一系列]] →

<!-- series-navigation:end -->
```

## Validation Rules

`scripts/check-content.mjs` enforces:

1. **Structure:**
   - All content in approved root directories
   - Required frontmatter fields present and valid
   - Type matches directory (e.g., `concepts/` contains `type: concept`)

2. **Connectivity:**
   - Every page reachable from `index.md` via wikilinks
   - No orphaned pages
   - Parent `index.md` exists for every subdirectory

3. **Links:**
   - All wikilinks resolve to existing pages or assets
   - No references to old alias paths (must use current paths)
   - Anchor fragments point to valid heading IDs

4. **Series integrity:**
   - Series numbered 01-05 without gaps
   - `sequence` matches visible station headings
   - All sequence/knowledge_points referenced in content
   - Bidirectional navigation present in referenced pages

5. **Build artifacts:**
   - Generated HTML exists for every markdown page
   - Alias redirects reach correct targets
   - Assets copied identically to `public/`
   - Internal links and anchors valid in HTML

Run validation before committing content changes: `npm run build && node scripts/check-content.mjs`

## Common Workflows

### Editing Content (Primary Method)

**DO NOT edit `content/` in this repository.** Edit in the Obsidian vault instead:

**On Mac:**

```bash
cd "$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai-garden"
# Edit in Obsidian
git add -A && git commit -m "note: description" && git push
```

The site rebuilds automatically within 1 hour. For immediate publish: `gh workflow run deploy.yaml -R Ryn-Mic/ai-garden`

**On non-iCloud machines:**

```bash
git clone https://gitee.com/MeverikC/ai-garden-contents.git ai-garden-vault
# Open in Obsidian, edit, commit, push
```

### Emergency: Pushing Local content/ Changes Upstream

If you must edit `content/` in this repo and sync back to Gitee:

```bash
./scripts/push-vault.sh     # Syncs content/ → .vault-cache/ → Gitee
./scripts/push-vault.sh -n  # Dry run
```

Script uses `.vault-cache/` as workspace and refuses to run if cache is dirty (prevents data loss).

### Adding New Content

1. Create file in appropriate `content/` subdirectory with full frontmatter
2. Add required reading level admonition
3. Link from at least one existing `index.md` (prevent orphans)
4. Use absolute vault paths for all wikilinks
5. Run validation: `npm run build && node scripts/check-content.mjs`
6. If adding to series, update series `sequence`/`knowledge_points` and add return navigation

### Testing Configuration Changes

1. Edit `quartz.config.ts` or `quartz.layout.ts`
2. `npm run check` (TypeScript + format validation)
3. `npm run dev` (verify locally)
4. `npm run build && node scripts/check-content.mjs` (full validation)
5. Commit and push to trigger deployment

## Environment Requirements

- Node.js >= 22 (specified in `package.json` engines)
- npm >= 10.9.2

The repository includes `.node-version` file for version managers.

## Notes for AI Assistants

- This repo contains the **publishing engine**, not the content source
- When asked to edit content: explain the two-repo architecture and guide to Obsidian vault
- `push-vault.sh` is for emergency recovery only, not normal workflow
- Validation script is critical — content must pass before publishing
- Series structure is complex: verify `sequence`, headings, navigation, and knowledge_points stay synchronized
- Alias redirects handle legacy URLs — don't suggest deleting old `aliases:` frontmatter without verifying impact
