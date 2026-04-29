import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Application error boundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
          <div className="max-w-lg text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Storefront error</p>
            <h1 className="text-3xl font-bold">Something went wrong.</h1>
            <p className="text-slate-300">
              Refresh the page to try again. If the problem continues, check your API environment
              configuration and backend availability.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
