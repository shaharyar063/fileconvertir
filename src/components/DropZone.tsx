import { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
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
      <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{fileInfo.name}</p>
          <p className="text-xs text-muted-foreground">{formatFileSize(fileInfo.size)}</p>
        </div>
        <button
          onClick={onClear}
          className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
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
        flex cursor-pointer flex-col items-center gap-2 rounded border-2 border-dashed px-6 py-10
        ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}
      `}
    >
      <Upload className="h-6 w-6 text-muted-foreground" />
      <p className="text-sm text-foreground">
        Drop a file here or <span className="text-primary underline">browse</span>
      </p>
      <p className="text-xs text-muted-foreground">
        {acceptHint ? `${acceptHint} files` : 'All supported formats'} · Up to 50MB
      </p>
    </div>
  );
}
