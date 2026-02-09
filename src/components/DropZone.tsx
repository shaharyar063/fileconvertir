import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileType, X } from 'lucide-react';
import { FileInfo, formatFileSize } from '@/lib/converter-types';

interface DropZoneProps {
  onFile: (file: File) => void;
  fileInfo: FileInfo | null;
  onClear: () => void;
  disabled?: boolean;
}

const categoryIcons: Record<string, string> = {
  image: '🖼️',
  document: '📄',
  audio: '🎵',
  video: '🎬',
};

export function DropZone({ onFile, fileInfo, onClear, disabled }: DropZoneProps) {
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

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative rounded-xl border-2 border-dashed transition-all duration-300
        ${fileInfo ? 'cursor-default' : 'cursor-pointer'}
        ${isDragging
          ? 'border-primary bg-primary/5 glow-primary-sm'
          : fileInfo
            ? 'border-border bg-card/40'
            : 'border-border/60 hover:border-primary/50 hover:bg-card/30'
        }
      `}
      whileHover={!fileInfo && !disabled ? { scale: 1.005 } : {}}
    >
      <AnimatePresence mode="wait">
        {fileInfo ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-4 p-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-2xl">
              {categoryIcons[fileInfo.category] || '📎'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-foreground">{fileInfo.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(fileInfo.size)} · <span className="font-mono text-primary">.{fileInfo.extension.toUpperCase()}</span>
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 p-10 md:p-14"
          >
            <motion.div
              className="rounded-full bg-primary/10 p-4"
              animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
            >
              {isDragging ? (
                <FileType className="h-7 w-7 text-primary" />
              ) : (
                <Upload className="h-7 w-7 text-primary" />
              )}
            </motion.div>
            <div className="text-center">
              <p className="font-medium text-foreground">
                {isDragging ? 'Drop your file here' : 'Drop a file or click to browse'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                JPG, PNG, WebP · Up to 50MB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
