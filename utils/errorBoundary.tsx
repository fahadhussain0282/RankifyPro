import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component to catch and handle React errors
 * Prevents blank screen by showing error message instead
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-zinc-950 border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
              <p className="text-slate-400 text-sm mb-2">An unexpected error occurred. Please try again.</p>
              {this.state.error && (
                <p className="text-xs text-rose-400 font-mono bg-rose-500/10 border border-rose-500/20 rounded p-2 mb-4 max-h-24 overflow-auto">
                  {this.state.error.message}
                </p>
              )}
              <button
                onClick={this.handleReset}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
