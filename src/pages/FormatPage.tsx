import { useParams, Navigate } from 'react-router-dom';
import { getFormatPageBySlug } from '@/lib/converters';
import { DropZone } from '@/components/DropZone';
import { ConversionProgress } from '@/components/ConversionProgress';
import { useConverter } from '@/hooks/use-converter';
import { Download, RotateCcw } from 'lucide-react';

export default function FormatPage() {
  const { format } = useParams<{ format: string }>();
  const page = format ? getFormatPageBySlug(`to-${format}`) : undefined;

  const {
    fileInfo, status, progress, result, error, handleFile, convert, reset,
  } = useConverter(page?.targetFormat);

  if (!page) return <Navigate to="/" replace />;

  const isConverting = status === 'converting';
  const isDone = status === 'done';
  const acceptHint = page.acceptedInputs.map(e => `.${e.toUpperCase()}`).join(', ');

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

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-extrabold text-foreground">{page.label}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{page.description}</p>

      <div className="mt-2">
        <span className="inline-block rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
          Output: .{page.targetFormat}
        </span>
      </div>

      <div className="mt-8 space-y-4">
        <DropZone
          onFile={handleFile}
          fileInfo={fileInfo}
          onClear={reset}
          disabled={isConverting}
          acceptHint={acceptHint}
        />

        <ConversionProgress status={status} progress={progress} />
        {error && <p className="text-sm text-destructive">{error}</p>}

        {fileInfo && !isDone && (
          <button
            onClick={convert}
            disabled={isConverting}
            className="h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
          >
            {isConverting ? 'Converting…' : `Convert to ${page.targetFormat.toUpperCase()}`}
          </button>
        )}

        {isDone && (
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
            >
              <Download className="h-4 w-4" />
              Download {result?.filename}
            </button>
            <button
              onClick={reset}
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
