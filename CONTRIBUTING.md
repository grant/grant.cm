# Contributing to grant.cm

Thanks for your interest in improving [grant.cm](https://grant.cm)!

## Prerequisites

- Node.js (see [`.nvmrc`](./.nvmrc))
- [pnpm](https://pnpm.io/) `9.15.9` (pinned via `packageManager`)
- [`just`](https://github.com/casey/just) (task runner) — `brew install just`

## Getting started

```sh
just install   # install dependencies for both packages
just dev       # start the frontend dev server at http://localhost:3000
```

## Common commands

| Command | Description |
| --- | --- |
| `just dev` | Start the frontend in development mode (port 3000). |
| `just lint` | Lint the frontend. |
| `just fix` | Auto-fix lint/formatting issues. |
| `just build` | Build the frontend. |
| `just scripts <script>` | Run a script from the `scripts/` package. |

## Project layout

- `frontend/` — the Next.js (Pages Router) website.
- `scripts/` — Google Cloud utilities (deploy/automation tooling).

## Pull requests

- Keep PRs focused and reasonably small.
- Ensure `just lint` and `just build` pass before opening a PR.
- Use clear, conventional commit messages (e.g. `fix(home): ...`, `feat(experience): ...`).
- Deploys happen automatically from `main` via GitHub Actions once merged.
