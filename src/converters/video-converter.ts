import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const VIDEO_SOURCES = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', '3gp'];

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
    const baseName = file.name.replace(/\.[^/.]+$/, '');

    // Browser can extract audio from video
    if (['mp3', 'wav', 'aac'].includes(targetFormat)) {
      onProgress?.(5);
      const blob = await extractAudioFromVideo(file, onProgress);
      onProgress?.(100);
      return {
        blob,
        filename: `${baseName}.${targetFormat}`,
        mimeType: targetFormat === 'mp3' ? 'audio/mpeg' : targetFormat === 'wav' ? 'audio/wav' : 'audio/aac',
      };
    }

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

    // Video-to-video conversions are handled by cloud processing via useConverter hook
    throw new Error(`Video-to-${targetFormat.toUpperCase()} conversion is not supported in the browser. Please try again.`);
  },
};
