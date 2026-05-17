import { useEffect } from 'react';

interface DocumentHeadOptions {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object;
  /** Set to true for pages that should be excluded from search engines (e.g. 404). */
  noindex?: boolean;
}

const DEFAULT_ROBOTS =
  'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

/**
 * Sets dynamic <title>, <meta description>, <link rel="canonical">,
 * robots directive, and optional JSON-LD structured data for SEO.
 */
export function useDocumentHead({
  title,
  description,
  canonical,
  jsonLd,
  noindex,
}: DocumentHeadOptions) {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    setMetaTag('robots', noindex ? 'noindex, follow' : DEFAULT_ROBOTS);

    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    if (canonical) {
      setMetaProperty('og:url', canonical);
    }

    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.rel = 'canonical';
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.href = canonical;
    } else if (linkCanonical) {
      linkCanonical.remove();
    }

    const existingScript = document.querySelector('script[data-seo-jsonld]');
    if (existingScript) existingScript.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.querySelector('script[data-seo-jsonld]');
      if (script) script.remove();
    };
  }, [title, description, canonical, jsonLd, noindex]);
}

function setMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}
