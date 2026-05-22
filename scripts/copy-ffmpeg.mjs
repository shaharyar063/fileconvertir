import { cpSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

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
