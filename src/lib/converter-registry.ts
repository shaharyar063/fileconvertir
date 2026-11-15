import { ConverterPlugin, ConversionOption } from './converter-types';
import { getTargetsForSource } from './conversion-map';
import {
  ARCHIVE_SOURCES,
  AUDIO_SOURCES,
  DOCUMENT_SOURCES,
  FONT_SOURCES,
  IMAGE_SOURCES,
  VIDEO_SOURCES,
} from './source-formats';

interface RegistryEntry {
  sourceFormats: string[];
  /** Converters (and the heavy libraries they use) load on first use only. */
  load: () => Promise<ConverterPlugin>;
}

const entries: RegistryEntry[] = [
  { sourceFormats: IMAGE_SOURCES, load: () => import('@/converters/image-converter').then((m) => m.imageConverter) },
  { sourceFormats: DOCUMENT_SOURCES, load: () => import('@/converters/document-converter').then((m) => m.documentConverter) },
  { sourceFormats: AUDIO_SOURCES, load: () => import('@/converters/audio-converter').then((m) => m.audioConverter) },
  { sourceFormats: VIDEO_SOURCES, load: () => import('@/converters/video-converter').then((m) => m.videoConverter) },
  { sourceFormats: FONT_SOURCES, load: () => import('@/converters/font-converter').then((m) => m.fontConverter) },
  { sourceFormats: ARCHIVE_SOURCES, load: () => import('@/converters/archive-converter').then((m) => m.archiveConverter) },
];

function findEntry(sourceExtension: string): RegistryEntry | undefined {
  return entries.find((e) => e.sourceFormats.includes(sourceExtension.toLowerCase()));
}

class ConverterRegistry {
  /** Output formats for an input extension. Answered from the conversion map, so no converter code is loaded. */
  getTargetFormats(sourceExtension: string): ConversionOption[] {
    const ext = sourceExtension.toLowerCase();
    if (!findEntry(ext)) return [];
    return getTargetsForSource(ext).map((targetFormat) => ({
      targetFormat,
      label: targetFormat.toUpperCase(),
      description: `Convert to ${targetFormat.toUpperCase()}`,
    }));
  }

  async convert(
    file: File,
    sourceExtension: string,
    targetFormat: string,
    onProgress?: (progress: number) => void
  ) {
    const entry = findEntry(sourceExtension);
    if (!entry) throw new Error(`No converter found for .${sourceExtension} files`);
    const converter = await entry.load();
    return converter.convert(file, targetFormat, onProgress);
  }
}

export const registry = new ConverterRegistry();
