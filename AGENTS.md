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

Notes:

- The dev server runs on port `3000`. The production `start` script uses port
  `8080` (the top-level README's quickstart mentions 8080, which is the
  production port, not `dev`).
- `scripts/` needs Google Cloud credentials (`GOOGLE_APPLICATION_CREDENTIALS`)
  to run against real services. These are not required for frontend development.

## CI

`.github/workflows/` runs lint and build against `frontend/` only. The
`scripts/` package is not covered by CI and currently has pre-existing lint
errors; don't treat those as introduced by unrelated changes.

## Generated files

- `next dev` auto-generates `frontend/AGENTS.md` and `frontend/CLAUDE.md` in the
  frontend directory. These are gitignored — do not edit or commit them. This
  root `AGENTS.md` is the canonical guidance file.

## Testing preferences

- Do not produce screen recordings unless explicitly requested; they take too
  long. Prefer screenshots and command/log output as evidence.
