import { useState, useCallback } from 'react';
import { FileInfo, ConversionStatus, ConversionResult, createFileInfo, MAX_FILE_SIZE } from '@/lib/converter-types';
import { registry } from '@/lib/converter-registry';

export function useConverter(fixedTargetFormat?: string) {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>(fixedTargetFormat || '');
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setResult(null);
    setError(null);
    setProgress(0);
    setStatus('idle');

    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
      return;
    }

    const info = createFileInfo(file);

    if (fixedTargetFormat) {
      setTargetFormat(fixedTargetFormat);
    } else {
      const formats = registry.getTargetFormats(info.extension);
      if (formats.length === 0) {
        setError(`No conversions available for .${info.extension} files yet.`);
        return;
      }
      setTargetFormat(formats[0].targetFormat);
    }

    setFileInfo(info);
  }, [fixedTargetFormat]);

  const convert = useCallback(async () => {
    if (!fileInfo || !targetFormat) return;

    setStatus('converting');
    setProgress(0);
    setError(null);

    try {
      const conversionResult = await registry.convert(
        fileInfo.file,
        fileInfo.extension,
        targetFormat,
        setProgress
      );

      setResult(conversionResult);
      setStatus('done');

      const url = URL.createObjectURL(conversionResult.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = conversionResult.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setStatus('error');
    }
  }, [fileInfo, targetFormat]);

  const reset = useCallback(() => {
    setFileInfo(null);
    setTargetFormat(fixedTargetFormat || '');
    setStatus('idle');
    setProgress(0);
    setResult(null);
    setError(null);
  }, [fixedTargetFormat]);

  const targetFormats = fileInfo ? registry.getTargetFormats(fileInfo.extension) : [];

  return {
    fileInfo,
    targetFormat,
    setTargetFormat,
    status,
    progress,
    result,
    error,
    targetFormats,
    handleFile,
    convert,
    reset,
  };
}
