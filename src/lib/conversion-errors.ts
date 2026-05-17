/** Map conversion errors to clear user-facing messages (no server fallback). */
export function formatConversionError(err: unknown): Error {
  const message = err instanceof Error ? err.message : String(err);

  const isolated =
    typeof crossOriginIsolated !== 'undefined' ? crossOriginIsolated : true;

  if (!isolated && /FFMPEG|ffmpeg|SharedArrayBuffer/i.test(message)) {
    return new Error(
      'Audio and video conversion require secure page isolation headers on this host. If this persists, try another browser or contact support.',
    );
  }

  if (
    message === 'FFMPEG_UNAVAILABLE' ||
    /FFMPEG_UNAVAILABLE|load.*ffmpeg|ffmpeg.*load/i.test(message)
  ) {
    return new Error(
      'Could not load the media converter. Try Chrome or Edge, disable strict extensions, refresh the page, or use a smaller file.',
    );
  }

  if (err instanceof Error) {
    return err;
  }

  return new Error(message || 'Conversion failed');
}
