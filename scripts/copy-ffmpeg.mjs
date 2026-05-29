import { cpSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Cloudflare Pages rejects files > 25 MiB; ffmpeg-core.wasm is ~31 MiB.
if (process.env.FFMPEG_SELF_HOST !== '1') {
  console.log('[copy-ffmpeg] Skipped (set FFMPEG_SELF_HOST=1 to copy into public/ffmpeg/)');
  process.exit(0);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'node_modules', '@ffmpeg', 'core', 'dist', 'esm');
const destDir = join(root, 'public', 'ffmpeg');

if (!existsSync(srcDir)) {
  console.warn('[copy-ffmpeg] @ffmpeg/core not installed — skip');
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });
for (const file of ['ffmpeg-core.js', 'ffmpeg-core.wasm']) {
  cpSync(join(srcDir, file), join(destDir, file));
}
console.log('[copy-ffmpeg] Copied ffmpeg-core.js and ffmpeg-core.wasm to public/ffmpeg/');
