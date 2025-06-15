
import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorFallback from "@/components/ui/ErrorFallback";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showHome?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorId: Date.now().toString()
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Report error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: reportError(error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorId: undefined 
    });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center p-8">
          <ErrorFallback
            error={this.state.error}
            resetError={this.handleRetry}
            type="component"
            title={this.props.componentName ? `${this.props.componentName} Error` : undefined}
            description={this.props.componentName 
              ? `There was an error loading the ${this.props.componentName} component.`
              : undefined
            }
            showHome={this.props.showHome}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
