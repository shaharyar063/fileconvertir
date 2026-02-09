import { ConverterPlugin, ConversionOption } from './converter-types';
import { imageConverter } from '@/converters/image-converter';
import { documentConverter } from '@/converters/document-converter';
import { audioConverter } from '@/converters/audio-converter';
import { videoConverter } from '@/converters/video-converter';

class ConverterRegistry {
  private plugins: ConverterPlugin[] = [];

  register(plugin: ConverterPlugin) {
    this.plugins.push(plugin);
  }

  getConverterForFormat(sourceExtension: string): ConverterPlugin | null {
    return this.plugins.find(p =>
      p.sourceFormats.includes(sourceExtension.toLowerCase())
    ) || null;
  }

  getTargetFormats(sourceExtension: string): ConversionOption[] {
    const converter = this.getConverterForFormat(sourceExtension);
    if (!converter) return [];
    return converter.getTargetFormats(sourceExtension.toLowerCase());
  }

  async convert(
    file: File,
    sourceExtension: string,
    targetFormat: string,
    onProgress?: (progress: number) => void
  ) {
    const converter = this.getConverterForFormat(sourceExtension);
    if (!converter) throw new Error(`No converter found for .${sourceExtension} files`);
    return converter.convert(file, targetFormat, onProgress);
  }
}

export const registry = new ConverterRegistry();

// Register all converters
registry.register(imageConverter);
registry.register(documentConverter);
registry.register(audioConverter);
registry.register(videoConverter);
