import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Download, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropZone } from '@/components/DropZone';
import { FormatSelector } from '@/components/FormatSelector';
import { ConversionProgress } from '@/components/ConversionProgress';
import { useConverter } from '@/hooks/use-converter';
import { formatFileSize } from '@/lib/converter-types';

export default function Index() {
  const {
    fileInfo,
    targetFormat,
    setTargetFormat,
    status,
    progress,
    result,
    error,
    targetFormats,
    handleFile,
    convert,
    reset,
  } = useConverter();

  const isConverting = status === 'converting';
  const isDone = status === 'done';

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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-16">
      {/* Background grid */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
          >
            <Zap className="h-3 w-3 text-primary" />
            Client-side · No uploads · 100% private
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-gradient">Quick</span>
            <span className="text-foreground">Convert</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Drop a file, pick a format, done.
          </p>
        </div>

        {/* Converter Card */}
        <motion.div
          className="glass rounded-2xl p-6 md:p-8 space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DropZone
            onFile={handleFile}
            fileInfo={fileInfo}
            onClear={reset}
            disabled={isConverting}
          />

          {fileInfo && targetFormats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              <FormatSelector
                formats={targetFormats}
                value={targetFormat}
                onChange={setTargetFormat}
                disabled={isConverting || isDone}
              />

              <ConversionProgress status={status} progress={progress} />

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-destructive"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex gap-3">
                {isDone ? (
                  <>
                    <Button
                      onClick={handleDownload}
                      className="flex-1 h-12 gap-2 bg-success hover:bg-success/90 text-success-foreground font-semibold"
                    >
                      <Download className="h-4 w-4" />
                      Download {result?.filename}
                    </Button>
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="h-12 gap-2 border-border/60"
                    >
                      <RotateCcw className="h-4 w-4" />
                      New
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={convert}
                    disabled={!targetFormat || isConverting}
                    className="flex-1 h-12 gap-2 font-semibold glow-primary-sm"
                  >
                    {isConverting ? (
                      <motion.div
                        className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                    {isConverting ? 'Converting…' : 'Convert'}
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {error && !fileInfo && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-destructive text-center"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-xs text-muted-foreground/60"
        >
          Files never leave your browser. All conversions happen locally.
        </motion.p>
      </motion.div>
    </div>
  );
}
