import { ConversionOption } from '@/lib/converter-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormatSelectorProps {
  formats: ConversionOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function FormatSelector({ formats, value, onChange, disabled }: FormatSelectorProps) {
  if (formats.length === 0) return null;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Convert to</label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full bg-card/60 border-border/60 h-12 text-base font-mono">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          {formats.map((f) => (
            <SelectItem key={f.targetFormat} value={f.targetFormat} className="font-mono">
              .{f.label}
              {f.description && (
                <span className="ml-2 text-muted-foreground text-xs font-sans">{f.description}</span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
