import { useEffect } from 'react';

interface DocumentHeadOptions {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: object;
}

/**
 * Sets dynamic <title>, <meta description>, <link rel="canonical">,
 * and optional JSON-LD structured data for SEO.
 */
export function useDocumentHead({ title, description, canonical, jsonLd }: DocumentHeadOptions) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // OG tags
    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);

    // Canonical
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

    // JSON-LD
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
      // Cleanup JSON-LD on unmount
      const script = document.querySelector('script[data-seo-jsonld]');
      if (script) script.remove();
    };
  }, [title, description, canonical, jsonLd]);
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
