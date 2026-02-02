import React, { Component, ReactNode } from 'react';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#E4EEF0] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-[#16232A] mb-2">
              Oops! Something went wrong
            </h1>
            
            <p className="text-[#16232A]/60 mb-6">
              We're sorry for the inconvenience. The application encountered an unexpected error.
            </p>

            {this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm font-mono text-red-800 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={this.handleReload}
                variant="outline"
                className="flex-1"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Reload Page
              </Button>
              <Button
                onClick={this.handleReset}
                className="flex-1 bg-[#075056] hover:bg-[#075056]/90"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Route Error Element Component
export const RouteErrorElement: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#E4EEF0] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="h-20 w-20 bg-[#FF5B04]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-5xl font-bold text-[#FF5B04]">404</span>
        </div>
        
        <h1 className="text-2xl font-bold text-[#16232A] mb-2">
          Page Not Found
        </h1>
        
        <p className="text-[#16232A]/60 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-3">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="flex-1"
          >
            Go Back
          </Button>
          <Button
            onClick={handleGoHome}
            className="flex-1 bg-[#075056] hover:bg-[#075056]/90"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};
