import fs from 'fs';

const s = fs.readFileSync('src/lib/seo-content.ts', 'utf8');
const start = s.indexOf('const priorityDeepContent');
const end = s.indexOf('export function getConverterSEO');
const block = s.slice(start, end).trim();
const out = `import type { ConverterContentOverride } from '../types';

/** Tier S hand-written spotlight pages (migrated). */
export const PRIORITY_S_PAGES: Record<string, ConverterContentOverride> = ${block.replace('const priorityDeepContent', '').replace(/^:\s*Record[^=]*=\s*/, '')};

`;
// Fix: the replace won't work well. Manual approach - copy object only
const objStart = block.indexOf('{');
const objEnd = block.lastIndexOf('};');
const obj = block.slice(objStart, objEnd + 1);
const file = `import type { ConverterContentOverride } from '../types';

export const PRIORITY_S_PAGES: Record<string, ConverterContentOverride> = ${obj};
`;
fs.writeFileSync('src/lib/seo/converters/tier-s/priority.ts', file);
console.log('priority.ts bytes', file.length);
