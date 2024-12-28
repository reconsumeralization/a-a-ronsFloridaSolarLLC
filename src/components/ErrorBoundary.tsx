"use client";

import { Component, ErrorInfo, ReactNode } from "react";

import { WarningIcon } from "@/components/Icons";
import { ClientButton } from "@/components/shared/ClientButton";
import { trackError } from "@/utils/analytics";
import { AppError } from "@/utils/errors";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Track error
    trackError(error, {
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // Call onError prop if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isOperationalError = this.state.error instanceof AppError &&
        this.state.error.isOperational;

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
              <WarningIcon className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {isOperationalError ? "Something went wrong" : "Unexpected Error"}
            </h1>

            <p className="text-gray-600 mb-6">
              {isOperationalError
                ? this.state.error?.message
                : "We apologize for the inconvenience. Our team has been notified and is working to fix this issue."}
            </p>

            {this.state.errorInfo?.componentStack && (
              <pre className="mt-4 p-4 bg-gray-100 rounded-lg text-left text-sm text-gray-700 overflow-auto">
                {this.state.errorInfo.componentStack}
              </pre>
            )}

            <div className="flex gap-4 justify-center mt-6">
              <ClientButton
                onClick={this.handleReset}
                variant="outline"
                size="lg"
              >
                Try Again
              </ClientButton>
              <ClientButton
                onClick={this.handleReload}
                variant="primary"
                size="lg"
              >
                Reload Page
              </ClientButton>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
