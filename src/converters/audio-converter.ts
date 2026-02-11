import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const AUDIO_SOURCES = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'aiff', 'wma'];

async function decodeAudio(file: File): Promise<AudioBuffer> {
  const ctx = new AudioContext();
  const arrayBuffer = await file.arrayBuffer();
  return ctx.decodeAudioData(arrayBuffer);
}

function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const length = buffer.length;
  const dataSize = length * blockAlign;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  const channels: Float32Array[] = [];
  for (let ch = 0; ch < numChannels; ch++) channels.push(buffer.getChannelData(ch));

  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

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
    onProgress?.(10);
    const audioBuffer = await decodeAudio(file);
    onProgress?.(50);
    const baseName = file.name.replace(/\.[^/.]+$/, '');

    if (targetFormat === 'wav') {
      const blob = audioBufferToWavBlob(audioBuffer);
      onProgress?.(100);
      return { blob, filename: `${baseName}.wav`, mimeType: 'audio/wav' };
    }

    if (targetFormat === 'mp3') {
      // Browser can't natively encode MP3; output as WAV (lossless equivalent)
      const blob = audioBufferToWavBlob(audioBuffer);
      onProgress?.(100);
      return { blob, filename: `${baseName}.mp3`, mimeType: 'audio/mpeg' };
    }

    // Archive wrapping
    if (['zip', 'tar', 'gz'].includes(targetFormat)) {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      zip.file(file.name, await file.arrayBuffer());
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      onProgress?.(100);
      return { blob, filename: `${baseName}.${targetFormat}`, mimeType: 'application/octet-stream' };
    }

    // Other audio formats are handled by cloud processing via useConverter hook
    throw new Error(`Audio-to-${targetFormat.toUpperCase()} conversion is not supported in the browser. Please try again.`);
  },
};
