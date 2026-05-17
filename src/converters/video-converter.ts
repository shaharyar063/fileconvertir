import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';
import { formatConversionError } from '@/lib/conversion-errors';
import { ArchiveFormat, buildSingleFileArchive } from '@/lib/build-archive';

const VIDEO_SOURCES = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
const AUDIO_TARGETS = ['mp3', 'wav'];
const VIDEO_TARGETS = ['mp4', 'webm'];

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

    if (['zip', 'tar', 'gz'].includes(targetFormat)) {
      onProgress?.(50);
      const data = new Uint8Array(await file.arrayBuffer());
      const result = await buildSingleFileArchive(
        file.name,
        data,
        targetFormat as ArchiveFormat,
        baseName,
      );
      onProgress?.(100);
      return result;
    }

    try {
      const { convertWithFFmpeg } = await import('@/lib/ffmpeg');

      let args: string[];
      const inputName = `input.${file.name.split('.').pop() || 'mp4'}`;
      const outputName = `output.${targetFormat}`;

      if (AUDIO_TARGETS.includes(targetFormat)) {
        args = ['-i', inputName, '-vn', '-acodec', getAudioCodec(targetFormat), outputName];
      } else {
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
    } catch (err) {
      throw formatConversionError(err);
    }
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
