
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface AppError {
  message: string;
  code?: string;
  status?: number;
  timestamp: Date;
  context?: string;
}

export const useErrorHandler = () => {
  const [error, setError] = useState<AppError | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);

  const handleError = useCallback((error: Error | AppError, context?: string) => {
    console.error('Error caught:', error, { context });
    
    const appError: AppError = {
      message: error.message || 'An unexpected error occurred',
      timestamp: new Date(),
      context,
      ...(error instanceof Error ? {} : error)
    };

    setError(appError);

    // Show toast notification for user feedback
    toast({
      title: "Something went wrong",
      description: appError.message,
      variant: "destructive",
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setIsRecovering(false);
  }, []);

  const retry = useCallback(async (retryFn?: () => Promise<void>) => {
    if (!retryFn) {
      clearError();
      return;
    }

    setIsRecovering(true);
    try {
      await retryFn();
      clearError();
    } catch (err) {
      handleError(err as Error, 'Retry failed');
    } finally {
      setIsRecovering(false);
    }
  }, [handleError, clearError]);

  return {
    error,
    isRecovering,
    handleError,
    clearError,
    retry
  };
};

// Network error handler for API calls
export const handleNetworkError = (error: any): AppError => {
  if (!navigator.onLine) {
    return {
      message: 'No internet connection. Please check your network.',
      code: 'NETWORK_OFFLINE',
      timestamp: new Date()
    };
  }

  if (error?.status >= 500) {
    return {
      message: 'Server error. Please try again later.',
      code: 'SERVER_ERROR',
      status: error.status,
      timestamp: new Date()
    };
  }

  if (error?.status === 404) {
    return {
      message: 'The requested content was not found.',
      code: 'NOT_FOUND',
      status: 404,
      timestamp: new Date()
    };
  }

  if (error?.status >= 400) {
    return {
      message: 'There was a problem with your request.',
      code: 'CLIENT_ERROR',
      status: error.status,
      timestamp: new Date()
    };
  }

  return {
    message: error?.message || 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    timestamp: new Date()
  };
};
