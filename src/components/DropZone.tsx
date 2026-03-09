import { useCallback, useState } from 'react';
import { Upload, X, FileIcon } from 'lucide-react';
import { FileInfo, formatFileSize } from '@/lib/converter-types';

interface DropZoneProps {
  onFile: (file: File) => void;
  fileInfo: FileInfo | null;
  onClear: () => void;
  disabled?: boolean;
  acceptHint?: string;
}

export function DropZone({ onFile, fileInfo, onClear, disabled, acceptHint }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }, [onFile, disabled]);

  const handleClick = useCallback(() => {
    if (disabled || fileInfo) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onFile(file);
    };
    input.click();
  }, [onFile, disabled, fileInfo]);

  if (fileInfo) {
    return (
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
          onClick={onClear}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 transition-all
        ${isDragging
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : 'border-border hover:border-muted-foreground hover:bg-secondary/30'
        }
      `}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Upload className="h-5 w-5 text-primary" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">
          Drop a file here or <span className="text-primary">browse</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {acceptHint ? `${acceptHint} files` : 'All supported formats'} · Up to 100MB
        </p>
      </div>
    </div>
  );
}
