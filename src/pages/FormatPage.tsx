import { useParams } from 'react-router-dom';
import { getFormatPageBySlug, converterRoutes } from '@/lib/converters';
import { getFormatSEO } from '@/lib/seo-content';
import { formatLabel } from '@/lib/format-label';
import { HeroConverter } from '@/components/HeroConverter';
import { FormatPageView } from '@/components/FormatPageView';
import NotFound from './NotFound';

/** `/to-pdf/` — about a target format, with the tool preset to convert to it. */
export default function FormatPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getFormatPageBySlug(slug) : undefined;
  if (!page) return <NotFound />;
  const label = formatLabel(page.targetFormat);

  return (
    <FormatPageView
      key={page.slug}
      seo={getFormatSEO(page.targetFormat)}
      path={page.slug}
      format={page.targetFormat}
      convertingHeading={`Converting Files to ${label}`}
      linksHeading={`Convert to ${label} From`}
      routes={converterRoutes.filter((r) => r.targetFormat === page.targetFormat)}
      tool={<HeroConverter initialTarget={page.targetFormat} lockTarget />}
    />
  );
}
