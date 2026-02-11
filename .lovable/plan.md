

# Build Working Cloud Conversion Backend

## Overview

Create a Lovable Cloud edge function that handles all conversions marked as `cloudTargets` in the conversion map. The frontend `useConverter` hook will be updated to detect cloud conversions and upload files to the edge function instead of processing locally. This makes video transcoding, document conversion, audio encoding, font processing, and archive operations fully functional.

## Architecture

The system will use a single edge function (`convert-file`) that:
1. Receives the file + source/target format via multipart form data
2. Routes to the appropriate conversion logic server-side
3. Returns the converted file as a binary response

The frontend detects whether a conversion is browser or cloud, and routes accordingly.

```text
User uploads file
       |
  [useConverter hook]
       |
  isCloudConversion?
      / \
   No    Yes
    |      |
 [Local]  [POST to /convert-file]
 Canvas    Edge function processes
 JSZip     with native libraries
    |      |
    v      v
  Download result
```

## Implementation Plan

### 1. Edge Function: `supabase/functions/convert-file/index.ts`

A single edge function that:
- Handles CORS preflight
- Accepts multipart/form-data with fields: `file`, `sourceFormat`, `targetFormat`
- Validates the conversion pair against the conversion map rules
- Performs the conversion using Deno-compatible libraries
- Returns the converted file blob with appropriate Content-Type and Content-Disposition headers

Supported cloud conversions will be implemented in phases based on what's feasible in the Deno edge runtime:

**Phase 1 - Immediately implementable:**
- Image to PDF (using jsPDF or pdf-lib in Deno)
- Document text extractions (TXT, HTML, MD interconversions)
- Font conversions (WOFF2, EOT via Deno-compatible libraries)
- Archive conversions (ZIP, TAR, GZ using Deno built-in APIs)
- Audio format conversions (WAV encoding from decoded audio)

**Phase 2 - Requires external processing or workarounds:**
- Video transcoding (FFmpeg not available in edge functions; will return clear error)
- Complex document conversions like DOCX-to-PDF (LibreOffice not available; will return clear error)
- RAR/7Z/ISO extraction (proprietary formats; will return clear error)

For unsupported conversions, the edge function returns a clear JSON error with status 422.

### 2. Frontend: Cloud Conversion Service

Create `src/lib/cloud-converter.ts`:
- A function `convertViaCloud(file, sourceFormat, targetFormat, onProgress)` that:
  - Uploads the file to the edge function via fetch with multipart/form-data
  - Handles progress via upload events where possible
  - Returns `ConversionResult` (blob + filename + mimeType)
  - Handles errors gracefully

### 3. Update `useConverter` Hook

Modify `src/hooks/use-converter.ts`:
- Import `isCloudConversion` from conversion-map
- Import `convertViaCloud` from cloud-converter
- In the `convert` function, check if `isCloudConversion(source, target)`
  - If yes: call `convertViaCloud`
  - If no: call `registry.convert` (existing browser logic)

### 4. Update Converter Plugins (Remove "Coming Soon" Errors)

Update each converter plugin to remove the fallback `throw new Error("...coming soon")` for cloud targets. Instead, the `useConverter` hook handles routing. The plugins only handle browser-capable conversions.

### 5. Config Update

Update `supabase/config.toml` to disable JWT verification for the convert-file function (public endpoint, no auth needed):

```toml
[functions.convert-file]
verify_jwt = false
```

## Technical Details

### Edge Function Structure

```text
supabase/functions/convert-file/index.ts
  - CORS headers
  - Parse multipart form data
  - Validate source/target pair
  - Route to converter handler:
    - handleImageConversion()
    - handleDocumentConversion()
    - handleAudioConversion()
    - handleFontConversion()
    - handleArchiveConversion()
  - Return binary response with headers
```

### File Size Considerations
- Edge functions have memory and execution time limits
- Files up to ~50MB should work for most conversions
- Large video files will hit limits; the function will return a 413 error for oversized files

### Error Handling Strategy
- Validation errors: 400 status with JSON error message
- Unsupported conversions: 422 status with explanation
- File too large: 413 status
- Processing errors: 500 status with error details
- All errors include CORS headers

### Files to Create
- `supabase/functions/convert-file/index.ts` - The edge function

### Files to Modify
- `supabase/config.toml` - Add function config
- `src/lib/cloud-converter.ts` - New cloud conversion client
- `src/hooks/use-converter.ts` - Add cloud routing logic
- `src/converters/document-converter.ts` - Remove "coming soon" throws for cloud-handled targets
- `src/converters/audio-converter.ts` - Same cleanup
- `src/converters/video-converter.ts` - Same cleanup
- `src/converters/font-converter.ts` - Same cleanup
- `src/converters/archive-converter.ts` - Same cleanup

