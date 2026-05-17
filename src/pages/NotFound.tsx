import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDocumentHead } from '@/hooks/use-document-head';

const NotFound = () => {
  const location = useLocation();

  useDocumentHead({
    title: 'Page Not Found — FileConvertir',
    description: 'The page you are looking for does not exist. Return to FileConvertir to convert files in your browser.',
    noindex: true,
  });

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="mb-4 text-4xl font-extrabold text-foreground">404</h1>
        <p className="mb-6 text-base text-muted-foreground">
          Sorry, we could not find that page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
        >
          Back to FileConvertir
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
