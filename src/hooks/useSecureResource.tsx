
import { useState, useEffect } from 'react';
import { sanitizeExternalUrl } from '@/utils/security';

interface UseSecureResourceOptions {
  fallback?: string;
  onError?: (url: string) => void;
}

export const useSecureResource = (url: string, options: UseSecureResourceOptions = {}) => {
  const [secureUrl, setSecureUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const sanitizedUrl = sanitizeExternalUrl(url);
    
    if (sanitizedUrl) {
      setSecureUrl(sanitizedUrl);
      setIsLoading(false);
    } else {
      const errorMessage = `Blocked unsafe external resource: ${url}`;
      setError(errorMessage);
      setSecureUrl(options.fallback || null);
      setIsLoading(false);
      
      if (options.onError) {
        options.onError(url);
      }
    }
  }, [url, options.fallback, options.onError]);

  return {
    secureUrl,
    isLoading,
    error,
    isBlocked: error !== null
  };
};
