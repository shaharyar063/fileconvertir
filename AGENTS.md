# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

QuickConvert is a browser-based file converter (React + Vite + TypeScript). All conversions run client-side via Canvas API, FFmpeg.wasm, JSZip, jsPDF, pdf.js, etc. No backend, database, or Docker is required.

### Running services

- **Dev server**: `pnpm dev` — starts Vite on port 5000. See `package.json` for all scripts.
- **Hosting**: Cloudflare Pages (static `dist/`). `public/_headers` sets COOP/COEP for FFmpeg.wasm.

### Non-obvious caveats

- The Vite dev server sets `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers (in `vite.config.ts`) for SharedArrayBuffer support required by FFmpeg.wasm.
- ESLint shows one harmless `react-refresh/only-export-components` warning (in `use-theme.tsx`). `pnpm lint` exits 0.
- The project uses `pnpm` (lockfile: `pnpm-lock.yaml`). `package-lock.json` is git-ignored and not used.
- Audio/video conversions load FFmpeg.wasm from a pinned `unpkg.com` URL at runtime (not bundled in `dist/` — `ffmpeg-core.wasm` exceeds Cloudflare Pages' 25 MiB per-file limit). Requires internet access. Self-host: `FFMPEG_SELF_HOST=1 pnpm copy-ffmpeg` and `VITE_FFMPEG_BASE_URL=/ffmpeg`.
