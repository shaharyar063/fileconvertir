import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const AUDIO_SOURCES = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a'];

export const audioConverter: ConverterPlugin = {
  id: 'audio-converter',
  name: 'Audio Converter',
  sourceFormats: AUDIO_SOURCES,

  getTargetFormats(sourceFormat: string): ConversionOption[] {
    return getTargetsForSource(sourceFormat).map(t => ({
      targetFormat: t,
      label: t.toUpperCase(),
      description: `Convert to ${t.toUpperCase()}`,
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

    // All audio ↔ audio via FFmpeg.wasm, with cloud fallback
    try {
      const { convertWithFFmpeg } = await import('@/lib/ffmpeg');

      const inputName = `input.${file.name.split('.').pop() || 'mp3'}`;
      const outputName = `output.${targetFormat}`;
      const codec = getAudioCodec(targetFormat);
      const args = ['-i', inputName, '-acodec', codec, outputName];

      const blob = await convertWithFFmpeg(file, targetFormat, onProgress, args);
      onProgress?.(100);

      const mimeMap: Record<string, string> = {
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
      console.warn('FFmpeg unavailable, falling back to cloud conversion:', err);
      const { convertViaCloud } = await import('@/lib/cloud-converter');
      const ext = file.name.split('.').pop()?.toLowerCase() || 'mp3';
      return convertViaCloud(file, ext, targetFormat, onProgress);
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
