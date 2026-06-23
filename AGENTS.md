# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
Single product: **Cookie Design Studio**, a frontend-only React 19 + Vite 7 + TypeScript marketing/showcase SPA (content in Chinese). It is an npm-workspaces monorepo with one shared package `packages/ui` (`@cookie-design-studio/ui`). There is **no backend, database, API, auth, or environment variables** — everything is self-contained static frontend.

### Running the app (dev)
- Start the dev server with `npm run dev` (see `package.json`). It serves on `http://localhost:5173` and does **not** bind `--host` by default; use `npm run preview:host` (port 4173) only when you need network exposure for the built output.
- `vite.config.ts` aliases `@cookie-design-studio/ui` directly to `packages/ui/src/index.ts`, so the dev server resolves the UI package **from source**. You do NOT need to run `npm run build:ui` before `npm run dev`.

### Lint / test / build
- There are **no lint and no test scripts** in this repo (no ESLint config, no test runner). Do not assume `npm test` / `npm run lint` exist.
- Build: `npm run build` (`tsc -b && vite build`) — this is the de facto type-check + bundle step. The Vite build prints a >500 kB chunk warning (the Three.js bundle); this is expected and not an error.

### Gotchas
- `public/` contains large media (videos/images); the README notes the built `dist/` is ~300 MB. Builds and the hero showreel video can be slow on first load — this is normal.
