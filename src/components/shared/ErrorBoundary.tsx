"use client";

import { Component, ErrorInfo, ReactNode } from "react";

import { ErrorAlert } from "./ErrorAlert";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center p-4">
            <ErrorAlert
              title="Something went wrong"
              message={this.state.error?.message || "Please try again later"}
              action={{
                label: "Reload page",
                onClick: () => window.location.reload(),
              }}
            />
          </div>
        )
      );
    }

    return this.props.children;
  }
}
