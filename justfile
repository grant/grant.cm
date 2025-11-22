default:
  @just --list

install:
  cd frontend && pnpm i
  cd scripts && pnpm i

dev:
  cd frontend && pnpm run dev
lint:
  cd frontend && pnpm run lint
fix:
  cd frontend && pnpm run fix

clean:
  cd frontend && pnpm run clean
build:
  cd frontend && pnpm run build

stage:
  cd frontend && pnpm run stage
deploy:
  cd frontend && pnpm run deploy

scripts *SCRIPT:
  cd scripts && pnpm run {{SCRIPT}}
