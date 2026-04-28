import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // In production, log this to an error reporting service like Sentry
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 font-sans">
          <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center mb-6">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-medium text-[#E1E0CC] mb-4">Something went wrong.</h1>
          <p className="text-gray-400 text-sm md:text-base max-w-md mb-8">
            We've encountered an unexpected error. Please refresh the page or return to the home screen.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-black font-medium py-3 px-8 rounded-full hover:bg-white transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
