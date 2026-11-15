import { useParams } from 'react-router-dom';
import { getSourceFormatPage, converterRoutes } from '@/lib/converters';
import { getSourceFormatSEO } from '@/lib/seo-content';
import { formatLabel } from '@/lib/format-label';
import { HeroConverter } from '@/components/HeroConverter';
import { FormatPageView } from '@/components/FormatPageView';
import NotFound from './NotFound';

/** `/png/` — about a format, with the tool preset to convert from it. */
export default function SourceFormatPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getSourceFormatPage(slug) : undefined;
  if (!page) return <NotFound />;
  const label = formatLabel(page.sourceFormat);

  return (
    <FormatPageView
      key={page.sourceFormat}
      seo={getSourceFormatSEO(page.sourceFormat)}
      path={page.sourceFormat}
      format={page.sourceFormat}
      convertingHeading={`Converting ${label} Files`}
      linksHeading={`${label} Conversions`}
      routes={converterRoutes.filter((r) => r.sourceFormat === page.sourceFormat)}
      tool={<HeroConverter initialSource={page.sourceFormat} lockSource />}
    />
  );
}
