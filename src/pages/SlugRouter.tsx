import { useParams, Navigate } from 'react-router-dom';
import { getConverterBySlug, getSourceFormatPage } from '@/lib/converters';
import ConverterPage from './ConverterPage';
import SourceFormatPage from './SourceFormatPage';

/**
 * Smart router: if slug matches a converter pair (e.g. png-to-jpg), render ConverterPage.
 * If it matches a source format (e.g. png), render SourceFormatPage.
 * Otherwise, redirect to home.
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

  return <Navigate to="/" replace />;
}
