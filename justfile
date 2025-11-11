default:
  @just --list

install:
  cd frontend && npm i

dev:
  cd frontend && npm run dev
lint:
  cd frontend && npm run lint
fix:
  cd frontend && npm run fix

clean:
  cd frontend && npm run clean
build:
  cd frontend && npm run build

stage:
  cd frontend && npm run stage
deploy:
  cd frontend && npm run deploy
