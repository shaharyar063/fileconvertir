import fs from 'fs';

const s = fs.readFileSync('src/lib/seo-content.ts', 'utf8');
const start = s.indexOf('const formatNames');
const end = s.indexOf('function name(ext: string)');
const block = s.slice(start, end);
const helpers = `
export function name(ext: string): string {
  return formatNames[ext] || ext.toUpperCase();
}

export function desc(ext: string): string {
  return formatDescriptions[ext] || \`\${name(ext)} file format.\`;
}

export function formatNameList(formats: string[], maxNames = 3): string {
  const unique = [...new Set(formats)];
  if (unique.length === 0) return 'many formats';
  const shown = unique.slice(0, maxNames).map((f) => name(f));
  if (unique.length <= maxNames) return shown.join(', ');
  return \`\${shown.join(', ')} & more\`;
}
`;
fs.writeFileSync('src/lib/seo/format-names.ts', block + helpers);
