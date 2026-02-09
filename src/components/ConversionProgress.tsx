import { motion } from 'framer-motion';
import { ConversionStatus } from '@/lib/converter-types';

interface ConversionProgressProps {
  status: ConversionStatus;
  progress: number;
}

const statusLabels: Record<ConversionStatus, string> = {
  idle: '',
  uploading: 'Preparing…',
  converting: 'Converting…',
  done: 'Done!',
  error: 'Failed',
};

export function ConversionProgress({ status, progress }: ConversionProgressProps) {
  if (status === 'idle') return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className={`font-medium ${status === 'done' ? 'text-success' : status === 'error' ? 'text-destructive' : 'text-foreground'}`}>
          {statusLabels[status]}
        </span>
        {status === 'converting' && (
          <span className="font-mono text-muted-foreground">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={`h-full rounded-full ${status === 'done' ? 'bg-success' : status === 'error' ? 'bg-destructive' : 'bg-primary'}`}
          initial={{ width: 0 }}
          animate={{ width: status === 'done' ? '100%' : `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
