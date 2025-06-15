
import { useState, useEffect } from "react";

interface UseLoadingOptions {
  initialDelay?: number;
  minDuration?: number;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const { initialDelay = 100, minDuration = 500 } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setShowContent(true);
    }, initialDelay);

    const minTimer = setTimeout(() => {
      setIsLoading(false);
    }, minDuration);

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(minTimer);
    };
  }, [initialDelay, minDuration]);

  return {
    isLoading: isLoading || !showContent,
    showContent
  };
};

export const useAsyncLoading = <T,>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await asyncFunction();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return { data, loading, error };
};
