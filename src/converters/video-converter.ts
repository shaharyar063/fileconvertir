import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const VIDEO_SOURCES = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', '3gp'];
const AUDIO_TARGETS = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'aiff', 'wma'];
const VIDEO_TARGETS = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', '3gp'];

export const videoConverter: ConverterPlugin = {
  id: 'video-converter',
  name: 'Video Converter',
  sourceFormats: VIDEO_SOURCES,

  getTargetFormats(sourceFormat: string): ConversionOption[] {
    return getTargetsForSource(sourceFormat).map(t => ({
      targetFormat: t,
      label: t.toUpperCase(),
      description: VIDEO_TARGETS.includes(t)
        ? `Convert to ${t.toUpperCase()}`
        : AUDIO_TARGETS.includes(t)
        ? `Extract audio as ${t.toUpperCase()}`
        : `Package as ${t.toUpperCase()}`,
    }));
  },

  async convert(file, targetFormat, onProgress): Promise<ConversionResult> {
    const baseName = file.name.replace(/\.[^/.]+$/, '');

    // Archive wrapping
    if (['zip', 'tar', 'gz'].includes(targetFormat)) {
      onProgress?.(50);
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      zip.file(file.name, await file.arrayBuffer());
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      onProgress?.(100);
      return { blob, filename: `${baseName}.${targetFormat}`, mimeType: 'application/octet-stream' };
    }

    // Video → Video or Video → Audio via FFmpeg.wasm
    const { convertWithFFmpeg } = await import('@/lib/ffmpeg');

    let args: string[];
    const inputName = `input.${file.name.split('.').pop() || 'mp4'}`;
    const outputName = `output.${targetFormat}`;

    if (AUDIO_TARGETS.includes(targetFormat)) {
      // Extract audio only – lightweight
      args = ['-i', inputName, '-vn', '-acodec', getAudioCodec(targetFormat), outputName];
    } else {
      // Video transcode – use fast settings for WASM
      args = ['-i', inputName, '-threads', '1', ...getVideoArgs(targetFormat), outputName];
    }

    const blob = await convertWithFFmpeg(file, targetFormat, onProgress, args);
    onProgress?.(100);

    const mimeMap: Record<string, string> = {
      mp4: 'video/mp4', mov: 'video/quicktime', avi: 'video/x-msvideo',
      mkv: 'video/x-matroska', webm: 'video/webm', flv: 'video/x-flv',
      wmv: 'video/x-ms-wmv', '3gp': 'video/3gpp',
      mp3: 'audio/mpeg', wav: 'audio/wav', aac: 'audio/aac',
      ogg: 'audio/ogg', flac: 'audio/flac', m4a: 'audio/mp4',
      aiff: 'audio/aiff', wma: 'audio/x-ms-wma',
    };

    return {
      blob,
      filename: `${baseName}.${targetFormat}`,
      mimeType: mimeMap[targetFormat] || 'application/octet-stream',
    };
  },
};

function getAudioCodec(format: string): string {
  const codecs: Record<string, string> = {
    mp3: 'libmp3lame', wav: 'pcm_s16le', aac: 'aac',
    ogg: 'libvorbis', flac: 'flac', m4a: 'aac',
    aiff: 'pcm_s16be', wma: 'wmav2',
  };
  return codecs[format] || 'copy';
}

function getVideoArgs(format: string): string[] {
  // Use fast presets and lower quality to avoid WASM memory/speed issues
  switch (format) {
    case 'webm':
      return ['-c:v', 'libvpx-vp9', '-crf', '35', '-b:v', '0', '-deadline', 'realtime', '-cpu-used', '8', '-row-mt', '0', '-c:a', 'libopus'];
    case 'mp4':
      return ['-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '28', '-c:a', 'aac'];
    case 'mkv':
      return ['-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '28', '-c:a', 'aac'];
    case 'avi':
      return ['-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '28', '-c:a', 'libmp3lame'];
    default:
      return [];
  }
}
