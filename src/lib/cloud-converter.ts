import { ConversionResult } from './converter-types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function convertViaCloud(
  file: File,
  sourceFormat: string,
  targetFormat: string,
  onProgress?: (progress: number) => void
): Promise<ConversionResult> {
  onProgress?.(5);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('sourceFormat', sourceFormat);
  formData.append('targetFormat', targetFormat);

  onProgress?.(10);

  const response = await fetch(`${SUPABASE_URL}/functions/v1/convert-file`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
    },
    body: formData,
  });

  onProgress?.(80);

  if (!response.ok) {
    let errorMessage = 'Cloud conversion failed';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      errorMessage = `Cloud conversion failed with status ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  const blob = await response.blob();
  const filename = response.headers.get('X-Filename') || 
    `${file.name.replace(/\.[^/.]+$/, '')}.${targetFormat}`;
  const mimeType = response.headers.get('Content-Type') || 'application/octet-stream';

  onProgress?.(100);

  return { blob, filename, mimeType };
}
