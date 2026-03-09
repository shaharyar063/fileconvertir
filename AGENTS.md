# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

QuickConvert is a browser-based file converter (React + Vite + TypeScript). Most conversions run client-side via Canvas API, FFmpeg.wasm, JSZip, jsPDF, etc. A Supabase Edge Function handles conversions that can't run in the browser. No local database or Docker is required.

### Running services

- **Dev server**: `npm run dev` — starts Vite on port 8080. See `package.json` for all scripts.
- **Supabase**: The app uses a hosted Supabase instance (configured in `.env`). No local Supabase setup needed for frontend development.

### Non-obvious caveats

- The Vite dev server sets `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers (in `vite.config.ts`) for SharedArrayBuffer support required by FFmpeg.wasm.
- ESLint has pre-existing errors in the codebase (7 errors, 7 warnings) — these are in auto-generated shadcn/ui components and the Supabase edge function. `npm run lint` exits non-zero because of these.
- The `bun.lockb` file does not exist; the project uses `npm` (lockfile: `package-lock.json`).
- Audio/video conversions load FFmpeg.wasm from `unpkg.com` CDN at runtime, requiring internet access.
