import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { getFfmpegCoreBaseUrl } from '@/lib/ffmpeg-core-url';

let ffmpeg: FFmpeg | null = null;
let currentOnProgress: ((p: number) => void) | undefined;

/** The core is ~31 MB; allow slow connections enough time before giving up. */
const FFMPEG_LOAD_TIMEOUT_MS = 120_000;

export async function getFFmpeg(onProgress?: (p: number) => void): Promise<FFmpeg> {
  currentOnProgress = onProgress;

  if (ffmpeg && ffmpeg.loaded) return ffmpeg;

  if (!crossOriginIsolated) {
    console.warn('crossOriginIsolated is false – SharedArrayBuffer unavailable. FFmpeg.wasm may not work.');
  }

  const instance = new FFmpeg();
  ffmpeg = instance;

  instance.on('log', ({ message }) => {
    console.log('[ffmpeg]', message);
  });

  instance.on('progress', ({ progress }) => {
    currentOnProgress?.(Math.round(20 + progress * 70));
  });

  const baseURL = getFfmpegCoreBaseUrl();

  const loadPromise = instance.load({
    coreURL: `${baseURL}/ffmpeg-core.js`,
    wasmURL: `${baseURL}/ffmpeg-core.wasm`,
  });

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('FFMPEG_UNAVAILABLE')), FFMPEG_LOAD_TIMEOUT_MS);
  });

  try {
    await Promise.race([loadPromise, timeoutPromise]);
  } catch (err) {
    // Release the worker and allow a later retry (a flaky network should not
    // disable media conversion until the page is reloaded).
    ffmpeg = null;
    try { instance.terminate(); } catch { /* already terminated */ }
    throw err;
  } finally {
    if (timer) clearTimeout(timer);
  }

  return instance;
}

export async function convertWithFFmpeg(
  file: File,
  targetFormat: string,
  onProgress?: (p: number) => void,
  ffmpegArgs?: string[]
): Promise<Blob> {
  onProgress?.(5);
  const ff = await getFFmpeg(onProgress);
  onProgress?.(15);

  const inputName = `input.${file.name.split('.').pop() || 'bin'}`;
  const outputName = `output.${targetFormat}`;

  try {
    await ff.writeFile(inputName, await fetchFile(file));

    const args = ffmpegArgs && ffmpegArgs.length ? ffmpegArgs : ['-i', inputName, outputName];

    const exitCode = await ff.exec(args);
    if (exitCode !== 0) {
      throw new Error(
        `Conversion failed (FFmpeg exit code ${exitCode}). The file may be corrupted or use an unsupported codec.`,
      );
    }

    const data = await ff.readFile(outputName);
    onProgress?.(95);

    let blobParts: ArrayBuffer;
    if (typeof data === 'string') {
      blobParts = new TextEncoder().encode(data).buffer as ArrayBuffer;
    } else {
      blobParts = (data as Uint8Array).slice().buffer as ArrayBuffer;
    }
    return new Blob([blobParts], { type: getMimeType(targetFormat) });
  } finally {
    // Always clean up so a failed run cannot leave a stale output behind
    // that a later conversion would return by mistake.
    try { await ff.deleteFile(inputName); } catch { /* cleanup failure is non-fatal */ }
    try { await ff.deleteFile(outputName); } catch { /* cleanup failure is non-fatal */ }
  }
}

function getMimeType(format: string): string {
  const map: Record<string, string> = {
    mp4: 'video/mp4', mov: 'video/quicktime', avi: 'video/x-msvideo',
    mkv: 'video/x-matroska', webm: 'video/webm', flv: 'video/x-flv',
    wmv: 'video/x-ms-wmv', '3gp': 'video/3gpp',
    mp3: 'audio/mpeg', wav: 'audio/wav', aac: 'audio/aac',
    ogg: 'audio/ogg', flac: 'audio/flac', m4a: 'audio/mp4',
    aiff: 'audio/aiff', wma: 'audio/x-ms-wma',
  };
  return map[format] || 'application/octet-stream';
}
