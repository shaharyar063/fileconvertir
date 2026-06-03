import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { existsSync, rmSync } from "fs";
import { join } from "path";
import type { Plugin } from "vite";
import { sitemapPlugin } from "./plugins/vite-sitemap";
import { prerenderMetaPlugin } from "./plugins/vite-prerender-meta";

/** ffmpeg-core.wasm exceeds Cloudflare Pages' 25 MiB per-file limit */
function stripFfmpegFromDistPlugin(): Plugin {
  let outDir = "dist";
  return {
    name: "strip-ffmpeg-dist",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const ffmpegDir = join(outDir, "ffmpeg");
      if (existsSync(ffmpegDir)) {
        rmSync(ffmpegDir, { recursive: true, force: true });
        console.log(
          "[strip-ffmpeg-dist] Removed dist/ffmpeg/ (use CDN; wasm exceeds Cloudflare 25 MiB limit)"
        );
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
  },
  plugins: [react(), sitemapPlugin(), prerenderMetaPlugin(), stripFfmpegFromDistPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
