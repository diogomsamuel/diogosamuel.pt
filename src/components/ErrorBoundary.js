import React from 'react';
import * as Sentry from '@sentry/nextjs';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to Sentry
    Sentry.captureException(error, { extra: errorInfo });
    
    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // Log error details to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Oops! Algo correu mal.
                </h2>
                <p className="text-gray-600 mb-6">
                  Pedimos desculpa pelo inconveniente. A nossa equipa foi notificada e está a trabalhar para resolver o problema.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Tentar novamente
                </button>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mt-6 text-left">
                    <details className="text-sm text-gray-500">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                        Detalhes técnicos
                      </summary>
                      <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto">
                        {this.state.error.toString()}
                        {'\n'}
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 