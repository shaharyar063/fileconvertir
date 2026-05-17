# AGENTS.md nxnxhjjfhffh

## Cursor Cloud specific instructions

### Project overview

QuickConvert is a browser-based file converter (React + Vite + TypeScript). All conversions run client-side via Canvas API, FFmpeg.wasm, JSZip, jsPDF, pdf.js, etc. No backend, database, or Docker is required.

### Running services

- **Dev server**: `npm run dev` — starts Vite on port 5000. See `package.json` for all scripts.
- **Hosting**: Cloudflare Pages (static `dist/`). `public/_headers` sets COOP/COEP for FFmpeg.wasm.

### Non-obvious caveats

- The Vite dev server sets `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers (in `vite.config.ts`) for SharedArrayBuffer support required by FFmpeg.wasm.
- ESLint shows 7 warnings (all from auto-generated shadcn/ui components). These are harmless `react-refresh/only-export-components` warnings. `npm run lint` exits 0.
- The `bun.lockb` file does not exist; the project uses `npm` (lockfile: `package-lock.json`).
- Audio/video conversions load FFmpeg.wasm from `unpkg.com` CDN at runtime, requiring internet access.
