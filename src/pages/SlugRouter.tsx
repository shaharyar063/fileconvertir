import { useParams, Navigate } from 'react-router-dom';
import { getConverterBySlug, getFormatPageBySlug, getSourceFormatPage } from '@/lib/converters';
import FormatPage from './FormatPage';
import NotFound from './NotFound';
import ConverterPage from './ConverterPage';
import SourceFormatPage from './SourceFormatPage';

/**
 * Smart router: if slug matches a converter pair (e.g. png-to-jpg), render ConverterPage.
 * If it matches a source format (e.g. png), render SourceFormatPage.
 * If it matches a target hub (to-pdf), render FormatPage.
 * Otherwise, render the 404 page.
 */
export default function SlugRouter() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/" replace />;

  // Check converter page first (more specific)
  if (getConverterBySlug(slug)) {
    return <ConverterPage />;
  }

  // Check source format page
  if (getSourceFormatPage(slug)) {
    return <SourceFormatPage />;
  }

  // Target hub pages: /to-pdf/, /to-jpg/ …
  // (React Router v6 cannot match a partial segment like `to-:format`, so the
  // prefix is resolved here instead.)
  if (getFormatPageBySlug(slug)) {
    return <FormatPage />;
  }

  // Unknown slug: render a noindex 404 instead of silently redirecting home.
  return <NotFound />;
}
