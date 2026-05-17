import { describe, expect, it } from 'vitest';
import { formatConversionError } from '@/lib/conversion-errors';

describe('conversion-errors', () => {
  it('maps FFMPEG_UNAVAILABLE to a friendly message', () => {
    const err = formatConversionError(new Error('FFMPEG_UNAVAILABLE'));
    expect(err.message).toContain('media converter');
  });

  it('preserves generic conversion errors', () => {
    const err = formatConversionError(new Error('Invalid file'));
    expect(err.message).toBe('Invalid file');
  });
});
