import { getAllPrerenderPages } from '../src/lib/prerender-meta.ts';
import { isSitemapExcludedPath } from '../src/lib/site-url.ts';

const BANNED_META = /Convert .+ free online — no file upload, 100% private/;
const pages = getAllPrerenderPages().filter(
  (p) => !p.path || !isSitemapExcludedPath(p.path),
);

const issues = [];
const titles = new Map();
const descs = new Map();

for (const p of pages) {
  const key = p.path || '/';
  if (p.title.length > 60) issues.push({ type: 'title_long', path: key, len: p.title.length });
  if (p.description.length < 120) issues.push({ type: 'desc_short', path: key, len: p.description.length });
  if (p.description.length > 160) issues.push({ type: 'desc_long', path: key, len: p.description.length });
  if (BANNED_META.test(p.description)) issues.push({ type: 'banned_meta', path: key });

  const t = titles.get(p.title) ?? [];
  t.push(key);
  titles.set(p.title, t);
  const d = descs.get(p.description) ?? [];
  d.push(key);
  descs.set(p.description, d);
}

const dupTitles = [...titles.entries()].filter(([, v]) => v.length > 1);
const dupDescs = [...descs.entries()].filter(([, v]) => v.length > 1);

console.log(
  JSON.stringify(
    {
      indexablePages: pages.length,
      duplicateTitles: dupTitles.length,
      duplicateDescriptions: dupDescs.length,
      lengthIssues: issues.length,
      samples: {
        dupTitles: dupTitles.slice(0, 5).map(([t, paths]) => ({ title: t.slice(0, 55), paths })),
        dupDescs: dupDescs.slice(0, 3).map(([d, paths]) => ({ desc: d.slice(0, 80), count: paths.length })),
        issues: issues.slice(0, 10),
      },
    },
    null,
    2,
  ),
);

if (dupTitles.length || dupDescs.length) process.exitCode = 1;
