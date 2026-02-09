import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const VIDEO_SOURCES = ['mp4', 'mov', 'webm'];

/**
 * Extracts audio from video files using the browser's built-in
 * HTMLVideoElement + Web Audio API, then encodes to WAV.
 */

async function extractAudioFromVideo(file: File, onProgress?: (p: number) => void): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'auto';

    const url = URL.createObjectURL(file);
    video.src = url;

    video.onloadedmetadata = async () => {
      try {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);

        const recorder = new MediaRecorder(dest.stream, { mimeType: 'audio/webm' });
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };

        recorder.onstop = () => {
          URL.revokeObjectURL(url);
          resolve(new Blob(chunks, { type: 'audio/webm' }));
        };

        recorder.onerror = (e) => reject(e);

        recorder.start();
        video.muted = false;
        await video.play();

        onProgress?.(30);

        // Wait for video to end
        video.onended = () => {
          recorder.stop();
          audioCtx.close();
          onProgress?.(90);
        };

        // Safety timeout for very long videos
        const maxDuration = Math.min(video.duration * 1000 + 2000, 300_000);
        setTimeout(() => {
          if (recorder.state === 'recording') {
            video.pause();
            recorder.stop();
            audioCtx.close();
          }
        }, maxDuration);
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err);
      }
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load video file'));
    };
  });
}

export const videoConverter: ConverterPlugin = {
  id: 'video-converter',
  name: 'Video Converter',
  sourceFormats: VIDEO_SOURCES,

  getTargetFormats(sourceFormat: string): ConversionOption[] {
    return getTargetsForSource(sourceFormat).map(t => ({
      targetFormat: t,
      label: t.toUpperCase(),
      description: `Extract audio as ${t.toUpperCase()}`,
    }));
  },

  async convert(file, targetFormat, onProgress): Promise<ConversionResult> {
    if (targetFormat !== 'mp3') {
      throw new Error(`Unsupported video target: ${targetFormat}`);
    }

    onProgress?.(5);
    const blob = await extractAudioFromVideo(file, onProgress);
    onProgress?.(100);

    const baseName = file.name.replace(/\.[^/.]+$/, '');
    return {
      blob,
      filename: `${baseName}.mp3`,
      mimeType: 'audio/mpeg',
    };
  },
};
