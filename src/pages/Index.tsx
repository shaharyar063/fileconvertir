import { useNavigate } from 'react-router-dom';
import { DropZone } from '@/components/DropZone';
import { FormatChips } from '@/components/FormatChips';
import { ConversionProgress } from '@/components/ConversionProgress';
import { useConverter } from '@/hooks/use-converter';
import { formatPages, converterRoutes } from '@/lib/converters';
import { Download, RotateCcw, Image, FileText, Music, Film, Type, Archive } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryIcons: Record<string, React.ReactNode> = {
  Image: <Image className="h-4 w-4" />,
  Document: <FileText className="h-4 w-4" />,
  Audio: <Music className="h-4 w-4" />,
  Video: <Film className="h-4 w-4" />,
  Font: <Type className="h-4 w-4" />,
  Archive: <Archive className="h-4 w-4" />,
};

export default function Index() {
  const navigate = useNavigate();
  const {
    fileInfo, targetFormat, setTargetFormat, targetFormats,
    status, progress, result, error, handleFile, convert, reset,
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

  const categories = [...new Set(converterRoutes.map(r => r.category))];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Convert <span className="text-primary">Any File</span>
          <br />Instantly.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Images, documents, audio, video, fonts & archives — all in your browser. No upload, no signup.
        </p>
      </motion.div>

      {/* Converter Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-12 rounded-2xl border border-border bg-card p-6 glow-orange"
      >
        <div className="space-y-4">
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
              className="h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Convert to {targetFormat.toUpperCase()}
            </button>
          )}

          {isDone && (
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
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
      </motion.div>

      {/* Format pages */}
      <div className="mt-16 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Convert to Format</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {formatPages.map((p) => (
            <button
              key={p.slug}
              onClick={() => navigate(`/${p.slug}`)}
              className="rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.map(cat => {
        const routes = converterRoutes.filter(r => r.category === cat);
        return (
          <div key={cat} className="mt-10 space-y-2">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {categoryIcons[cat]}
              {cat}
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {routes.map(r => (
                <button
                  key={r.slug}
                  onClick={() => navigate(`/${r.slug}`)}
                  className="rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
