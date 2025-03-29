import React, { Component, ErrorInfo, ReactNode } from 'react';
import NotFound from '@/app/not-found';
import GlobalError from 'next/dist/client/components/error-boundary';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Aquí puedes registrar el error en algún servicio de registro de errores
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
             <GlobalError
                error={{ message: 'Page not found' }} // Puedes personalizar este mensaje según tu necesidad// Ajusta la función reset según lo que necesites
        />
          <h2>Oops, something went wrong!</h2>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;