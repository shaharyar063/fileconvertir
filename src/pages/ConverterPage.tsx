import { useParams } from 'react-router-dom';
import { getConverterBySlug } from '@/lib/converters';
import { getConversionPage } from '@/lib/seo/pages';
import { ConversionPageView } from '@/components/ConversionPageView';
import NotFound from './NotFound';

export default function ConverterPage() {
  const { slug } = useParams<{ slug: string }>();
  const route = slug ? getConverterBySlug(slug) : undefined;
  const page = route ? getConversionPage(route.slug) : undefined;
  if (!route || !page) return <NotFound />;
  // `key` resets the converter when navigating between conversion pages.
  return <ConversionPageView key={route.slug} route={route} page={page} />;
}
