import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export async function getFFmpeg(onProgress?: (p: number) => void): Promise<FFmpeg> {
  if (ffmpeg && ffmpeg.loaded) return ffmpeg;

  ffmpeg = new FFmpeg();

  ffmpeg.on('progress', ({ progress }) => {
    // progress is 0-1, map to 20-90 range
    onProgress?.(Math.round(20 + progress * 70));
  });

  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
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

  await ff.writeFile(inputName, await fetchFile(file));

  const args = ffmpegArgs || ['-i', inputName, outputName];
  if (!ffmpegArgs) {
    // default: just transcode
  }

  await ff.exec(args.length ? args : ['-i', inputName, outputName]);

  const data = await ff.readFile(outputName);
  onProgress?.(95);

  // Cleanup
  try { await ff.deleteFile(inputName); } catch {}
  try { await ff.deleteFile(outputName); } catch {}

  // Convert FileData to a proper ArrayBuffer for Blob construction
  let blobParts: ArrayBuffer;
  if (typeof data === 'string') {
    blobParts = new TextEncoder().encode(data).buffer as ArrayBuffer;
  } else {
    blobParts = (data as Uint8Array).slice().buffer as ArrayBuffer;
  }
  return new Blob([blobParts], { type: getMimeType(targetFormat) });
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
