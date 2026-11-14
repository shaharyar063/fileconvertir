import { converterRoutes, formatPages } from './converters';
import {
  getConverterSEO,
  getFormatSEO,
  getHomepageSEO,
  getSourceFormatSEO,
} from './seo-content';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildHowToSchema,
} from './seo-jsonld';
import { getAllSitewideNavLinks, getPrerenderInternalLinks } from './site-navigation';
import { SITE_URL, absoluteUrl, canonicalSlug } from './site-url';

export { SITE_URL };

export interface PrerenderPageMeta {
  /** URL path without leading slash, e.g. `png-to-jpg`. Empty string = homepage. */
  path: string;
  title: string;
  description: string;
  canonical: string;
  heading: string;
  jsonLd?: object[];
  /** Emit robots noindex,follow (thin template pages). */
  noindex?: boolean;
  /** Static, crawlable body content placed inside #root (replaced by React on load). */
  bodyHtml?: string;
}

interface BodyParts {
  heading: string;
  description: string;
  paragraphs?: (string | undefined)[];
  steps?: { name: string; text: string }[];
  listTitle?: string;
  list?: string[];
  infoBlocks?: { title: string; text: string }[];
  faqs?: { q: string; a: string }[];
  article?: { heading: string; paragraphs: string[] }[];
}

const e = (v: string) => escapeHtml(v);

function buildBodyHtml(p: BodyParts): string {
  const out: string[] = [`<h1>${e(p.heading)}</h1>`, `<p>${e(p.description)}</p>`];
  for (const para of p.paragraphs ?? []) if (para) out.push(`<p>${e(para)}</p>`);
  if (p.steps?.length) {
    out.push(`<h2>How to ${e(p.heading)}</h2><ol>`);
    for (const st of p.steps) out.push(`<li><strong>${e(st.name)}</strong> ${e(st.text)}</li>`);
    out.push('</ol>');
  }
  for (const b of p.infoBlocks ?? []) out.push(`<h2>${e(b.title)}</h2><p>${e(b.text)}</p>`);
  for (const sec of p.article ?? []) {
    out.push(`<h2>${e(sec.heading)}</h2>`);
    for (const para of sec.paragraphs) out.push(`<p>${e(para)}</p>`);
  }
  if (p.list?.length) {
    out.push(`<h2>${e(p.listTitle ?? 'Use cases')}</h2><ul>`);
    for (const li of p.list) out.push(`<li>${e(li)}</li>`);
    out.push('</ul>');
  }
  if (p.faqs?.length) {
    out.push('<h2>Frequently Asked Questions</h2>');
    for (const f of p.faqs) out.push(`<h3>${e(f.q)}</h3><p>${e(f.a)}</p>`);
  }
  return out.join('\n');
}

export function getAllPrerenderPages(): PrerenderPageMeta[] {
  const home = getHomepageSEO();
  const pages: PrerenderPageMeta[] = [
    {
      path: '',
      title: home.title,
      description: home.metaDescription,
      canonical: `${SITE_URL}/`,
      heading: home.heading,
      bodyHtml: buildBodyHtml({
        heading: home.heading,
        description: home.description,
        faqs: home.faqs,
      }),
    },
  ];

  for (const route of converterRoutes) {
    const seo = getConverterSEO(route.sourceFormat, route.targetFormat);
    const schemas: object[] = [
      buildFAQSchema(seo.faqs),
      buildBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl() },
        { name: seo.heading, url: absoluteUrl(canonicalSlug(route.slug)) },
      ]),
    ];
    if (seo.howToSteps?.length) {
      schemas.push(buildHowToSchema(`How to ${seo.heading}`, seo.howToSteps));
    }
    pages.push({
      path: route.slug,
      title: seo.title,
      description: seo.metaDescription,
      canonical: absoluteUrl(route.slug),
      heading: seo.heading,
      jsonLd: schemas,
      bodyHtml: buildBodyHtml({
        heading: seo.heading,
        description: seo.description,
        paragraphs: [seo.longDescription],
        steps: seo.howToSteps,
        infoBlocks: [
          { title: `About ${route.sourceFormat.toUpperCase()}`, text: seo.sourceInfo },
          { title: `About ${route.targetFormat.toUpperCase()}`, text: seo.targetInfo },
        ],
        article: seo.article,
        listTitle: `Why convert ${route.sourceFormat.toUpperCase()} to ${route.targetFormat.toUpperCase()}?`,
        list: seo.useCases,
        faqs: seo.faqs,
      }),
    });
  }

  const sources = new Set(converterRoutes.map((r) => r.sourceFormat));
  for (const source of sources) {
    const seo = getSourceFormatSEO(source);
    pages.push({
      path: source,
      title: seo.title,
      description: seo.metaDescription,
      canonical: absoluteUrl(source),
      heading: seo.heading,
      bodyHtml: buildBodyHtml({ heading: seo.heading, description: seo.description, paragraphs: [seo.details, seo.longDescription], list: seo.useCases, faqs: seo.faqs }),
      jsonLd: [
        buildFAQSchema(seo.faqs),
        buildBreadcrumbSchema([
          { name: 'Home', url: absoluteUrl() },
          { name: seo.heading, url: absoluteUrl(source) },
        ]),
      ],
    });
  }

  for (const page of formatPages) {
    const seo = getFormatSEO(page.targetFormat);
    pages.push({
      path: page.slug,
      title: seo.title,
      description: seo.metaDescription,
      canonical: absoluteUrl(page.slug),
      heading: seo.heading,
      bodyHtml: buildBodyHtml({ heading: seo.heading, description: seo.description, paragraphs: [seo.details, seo.longDescription], list: seo.useCases, faqs: seo.faqs }),
      jsonLd: [
        buildFAQSchema(seo.faqs),
        buildBreadcrumbSchema([
          { name: 'Home', url: absoluteUrl() },
          { name: seo.heading, url: absoluteUrl(page.slug) },
        ]),
      ],
    });
  }

  return pages;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function injectPageMeta(html: string, page: PrerenderPageMeta): string {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const canonical = escapeHtml(page.canonical);
  const heading = escapeHtml(page.heading);

  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${canonical}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${description}" />`,
    );

  const pathForNav = page.path ? `/${page.path}` : '/';
  const pageLinks = getPrerenderInternalLinks(pathForNav);
  const sitewide = getAllSitewideNavLinks();
  const navByHref = new Map<string, string>();
  for (const link of [...pageLinks, ...sitewide]) {
    navByHref.set(link.href, link.label);
  }
  const navItems = [...navByHref.entries()]
    .map(
      ([href, label]) =>
        `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`,
    )
    .join('\n        ');

  // Visually hidden (not display:none): crawlers and screen readers still get the
  // full content, but users never see an unstyled flash before React mounts.
  const body = `<div data-prerender="true" style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0">
      ${page.bodyHtml ?? `<h1>${heading}</h1><p>${description}</p>`}
      <nav aria-label="Site navigation" style="margin-top:2rem">
        <h2 style="font-size:1rem;margin:0 0 0.75rem">All converters</h2>
        <ul style="columns:3;column-gap:1.5rem;font-size:0.75rem;line-height:1.6;list-style:none;padding:0;margin:0">
        ${navItems}
        </ul>
      </nav>
    </div>`;

  if (!out.includes('data-prerender="true"')) {
    out = out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  }

  if (page.noindex) {
    out = out.replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/,
      '<meta name="robots" content="noindex, follow" />',
    );
  }

  if (page.jsonLd?.length) {
    const jsonLdScript = `<script type="application/ld+json" data-seo-jsonld="prerender">\n${JSON.stringify(page.jsonLd, null, 2)}\n    </script>`;
    // Keep the sitewide WebSite/WebApplication block; add the page schema after it.
    out = out.replace(/(<script type="application\/ld\+json">[\s\S]*?<\/script>)/, `$1\n    ${jsonLdScript}`);
  }

  return out;
}
