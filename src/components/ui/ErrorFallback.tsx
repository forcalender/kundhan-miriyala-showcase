
import React from 'react';
import { AlertTriangle, RefreshCw, Wifi, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorFallbackProps {
  error?: Error | null;
  resetError?: () => void;
  type?: 'network' | 'component' | 'page' | 'data';
  title?: string;
  description?: string;
  showRetry?: boolean;
  showHome?: boolean;
}

const ErrorFallback = ({
  error,
  resetError,
  type = 'component',
  title,
  description,
  showRetry = true,
  showHome = false
}: ErrorFallbackProps) => {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return <Wifi className="w-12 h-12 text-destructive" />;
      default:
        return <AlertTriangle className="w-12 h-12 text-destructive" />;
    }
  };

  const getErrorTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'network':
        return 'Connection Problem';
      case 'data':
        return 'Failed to Load Data';
      case 'page':
        return 'Page Error';
      default:
        return 'Something went wrong';
    }
  };

  const getErrorDescription = () => {
    if (description) return description;
    
    switch (type) {
      case 'network':
        return 'Please check your internet connection and try again.';
      case 'data':
        return 'We couldn\'t load the requested information. Please refresh the page.';
      case 'page':
        return 'There was an error loading this page. Please try refreshing or go back to the home page.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <Card className="max-w-md mx-auto border-destructive/20">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {getErrorIcon()}
        </div>
        <CardTitle className="text-destructive">
          {getErrorTitle()}
        </CardTitle>
        <CardDescription>
          {getErrorDescription()}
        </CardDescription>
        {error && process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {showRetry && resetError && (
          <Button onClick={resetError} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
        {showHome && (
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="secondary"
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorFallback;
