import { useNavigate } from 'react-router-dom';
import { DropZone } from '@/components/DropZone';
import { FormatChips } from '@/components/FormatChips';
import { ConversionProgress } from '@/components/ConversionProgress';
import { useConverter } from '@/hooks/use-converter';
import { formatPages } from '@/lib/converters';
import { Download, RotateCcw } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const {
    fileInfo,
    targetFormat,
    setTargetFormat,
    targetFormats,
    status,
    progress,
    result,
    error,
    handleFile,
    convert,
    reset,
  } = useConverter();

  const isConverting = status === 'converting';
  const isDone = status === 'done';
  const canConvert = !!fileInfo && !!targetFormat && !isConverting && !isDone;

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
    <div className="mx-auto max-w-xl px-4 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Fast File Conversion.<br />No Signup.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload a file and we'll show you what it can become.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <DropZone
          onFile={handleFile}
          fileInfo={fileInfo}
          onClear={reset}
          disabled={isConverting}
        />

        {fileInfo && targetFormats.length > 0 && !isDone && (
          <FormatChips
            formats={targetFormats}
            value={targetFormat}
            onChange={setTargetFormat}
            disabled={isConverting}
          />
        )}

        {fileInfo && targetFormats.length === 0 && !error && (
          <p className="text-sm text-destructive">
            No conversions available for .{fileInfo.extension} files yet.
          </p>
        )}

        <ConversionProgress status={status} progress={progress} />

        {error && <p className="text-sm text-destructive">{error}</p>}

        {canConvert && (
          <button
            onClick={convert}
            className="h-10 w-full rounded bg-primary text-sm font-semibold text-primary-foreground hover:brightness-90"
          >
            Convert to {targetFormat.toUpperCase()}
          </button>
        )}

        {isDone && (
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded bg-primary text-sm font-semibold text-primary-foreground hover:brightness-90"
            >
              <Download className="h-4 w-4" />
              Download {result?.filename}
            </button>
            <button
              onClick={reset}
              className="flex h-10 items-center gap-2 rounded border border-border px-4 text-sm text-foreground hover:bg-secondary"
            >
              <RotateCcw className="h-4 w-4" />
              New
            </button>
          </div>
        )}
      </div>

      {/* Format page links */}
      <div className="mt-16 border-t border-border pt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Convert to Format</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {formatPages.map((p) => (
            <a
              key={p.slug}
              href={`/${p.slug}`}
              onClick={(e) => { e.preventDefault(); navigate(`/${p.slug}`); }}
              className="rounded border border-border px-3 py-2 text-sm text-foreground hover:border-primary hover:text-primary"
            >
              {p.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
