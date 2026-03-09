import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormatPickerDropdown } from './FormatPickerDropdown';
import {
  formatCategories,
  filterCategories,
  getValidTargets,
  getValidSources,
} from '@/lib/format-categories';
import { useBulkConverter } from '@/hooks/use-bulk-converter';
import { createFileInfo, formatFileSize, MAX_BATCH_FILES, BulkFileItem } from '@/lib/converter-types';
import {
  Download, RotateCcw, ArrowRight, Plus, FolderOpen, Link2,
  FileIcon, X, ChevronDown, PackageOpen, CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react';

interface HeroConverterProps {
  initialSource?: string;
  initialTarget?: string;
}

export function HeroConverter({ initialSource, initialTarget }: HeroConverterProps) {
  const navigate = useNavigate();
  const [sourceFormat, setSourceFormat] = useState(initialSource ?? '');
  const [targetFmt, setTargetFmt] = useState(initialTarget ?? '');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    files, status, error, doneCount, errorCount, overallProgress,
    addFiles, removeFile, convertAll, downloadFile, downloadAllAsZip, reset,
    targetFormat, setTargetFormat: setBulkTarget,
  } = useBulkConverter(initialTarget);

  const isConverting = status === 'converting';
  const isDone = status === 'done';
  const hasFiles = files.length > 0;

  const inputCategories = formatCategories;
  const outputCategories = sourceFormat
    ? filterCategories(getValidTargets(sourceFormat))
    : formatCategories;

  const handleSourceChange = useCallback((fmt: string) => {
    setSourceFormat(fmt);
    const validTargets = getValidTargets(fmt);
    if (targetFmt && !validTargets.includes(targetFmt)) {
      setTargetFmt('');
    }
    if (targetFmt && validTargets.includes(targetFmt)) {
      navigate(`/${fmt}-to-${targetFmt}`);
    } else {
      navigate(`/${fmt}`);
    }
  }, [targetFmt, navigate]);

  const handleTargetChange = useCallback((fmt: string) => {
    setTargetFmt(fmt);
    setBulkTarget(fmt);
    const validSources = getValidSources(fmt);
    if (sourceFormat && !validSources.includes(sourceFormat)) {
      setSourceFormat('');
    }
    if (sourceFormat && validSources.includes(sourceFormat)) {
      navigate(`/${sourceFormat}-to-${fmt}`);
    }
  }, [sourceFormat, navigate, setBulkTarget]);

  const handleFilesSelected = useCallback((selectedFiles: FileList | File[]) => {
    const arr = Array.from(selectedFiles);
    if (arr.length === 0) return;

    addFiles(arr);

    const info = createFileInfo(arr[0]);
    if (!sourceFormat) setSourceFormat(info.extension);

    const ext = info.extension;
    const validTargets = getValidTargets(ext);
    if (!targetFmt || !validTargets.includes(targetFmt)) {
      if (validTargets.length > 0) {
        setTargetFmt(validTargets[0]);
        setBulkTarget(validTargets[0]);
      }
    }
  }, [addFiles, sourceFormat, targetFmt, setBulkTarget]);

  const handleSelectFromComputer = useCallback(() => {
    setShowDropdown(false);
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
            value={sourceFormat}
            categories={inputCategories}
            onChange={handleSourceChange}
            placeholder=""
          />
          <div className="flex h-14 items-center justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <FormatPickerDropdown
            label="To"
            value={targetFmt}
            categories={outputCategories}
            onChange={handleTargetChange}
            placeholder=""
            direction="rtl"
          />
        </div>
      </div>

      {/* Files & Conversion */}
      <div
        className="rounded-2xl border border-border bg-card p-5 md:p-6"
        onDragOver={(e) => { e.preventDefault(); }}
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
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state: upload prompt */}
        {!hasFiles && (
          <div className="relative flex" ref={dropdownRef}>
            <button
              onClick={handleSelectFromComputer}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-l-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Select Files
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
        {allDone && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-success">
              <CheckCircle2 className="h-4 w-4" />
              {doneCount} converted{errorCount > 0 ? ` · ${errorCount} failed` : ''}
            </div>
            <div className="flex gap-3">
              <button
                onClick={downloadAllAsZip}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <PackageOpen className="h-4 w-4" />
                {doneCount > 1 ? 'Download All (.zip)' : `Download ${files[0]?.result?.filename ?? ''}`}
              </button>
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
  item, onRemove, onDownload, disabled,
}: {
  item: BulkFileItem;
  onRemove: () => void;
  onDownload: () => void;
  disabled: boolean;
}) {
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
          {item.status === 'converting' && ` · ${item.progress}%`}
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
