
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseUrlStateOptions<T> {
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
  paramName: string;
}

export const useUrlState = <T,>({
  defaultValue,
  serialize = String,
  deserialize = (value: string) => value as T,
  paramName
}: UseUrlStateOptions<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const getUrlValue = useCallback(() => {
    const urlValue = searchParams.get(paramName);
    if (urlValue === null) return defaultValue;
    
    try {
      return deserialize(urlValue);
    } catch {
      return defaultValue;
    }
  }, [searchParams, paramName, defaultValue, deserialize]);

  const [state, setState] = useState<T>(getUrlValue);

  // Sync state with URL on mount and URL changes
  useEffect(() => {
    setState(getUrlValue());
  }, [getUrlValue]);

  const updateState = useCallback((newValue: T | ((prev: T) => T)) => {
    const value = typeof newValue === 'function' ? (newValue as (prev: T) => T)(state) : newValue;
    
    setState(value);
    
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (value === defaultValue) {
      newSearchParams.delete(paramName);
    } else {
      newSearchParams.set(paramName, serialize(value));
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [state, searchParams, setSearchParams, paramName, serialize, defaultValue]);

  return [state, updateState] as const;
};

// Specialized hooks for common use cases
export const useUrlStringState = (paramName: string, defaultValue: string = '') => {
  return useUrlState({
    paramName,
    defaultValue,
  });
};

export const useUrlNumberState = (paramName: string, defaultValue: number = 1) => {
  return useUrlState({
    paramName,
    defaultValue,
    serialize: (value: number) => value.toString(),
    deserialize: (value: string) => {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? defaultValue : parsed;
    },
  });
};
