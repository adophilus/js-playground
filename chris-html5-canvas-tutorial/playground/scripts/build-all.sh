#! /usr/bin/env bash


pnpm build 001_canvas --out-dir ../dist/001_canvas --config vite.config.ts
pnpm build 002_drawing --out-dir ../dist/002_drawing --config vite.config.ts
pnpm build 003_animations --out-dir ../dist/003_animations --config vite.config.ts
pnpm build 004_events --out-dir ../dist/004_events --config vite.config.ts
pnpm build --out-dir ../dist --config vite.config.ts