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

describe('formatConversionError network failures', () => {
  it('turns raw module-fetch errors into a friendly message', () => {
    const err = formatConversionError(
      new TypeError('Failed to fetch dynamically imported module: https://unpkg.com/x.js'),
    );
    expect(err.message).toMatch(/Could not download the media converter/);
  });
});
