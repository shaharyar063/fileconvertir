import { useNavigate } from 'react-router-dom';
import { DropZone } from '@/components/DropZone';
import { FormatChips } from '@/components/FormatChips';
import { ConversionProgress } from '@/components/ConversionProgress';
import { useConverter } from '@/hooks/use-converter';
import { converterRoutes } from '@/lib/converters';
import { getTotalConversions } from '@/lib/seo-content';
import { Download, RotateCcw, Image, FileText, Music, Film, Type, Archive, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { key: 'Image', icon: Image, label: 'Images', desc: 'PNG, JPG, WebP, AVIF, GIF, BMP, TIFF, SVG, HEIC, ICO' },
  { key: 'Document', icon: FileText, label: 'Documents', desc: 'PDF, DOCX, TXT, HTML, Markdown, CSV, RTF' },
  { key: 'Audio', icon: Music, label: 'Audio', desc: 'MP3, WAV, AAC, OGG, FLAC, M4A' },
  { key: 'Video', icon: Film, label: 'Video', desc: 'MP4, MOV, WebM — extract audio' },
  { key: 'Font', icon: Type, label: 'Fonts', desc: 'TTF, OTF, WOFF, WOFF2' },
  { key: 'Archive', icon: Archive, label: 'Archives', desc: 'ZIP, TAR, GZ' },
];

const features = [
  { icon: Shield, title: '100% Private', desc: 'Files never leave your device. All processing happens in your browser.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'No upload wait. Conversions start instantly using local processing.' },
  { icon: Globe, title: 'No Signup', desc: 'Free to use, no account required. Just drop a file and convert.' },
];

export default function Index() {
  const navigate = useNavigate();
  const {
    fileInfo, targetFormat, setTargetFormat, targetFormats,
    status, progress, result, error, handleFile, convert, reset,
  } = useConverter();

  const isConverting = status === 'converting';
  const isDone = status === 'done';
  const canConvert = !!fileInfo && !!targetFormat && !isConverting && !isDone;
  const totalConversions = getTotalConversions();

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
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background">
        <div className="mx-auto max-w-4xl px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Zap className="h-3 w-3" />
              {totalConversions}+ conversion types supported
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Convert <span className="text-primary">Any File</span>
              <br />Right in Your Browser
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              The universal file converter. Images, documents, audio, video, fonts & archives — converted instantly, privately, for free.
            </p>
          </motion.div>

          {/* Converter Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 rounded-2xl border border-border bg-card p-6 glow-orange"
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
        </div>
      </section>

      {/* Features Row */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 py-12 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Sections */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">
            All Conversion Categories
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Choose a category below or upload any file above to get started.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const routes = converterRoutes.filter(r => r.category === cat.key);
            const topRoutes = routes.slice(0, 4);
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <cat.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{cat.label}</h3>
                    <p className="text-xs text-muted-foreground">{routes.length} converters</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                <div className="mt-4 space-y-1.5">
                  {topRoutes.map(r => (
                    <button
                      key={r.slug}
                      onClick={() => navigate(`/${r.slug}`)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      <span>{r.label}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </button>
                  ))}
                </div>
                {routes.length > 4 && (
                  <button
                    onClick={() => navigate('/converters')}
                    className="mt-3 text-xs font-semibold text-primary hover:underline"
                  >
                    View all {routes.length} {cat.label.toLowerCase()} converters →
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Popular Converters */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-center text-2xl font-extrabold text-foreground">
            Popular Converters
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {converterRoutes.slice(0, 12).map(r => (
              <button
                key={r.slug}
                onClick={() => navigate(`/${r.slug}`)}
                className="rounded-xl border border-border bg-card px-3 py-3 text-left text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/converters')}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View All {totalConversions} Converters
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
