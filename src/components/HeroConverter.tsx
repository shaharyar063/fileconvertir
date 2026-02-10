import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormatPickerDropdown } from './FormatPickerDropdown';
import { DropZone } from './DropZone';
import { ConversionProgress } from './ConversionProgress';
import {
  formatCategories,
  filterCategories,
  getValidTargets,
  getValidSources,
} from '@/lib/format-categories';
import { useConverter } from '@/hooks/use-converter';
import { createFileInfo } from '@/lib/converter-types';
import { Download, RotateCcw, ArrowRight } from 'lucide-react';

interface HeroConverterProps {
  /** Pre-selected source format (for SEO pages like /png-to-jpg) */
  initialSource?: string;
  /** Pre-selected target format (for SEO pages) */
  initialTarget?: string;
}

export function HeroConverter({ initialSource, initialTarget }: HeroConverterProps) {
  const navigate = useNavigate();
  const [sourceFormat, setSourceFormat] = useState(initialSource ?? '');
  const [targetFormat, setTargetFormat] = useState(initialTarget ?? '');

  const {
    fileInfo, status, progress, result, error,
    handleFile, convert, reset,
    setTargetFormat: setConverterTarget,
  } = useConverter(initialTarget);

  const isConverting = status === 'converting';
  const isDone = status === 'done';

  // Compute filtered categories for each dropdown
  const inputCategories = targetFormat
    ? filterCategories(getValidSources(targetFormat))
    : formatCategories;

  const outputCategories = sourceFormat
    ? filterCategories(getValidTargets(sourceFormat))
    : formatCategories;

  const handleSourceChange = useCallback((fmt: string) => {
    setSourceFormat(fmt);
    // If current target is invalid for new source, clear it
    const validTargets = getValidTargets(fmt);
    if (targetFormat && !validTargets.includes(targetFormat)) {
      setTargetFormat('');
    }
    // Navigate to converter page if both are set
    if (targetFormat && validTargets.includes(targetFormat)) {
      navigate(`/${fmt}-to-${targetFormat}`);
    }
  }, [targetFormat, navigate]);

  const handleTargetChange = useCallback((fmt: string) => {
    setTargetFormat(fmt);
    setConverterTarget(fmt);
    // If current source is invalid for new target, clear it
    const validSources = getValidSources(fmt);
    if (sourceFormat && !validSources.includes(sourceFormat)) {
      setSourceFormat('');
    }
    // Navigate to converter page if both are set
    if (sourceFormat && validSources.includes(sourceFormat)) {
      navigate(`/${sourceFormat}-to-${fmt}`);
    }
  }, [sourceFormat, navigate, setConverterTarget]);

  const handleFileUpload = useCallback((file: File) => {
    handleFile(file);
    const info = createFileInfo(file);
    setSourceFormat(info.extension);
    // Auto-set first valid target if none selected
    const validTargets = getValidTargets(info.extension);
    if (!targetFormat || !validTargets.includes(targetFormat)) {
      if (validTargets.length > 0) {
        setTargetFormat(validTargets[0]);
        setConverterTarget(validTargets[0]);
      }
    }
  }, [handleFile, targetFormat, setConverterTarget]);

  const handleReset = useCallback(() => {
    reset();
    if (!initialSource) setSourceFormat('');
    if (!initialTarget) setTargetFormat('');
  }, [reset, initialSource, initialTarget]);

  const handleDownload = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const canConvert = !!fileInfo && !!targetFormat && !isConverting && !isDone;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6 glow-orange">
      {/* Format Pickers Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3">
        <FormatPickerDropdown
          label="Convert"
          value={sourceFormat}
          categories={inputCategories}
          onChange={handleSourceChange}
          placeholder="Select input"
        />
        <div className="hidden sm:flex h-14 items-center justify-center">
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <FormatPickerDropdown
          label="To"
          value={targetFormat}
          categories={outputCategories}
          onChange={handleTargetChange}
          placeholder="Select output"
        />
      </div>

      {/* File Upload */}
      <div className="mt-4">
        <DropZone
          onFile={handleFileUpload}
          fileInfo={fileInfo}
          onClear={handleReset}
          disabled={isConverting}
          acceptHint={sourceFormat ? `.${sourceFormat.toUpperCase()}` : undefined}
        />
      </div>

      {/* Progress & Errors */}
      <ConversionProgress status={status} progress={progress} />
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      {/* Convert Button */}
      {canConvert && (
        <button
          onClick={convert}
          className="mt-4 h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Convert to {targetFormat.toUpperCase()}
        </button>
      )}

      {/* Done State */}
      {isDone && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleDownload}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Download {result?.filename}
          </button>
          <button
            onClick={handleReset}
            className="flex h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" />
            New
          </button>
        </div>
      )}
    </div>
  );
}
