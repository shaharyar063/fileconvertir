import { Navigate, useParams } from 'react-router-dom';

/** Client-side redirect to the trailing-slash URL (matches Cloudflare Pages). */
export function TrailingSlashRedirect({ prefix = '' }: { prefix?: string }) {
  const params = useParams();
  const segment = params.slug ?? params.format;
  if (!segment) return <Navigate to="/" replace />;
  const path = prefix ? `${prefix}${segment}` : segment;
  return <Navigate to={`/${path}/`} replace />;
}
