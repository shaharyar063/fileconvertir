import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormatPickerDropdown } from './FormatPickerDropdown';
import {
  formatCategories,
  filterCategories,
  getValidTargets,
  getValidSources,
  isValidConversion,
} from '@/lib/format-categories';
import { sitePath } from '@/lib/site-url';
import { getSourceFormatPage, isPublishedPair } from '@/lib/converters';
import { useBulkConverter } from '@/hooks/use-bulk-converter';
import { createFileInfo, formatFileSize, MAX_BATCH_FILES, BulkFileItem } from '@/lib/converter-types';
import {
  Download, RotateCcw, ArrowRight, Plus,
  FileIcon, X, PackageOpen, CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react';

interface HeroConverterProps {
  initialSource?: string;
  initialTarget?: string;
  /** Do not clear the source format when picking a target (source hub pages). */
  lockSource?: boolean;
  /** Do not clear the target format when picking a source (target hub pages). */
  lockTarget?: boolean;
  /** Called whenever the selected source/target pair changes (either may be empty). */
  onPairChange?: (source: string, target: string) => void;
}

export function HeroConverter({
  initialSource,
  initialTarget,
  lockSource,
  lockTarget,
  onPairChange,
}: HeroConverterProps) {
  const navigate = useNavigate();
  const [sourceFormat, setSourceFormat] = useState(initialSource ?? '');
  const [targetFmt, setTargetFmt] = useState(initialTarget ?? '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    files, status, error, doneCount, errorCount, overallProgress,
    addFiles, removeFile, convertAll, downloadFile, downloadAllAsZip, reset,
    targetFormat, setTargetFormat: setBulkTarget,
  } = useBulkConverter(initialTarget);

  // Sync the dropdowns to incoming route props. The same HeroConverter
  // instance is reused across converter pages (Image→PDF, PNG→JPG, etc.),
  // so when the route changes we must mirror the new initial formats into
  // local state — otherwise the page content updates but the pickers stay
  // stuck on the previously chosen formats.
  useEffect(() => {
    if (initialSource !== undefined) setSourceFormat(initialSource);
  }, [initialSource]);

  useEffect(() => {
    if (initialTarget !== undefined) {
      setTargetFmt(initialTarget);
      setBulkTarget(initialTarget);
    }
  }, [initialTarget, setBulkTarget]);

  const isConverting = status === 'converting';
  const isDone = status === 'done';
  const hasFiles = files.length > 0;

  const activeSource = sourceFormat || initialSource || '';
  const activeTarget = targetFmt || initialTarget || '';
  const inputCategories = activeTarget
    ? filterCategories(getValidSources(activeTarget))
    : formatCategories;
  const outputCategories = activeSource
    ? filterCategories(getValidTargets(activeSource))
    : formatCategories;

  useEffect(() => {
    onPairChange?.(activeSource, activeTarget);
  }, [activeSource, activeTarget, onPairChange]);

  const handleSourceChange = useCallback((fmt: string) => {
    setSourceFormat(fmt);
    const tgt = targetFmt || initialTarget || '';
    const validTargets = getValidTargets(fmt);
    if (tgt && !validTargets.includes(tgt)) {
      if (!lockTarget && !initialTarget) {
        setTargetFmt('');
        setBulkTarget('');
      }
    }
    // Only navigate to pages that exist; every other pair still converts here.
    if (tgt && validTargets.includes(tgt)) {
      if (isPublishedPair(fmt, tgt)) navigate(sitePath(`${fmt}-to-${tgt}`));
    } else if (getSourceFormatPage(fmt)) {
      navigate(sitePath(fmt));
    }
  }, [targetFmt, initialTarget, lockTarget, navigate, setBulkTarget]);

  const handleTargetChange = useCallback((fmt: string) => {
    setTargetFmt(fmt);
    setBulkTarget(fmt);
    const src = sourceFormat || initialSource || '';
    if (!src) return;

    if (!isValidConversion(src, fmt)) {
      if (!lockSource && !initialSource) setSourceFormat('');
      return;
    }

    if (!sourceFormat && initialSource) {
      setSourceFormat(initialSource);
    }

    if (isPublishedPair(src, fmt)) navigate(sitePath(`${src}-to-${fmt}`));
  }, [sourceFormat, initialSource, lockSource, navigate, setBulkTarget]);

  const handleFilesSelected = useCallback((selectedFiles: FileList | File[]) => {
    const arr = Array.from(selectedFiles);
    if (arr.length === 0) return;

    addFiles(arr);

    const info = createFileInfo(arr[0]);
    const ext = info.extension;
    const validTargets = getValidTargets(ext);
    // Keep the "Convert" picker in step with the file actually chosen
    // (previously it stayed on e.g. PNG while converting an MP3).
    if (validTargets.length > 0 && sourceFormat !== ext) setSourceFormat(ext);
    if (!targetFmt || !validTargets.includes(targetFmt)) {
      if (validTargets.length > 0) {
        setTargetFmt(validTargets[0]);
        setBulkTarget(validTargets[0]);
      }
    }
  }, [addFiles, sourceFormat, targetFmt, setBulkTarget]);

  const handleSelectFromComputer = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, []);

  const handleReset = useCallback(() => {
    reset();
    if (!initialSource) setSourceFormat('');
    if (!initialTarget) setTargetFmt('');
  }, [reset, initialSource, initialTarget]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) handleFilesSelected(droppedFiles);
  }, [handleFilesSelected]);

  const canConvert = hasFiles && !!targetFormat && !isConverting && !isDone;
  const allDone = isDone && doneCount > 0;

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFilesSelected(e.target.files);
        }}
      />

      {/* Format Pickers */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="flex items-end gap-3">
          <FormatPickerDropdown
            label="Convert"
            value={activeSource}
            categories={inputCategories}
            onChange={handleSourceChange}
          />
          <div className="flex h-14 items-center justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <FormatPickerDropdown
            label="To"
            value={activeTarget}
            categories={outputCategories}
            onChange={handleTargetChange}
            direction="rtl"
          />
        </div>
      </div>

      {/* Files & Conversion */}
      <div
        className={`rounded-2xl border bg-card p-5 transition-colors md:p-6 ${
          isDragging ? 'border-primary bg-secondary' : 'border-border'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        {/* File list */}
        {hasFiles && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {files.length} file{files.length > 1 ? 's' : ''} selected
              </p>
              {files.length < MAX_BATCH_FILES && !isConverting && !isDone && (
                <button
                  onClick={handleSelectFromComputer}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:brightness-110"
                >
                  <Plus className="h-3 w-3" /> Add more
                </button>
              )}
            </div>

            <div className="max-h-[280px] space-y-1.5 overflow-y-auto pr-1">
              {files.map(item => (
                <FileRow
                  key={item.id}
                  item={item}
                  onRemove={() => removeFile(item.id)}
                  onDownload={() => downloadFile(item)}
                  disabled={isConverting}
                  targetFormat={targetFormat}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state: upload prompt */}
        {!hasFiles && (
          <button
            type="button"
            onClick={handleSelectFromComputer}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Select Files
          </button>
        )}

        {!hasFiles && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Drop files here or browse · Up to {MAX_BATCH_FILES} files per batch · 100MB each
          </p>
        )}

        {/* Overall progress bar */}
        {isConverting && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-foreground">
                Converting… {doneCount}/{files.length}
              </span>
              <span className="text-muted-foreground font-medium">{overallProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        )}

        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

        {/* Convert button */}
        {canConvert && (
          <button
            onClick={convertAll}
            className="mt-4 h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Convert {files.length > 1 ? `${files.length} files` : '1 file'} to {targetFormat.toUpperCase()}
          </button>
        )}

        {/* Done: download buttons */}
        {isDone && (
          <div className="mt-4 space-y-3">
            <div className={`flex items-center gap-2 text-xs font-bold ${allDone ? 'text-success' : 'text-destructive'}`}>
              {allDone ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              {doneCount} converted{errorCount > 0 ? ` · ${errorCount} failed` : ''}
            </div>
            <div className="flex gap-3">
              {allDone && (
              <button
                onClick={downloadAllAsZip}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
              >
                {doneCount > 1 ? <PackageOpen className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                {doneCount > 1
                  ? 'Download All (.zip)'
                  : `Download ${files.find(f => f.status === 'done')?.result?.filename ?? ''}`}
              </button>
              )}
              <button
                onClick={handleReset}
                className="flex h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                New
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FileRow({
  item, onRemove, onDownload, disabled, targetFormat,
}: {
  item: BulkFileItem;
  onRemove: () => void;
  onDownload: () => void;
  disabled: boolean;
  targetFormat: string;
}) {
  // Audio/video use FFmpeg.wasm, a ~30 MB download on first use. Progress sits
  // below 15% while it loads, so say what is happening instead of looking stuck.
  const isLoadingEngine =
    item.status === 'converting' &&
    (item.info.category === 'audio' || item.info.category === 'video') &&
    !['zip', 'tar', 'gz'].includes(targetFormat) &&
    item.progress < 15;

  const statusIcon = {
    queued: <FileIcon className="h-4 w-4 text-muted-foreground" />,
    converting: <Loader2 className="h-4 w-4 animate-spin text-primary" />,
    done: <CheckCircle2 className="h-4 w-4 text-success" />,
    error: <AlertCircle className="h-4 w-4 text-destructive" />,
  }[item.status];

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
        {statusIcon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-xs font-semibold text-foreground">{item.info.name}</p>
        <p className="text-[10px] text-muted-foreground">
          {formatFileSize(item.info.size)}
          {item.status === 'converting' &&
            (isLoadingEngine
              ? ' · Loading converter… (first time only, ~30 MB)'
              : ` · ${item.progress}%`)}
          {item.status === 'done' && item.result && ` → ${item.result.filename}`}
          {item.status === 'error' && item.error && ` · ${item.error}`}
        </p>
      </div>
      {item.status === 'done' && (
        <button
          onClick={onDownload}
          className="rounded-md p-1 text-primary transition-colors hover:bg-primary/10"
          title="Download"
        >
          <Download className="h-3.5 w-3.5" />
        </button>
      )}
      {!disabled && item.status !== 'converting' && (
        <button
          onClick={onRemove}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          title="Remove"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
