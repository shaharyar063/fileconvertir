import { getAllPrerenderPages } from '../src/lib/prerender-meta.ts';
import { converterRoutes, formatPages } from '../src/lib/converters.ts';
import { conversionMap } from '../src/lib/conversion-map.ts';
import { getAllSitewideNavLinks } from '../src/lib/site-navigation.ts';

const pages = getAllPrerenderPages();
const issues = [];
const titles = new Map();
const descs = new Map();

for (const p of pages) {
  if (p.title.length > 60) issues.push({ type: 'title_long', path: p.path || '/', len: p.title.length });
  if (p.title.length < 20) issues.push({ type: 'title_short', path: p.path || '/', len: p.title.length });
  if (p.description.length > 160) issues.push({ type: 'desc_long', path: p.path || '/', len: p.description.length });
  if (p.description.length < 70) issues.push({ type: 'desc_short', path: p.path || '/', len: p.description.length });
  if (p.path && !p.canonical.endsWith('/')) issues.push({ type: 'canonical_slash', path: p.path, canonical: p.canonical });

  const t = titles.get(p.title) || [];
  t.push(p.path || '/');
  titles.set(p.title, t);
  const d = descs.get(p.description) || [];
  d.push(p.path || '/');
  descs.set(p.description, d);
}

const dupTitles = [...titles.entries()].filter(([, p]) => p.length > 1);
const dupDescs = [...descs.entries()].filter(([, p]) => p.length > 1);
const nav = getAllSitewideNavLinks();
const badNav = nav.filter((l) => l.href !== '/' && !l.href.endsWith('/'));

const targets = new Set();
conversionMap.forEach((e) => e.targets.forEach((t) => targets.add(t)));
const expectedSitemap = 1 + converterRoutes.length + new Set(conversionMap.map((e) => e.source)).size + targets.size;

console.log(
  JSON.stringify(
    {
      summary: {
        prerenderPages: pages.length,
        sitemapUrlsExpected: expectedSitemap,
        converterRoutes: converterRoutes.length,
        sourceHubs: new Set(conversionMap.map((e) => e.source)).size,
        targetHubs: formatPages.length,
        inSitemapMatchPrerender: pages.length === expectedSitemap,
      },
      duplicates: {
        duplicateTitles: dupTitles.length,
        duplicateDescriptions: dupDescs.length,
        duplicateTitleExamples: dupTitles.slice(0, 8).map(([title, paths]) => ({
          title: title.slice(0, 70),
          count: paths.length,
          paths: paths.slice(0, 4),
        })),
        duplicateDescExamples: dupDescs.slice(0, 5).map(([desc, paths]) => ({
          desc: desc.slice(0, 90) + '…',
          count: paths.length,
        })),
      },
      internalLinks: { badNavHrefCount: badNav.length, badNavSample: badNav.slice(0, 5) },
      lengthIssues: {
        total: issues.length,
        byType: issues.reduce((acc, i) => {
          acc[i.type] = (acc[i.type] || 0) + 1;
          return acc;
        }, {}),
        samples: issues.slice(0, 15),
      },
    },
    null,
    2,
  ),
);
