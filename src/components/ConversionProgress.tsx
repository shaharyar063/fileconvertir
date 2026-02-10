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
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className={`font-bold ${status === 'done' ? 'text-success' : status === 'error' ? 'text-destructive' : 'text-foreground'}`}>
          {statusLabels[status]}
        </span>
        {status === 'converting' && (
          <span className="text-muted-foreground font-medium">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            status === 'done' ? 'bg-success' : status === 'error' ? 'bg-destructive' : 'bg-primary'
          }`}
          style={{ width: status === 'done' ? '100%' : `${progress}%` }}
        />
      </div>
    </div>
  );
}
