# AGENTS.md

Guidance for AI agents and contributors working in this repository.

## Overview

`grant.cm` is a monorepo with two independent packages, each managing its own
dependencies with pnpm and orchestrated from the root `justfile`:

- `frontend/` — the Next.js (Pages Router) website. This is the main app.
- `scripts/` — Google Cloud utilities (Medium data sync, Google Doc → PDF
  resume sync). Deploy/automation tooling, not part of the website.

## Toolchain

- Node 22, pnpm `9.15.9` (pinned via `packageManager`), and `just` (task runner).
- Install `just` if missing (e.g. `apt-get install -y just`).

## Common commands

Run from the repo root:

- Install deps: `just install`
- Dev server: `just dev` → serves at http://localhost:3000
- Lint: `just lint` (fix: `just fix`)
- Production build: `just build`
- Run a scripts package script: `just scripts <script>` (e.g. `just scripts sync-resume`)
- Upload a screenshot for an issue:
  `just upload-screenshot <image> --issue <id>`

Notes:

- The dev server runs on port `3000`. The production `start` script uses port
  `8080` (the top-level README's quickstart mentions 8080, which is the
  production port, not `dev`).
- `scripts/` needs Google Cloud credentials (`GOOGLE_APPLICATION_CREDENTIALS`)
  to run against real services. These are not required for frontend development.
- Screenshot assets belong in Google Cloud Storage, never in Git or Git LFS.
  Follow `docs/issue-assets.md`; GCP credentials must come from Cursor Cloud
  Agent environment secrets or Application Default Credentials.

## CI

`.github/workflows/` runs on push:

- `lint` / `build` — frontend lint (`gts lint`) and Next.js build.
- `checks` — typecheck (frontend `tsc --noEmit`, scripts `tsc`) and `scripts` lint.
- `test` — the frontend Vitest suite.
- `deploy` — deploys the changed package(s) to Cloud Run on push to `main`.

## Generated files

- `next dev` auto-generates `frontend/AGENTS.md` and `frontend/CLAUDE.md` in the
  frontend directory. These are gitignored — do not edit or commit them. This
  root `AGENTS.md` is the canonical guidance file.

## Dependency upgrades

- Batch routine dependency/version bumps into a single PR rather than one per
  package — it's faster to review and land.
- Split into separate PRs only for high-risk migrations (e.g. major framework
  upgrades like Tailwind) or upgrades that must be validated/landed
  independently or that are entangled/blocked.

## Testing preferences

- Do not produce screen recordings unless explicitly requested; they take too
  long. Prefer screenshots and command/log output as evidence.
