import { useState, useCallback, useRef } from 'react';
import {
  FileInfo, ConversionResult, ConversionStatus,
  createFileInfo, MAX_FILE_SIZE, MAX_BATCH_FILES, MAX_BATCH_SIZE,
  BulkFileItem, formatFileSize,
} from '@/lib/converter-types';
import { registry } from '@/lib/converter-registry';
import { isCloudConversion } from '@/lib/conversion-map';
import { convertViaCloud } from '@/lib/cloud-converter';

let nextId = 0;

export function useBulkConverter(fixedTargetFormat?: string) {
  const [files, setFiles] = useState<BulkFileItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<string>(fixedTargetFormat || '');
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef(false);

  const addFiles = useCallback((newFiles: File[]) => {
    setError(null);

    const items: BulkFileItem[] = [];
    let totalSize = files.reduce((s, f) => s + f.info.size, 0);
    const currentCount = files.length;
    let localError: string | null = null;

    for (const file of newFiles) {
      if (currentCount + items.length >= MAX_BATCH_FILES) {
        localError = `Maximum ${MAX_BATCH_FILES} files per batch. Extra files were skipped.`;
        setError(localError);
        break;
      }
      if (file.size > MAX_FILE_SIZE) {
        localError = `${file.name} exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit and was skipped.`;
        setError(localError);
        continue;
      }
      totalSize += file.size;
      if (totalSize > MAX_BATCH_SIZE) {
        localError = `Total batch size exceeds ${formatFileSize(MAX_BATCH_SIZE)}. Some files were skipped.`;
        setError(localError);
        break;
      }

      const info = createFileInfo(file);
      const formats = registry.getTargetFormats(info.extension);
      if (formats.length === 0) continue;

      items.push({
        id: `file-${++nextId}`,
        info,
        status: 'queued',
        progress: 0,
        result: null,
        error: null,
      });
    }

    if (items.length === 0 && !localError) {
      setError('No supported files were found.');
      return;
    }

    setFiles(prev => [...prev, ...items]);

    if (!fixedTargetFormat && items.length > 0 && !targetFormat) {
      const ext = items[0].info.extension;
      const formats = registry.getTargetFormats(ext);
      if (formats.length > 0) {
        setTargetFormat(formats[0].targetFormat);
      }
    }
  }, [files, targetFormat, fixedTargetFormat]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const convertAll = useCallback(async () => {
    if (files.length === 0 || !targetFormat) return;
    abortRef.current = false;
    setStatus('converting');
    setError(null);

    for (let i = 0; i < files.length; i++) {
      if (abortRef.current) break;
      const item = files[i];
      if (item.status === 'done') continue;

      setFiles(prev => prev.map(f =>
        f.id === item.id ? { ...f, status: 'converting', progress: 0 } : f
      ));

      try {
        let result: ConversionResult;
        const onProgress = (p: number) => {
          setFiles(prev => prev.map(f =>
            f.id === item.id ? { ...f, progress: p } : f
          ));
        };

        if (isCloudConversion(item.info.extension, targetFormat)) {
          result = await convertViaCloud(
            item.info.file, item.info.extension, targetFormat, onProgress
          );
        } else {
          result = await registry.convert(
            item.info.file, item.info.extension, targetFormat, onProgress
          );
        }

        setFiles(prev => prev.map(f =>
          f.id === item.id ? { ...f, status: 'done', progress: 100, result } : f
        ));
      } catch (err) {
        setFiles(prev => prev.map(f =>
          f.id === item.id ? {
            ...f,
            status: 'error',
            error: err instanceof Error ? err.message : 'Failed',
          } : f
        ));
      }
    }

    setStatus('done');
  }, [files, targetFormat]);

  const downloadFile = useCallback((item: BulkFileItem) => {
    if (!item.result) return;
    const url = URL.createObjectURL(item.result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const downloadAllAsZip = useCallback(async () => {
    const doneFiles = files.filter(f => f.status === 'done' && f.result);
    if (doneFiles.length === 0) return;

    if (doneFiles.length === 1 && doneFiles[0].result) {
      downloadFile(doneFiles[0]);
      return;
    }

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    const usedNames = new Set<string>();
    for (const f of doneFiles) {
      if (!f.result) continue;
      let name = f.result.filename;
      let counter = 1;
      while (usedNames.has(name)) {
        const base = f.result.filename.replace(/\.[^/.]+$/, '');
        const ext = f.result.filename.split('.').pop();
        name = `${base} (${counter++}).${ext}`;
      }
      usedNames.add(name);
      zip.file(name, f.result.blob);
    }
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-files.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [files, downloadFile]);

  const reset = useCallback(() => {
    abortRef.current = true;
    setFiles([]);
    setTargetFormat(fixedTargetFormat || '');
    setStatus('idle');
    setError(null);
  }, [fixedTargetFormat]);

  const doneCount = files.filter(f => f.status === 'done').length;
  const errorCount = files.filter(f => f.status === 'error').length;
  const overallProgress = files.length > 0
    ? Math.round(files.reduce((s, f) => s + (f.status === 'done' ? 100 : f.progress), 0) / files.length)
    : 0;

  const sourceExtension = files.length > 0 ? files[0].info.extension : '';
  const targetFormats = sourceExtension ? registry.getTargetFormats(sourceExtension) : [];

  return {
    files,
    targetFormat,
    setTargetFormat,
    status,
    error,
    targetFormats,
    doneCount,
    errorCount,
    overallProgress,
    addFiles,
    removeFile,
    convertAll,
    downloadFile,
    downloadAllAsZip,
    reset,
  };
}
