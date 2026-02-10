import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormatPickerDropdown } from './FormatPickerDropdown';
import { ConversionProgress } from './ConversionProgress';
import {
  formatCategories,
  filterCategories,
  getValidTargets,
  getValidSources,
} from '@/lib/format-categories';
import { useConverter } from '@/hooks/use-converter';
import { createFileInfo, formatFileSize } from '@/lib/converter-types';
import { Download, RotateCcw, ArrowRight, Plus, FolderOpen, Link2, FileIcon, X, ChevronDown } from 'lucide-react';

interface HeroConverterProps {
  initialSource?: string;
  initialTarget?: string;
}

export function HeroConverter({ initialSource, initialTarget }: HeroConverterProps) {
  const navigate = useNavigate();
  const [sourceFormat, setSourceFormat] = useState(initialSource ?? '');
  const [targetFormat, setTargetFormat] = useState(initialTarget ?? '');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    fileInfo, status, progress, result, error,
    handleFile, convert, reset,
    setTargetFormat: setConverterTarget,
  } = useConverter(initialTarget);

  const isConverting = status === 'converting';
  const isDone = status === 'done';

  const inputCategories = targetFormat
    ? filterCategories(getValidSources(targetFormat))
    : formatCategories;

  const outputCategories = sourceFormat
    ? filterCategories(getValidTargets(sourceFormat))
    : formatCategories;

  const handleSourceChange = useCallback((fmt: string) => {
    setSourceFormat(fmt);
    const validTargets = getValidTargets(fmt);
    if (targetFormat && !validTargets.includes(targetFormat)) {
      setTargetFormat('');
    }
    if (targetFormat && validTargets.includes(targetFormat)) {
      navigate(`/${fmt}-to-${targetFormat}`);
    }
  }, [targetFormat, navigate]);

  const handleTargetChange = useCallback((fmt: string) => {
    setTargetFormat(fmt);
    setConverterTarget(fmt);
    const validSources = getValidSources(fmt);
    if (sourceFormat && !validSources.includes(sourceFormat)) {
      setSourceFormat('');
    }
    if (sourceFormat && validSources.includes(sourceFormat)) {
      navigate(`/${sourceFormat}-to-${fmt}`);
    }
  }, [sourceFormat, navigate, setConverterTarget]);

  const handleFileUpload = useCallback((file: File) => {
    handleFile(file);
    const info = createFileInfo(file);
    setSourceFormat(info.extension);
    const validTargets = getValidTargets(info.extension);
    if (!targetFormat || !validTargets.includes(targetFormat)) {
      if (validTargets.length > 0) {
        setTargetFormat(validTargets[0]);
        setConverterTarget(validTargets[0]);
      }
    }
  }, [handleFile, targetFormat, setConverterTarget]);

  const handleSelectFromComputer = useCallback(() => {
    setShowDropdown(false);
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileUpload(file);
    };
    input.click();
  }, [handleFileUpload]);

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
    <div className="space-y-4">
      {/* Format Pickers Section */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="flex items-end gap-3">
          <FormatPickerDropdown
            label="Convert"
            value={sourceFormat}
            categories={inputCategories}
            onChange={handleSourceChange}
            placeholder="Select input"
          />
          <div className="flex h-14 items-center justify-center">
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
      </div>

      {/* File Selection Section */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        {fileInfo ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/50 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{fileInfo.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(fileInfo.size)} · .{fileInfo.extension.toUpperCase()} detected
              </p>
            </div>
            <button
              onClick={handleReset}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="relative flex" ref={dropdownRef}>
            <button
              onClick={handleSelectFromComputer}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-l-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Select File
            </button>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-12 items-center justify-center rounded-r-xl border-l border-primary-foreground/20 bg-primary px-3 text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
                  <button
                    onClick={handleSelectFromComputer}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-foreground transition-colors hover:bg-secondary"
                  >
                    <FolderOpen className="h-5 w-5 text-muted-foreground" />
                    From my Computer
                  </button>
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary cursor-not-allowed opacity-50"
                    disabled
                  >
                    <Link2 className="h-5 w-5" />
                    By URL (coming soon)
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <ConversionProgress status={status} progress={progress} />
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

        {canConvert && (
          <button
            onClick={convert}
            className="mt-4 h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Convert to {targetFormat.toUpperCase()}
          </button>
        )}

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
    </div>
  );
}
