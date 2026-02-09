export type FileCategory = 'image' | 'document' | 'audio' | 'video';

export interface ConversionOption {
  targetFormat: string;
  label: string;
  description?: string;
}

export interface ConversionResult {
  blob: Blob;
  filename: string;
  mimeType: string;
}

export interface ConverterPlugin {
  id: string;
  name: string;
  sourceFormats: string[];
  getTargetFormats: (sourceFormat: string) => ConversionOption[];
  convert: (
    file: File,
    targetFormat: string,
    onProgress?: (progress: number) => void
  ) => Promise<ConversionResult>;
}

export interface FileInfo {
  file: File;
  name: string;
  size: number;
  type: string;
  extension: string;
  category: FileCategory;
}

export type ConversionStatus = 'idle' | 'uploading' | 'converting' | 'done' | 'error';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function getFileCategory(extension: string): FileCategory {
  const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg', 'tiff'];
  const docExts = ['pdf', 'docx', 'doc', 'txt', 'rtf', 'odt'];
  const audioExts = ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'];
  const videoExts = ['mp4', 'avi', 'mov', 'mkv', 'webm'];

  if (imageExts.includes(extension)) return 'image';
  if (docExts.includes(extension)) return 'document';
  if (audioExts.includes(extension)) return 'audio';
  if (videoExts.includes(extension)) return 'video';
  return 'document';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function createFileInfo(file: File): FileInfo {
  const extension = getFileExtension(file.name);
  return {
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    extension,
    category: getFileCategory(extension),
  };
}
