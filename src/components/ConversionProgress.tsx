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
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className={`font-semibold ${status === 'done' ? 'text-success' : status === 'error' ? 'text-destructive' : 'text-foreground'}`}>
          {statusLabels[status]}
        </span>
        {status === 'converting' && (
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-sm bg-secondary">
        <div
          className={`h-full rounded-sm transition-all ${status === 'done' ? 'bg-success' : status === 'error' ? 'bg-destructive' : 'bg-primary'}`}
          style={{ width: status === 'done' ? '100%' : `${progress}%` }}
        />
      </div>
    </div>
  );
}
