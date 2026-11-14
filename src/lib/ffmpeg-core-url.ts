/** Must match the resolved @ffmpeg/core version in package-lock.json */
export const FFMPEG_CORE_VERSION = '0.12.10';

export const FFMPEG_CORE_CDN_BASE = `https://unpkg.com/@ffmpeg/core@${FFMPEG_CORE_VERSION}/dist/esm`;

/**
 * Base URL for ffmpeg-core.js / ffmpeg-core.wasm.
 * Override with VITE_FFMPEG_BASE_URL=/ffmpeg when self-hosting (host must allow large files).
 */
export function getFfmpegCoreBaseUrl(): string {
  const override = import.meta.env.VITE_FFMPEG_BASE_URL as string | undefined;
  if (override?.trim()) {
    return override.trim().replace(/\/$/, '');
  }
  return FFMPEG_CORE_CDN_BASE;
}
