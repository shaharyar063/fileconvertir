import { converterRoutes, formatPages } from './converters';
import { conversionMap } from './conversion-map';
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
    });
  }

  const sources = new Set(conversionMap.map((e) => e.source));
  for (const source of sources) {
    const seo = getSourceFormatSEO(source);
    pages.push({
      path: source,
      title: seo.title,
      description: seo.metaDescription,
      canonical: absoluteUrl(source),
      heading: seo.heading,
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

  const noscript = `<noscript data-prerender="true">
    <main style="max-width:48rem;margin:2rem auto;padding:0 1rem;font-family:system-ui,sans-serif">
      <h1>${heading}</h1>
      <p>${description}</p>
      <p><a href="/">FileConvertir — Free Online File Converter</a></p>
      <nav aria-label="Site navigation" style="margin-top:2rem">
        <h2 style="font-size:1rem;margin:0 0 0.75rem">All converters</h2>
        <ul style="columns:3;column-gap:1.5rem;font-size:0.75rem;line-height:1.6;list-style:none;padding:0;margin:0">
        ${navItems}
        </ul>
      </nav>
    </main>
  </noscript>`;

  if (!out.includes('data-prerender="true"')) {
    out = out.replace(/(<body[^>]*>)/, `$1\n    ${noscript}`);
  }

  if (page.jsonLd?.length) {
    const jsonLdScript = `<script type="application/ld+json" data-seo-jsonld="prerender">\n${JSON.stringify(page.jsonLd, null, 2)}\n    </script>`;
    out = out.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      jsonLdScript,
    );
  }

  return out;
}
