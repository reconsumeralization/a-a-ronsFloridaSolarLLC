import { useCallback, useState } from "react";

import { toast } from "sonner";

import { trackError } from "@/utils/analytics";
import { AppError, ValidationError } from "@/utils/errors";

interface ErrorState {
  message: string | null;
  type: "error" | "warning" | null;
  code?: string;
  details?: Record<string, any>;
}

export function useErrorHandler(
  options: {
    showToast?: boolean;
    trackErrors?: boolean;
  } = {}
) {
  const { showToast = true, trackErrors = true } = options;

  const [error, setError] = useState<ErrorState>({
    message: null,
    type: null,
  });

  const handleError = useCallback(
    (error: unknown, context?: Record<string, any>) => {
      let errorState: ErrorState;

      if (error instanceof ValidationError) {
        errorState = {
          message: error.message,
          type: "warning",
          code: "VALIDATION_ERROR",
        };
      } else if (error instanceof AppError) {
        errorState = {
          message: error.message,
          type: "error",
          code: error.statusCode.toString(),
        };
      } else if (error instanceof Error) {
        errorState = {
          message: "An unexpected error occurred. Please try again.",
          type: "error",
          code: "UNKNOWN_ERROR",
          details: {
            originalMessage: error.message,
            stack: error.stack,
          },
        };
      } else {
        errorState = {
          message: "An unknown error occurred.",
          type: "error",
          code: "UNKNOWN_ERROR",
        };
      }

      setError(errorState);

      // Show toast notification if enabled
      if (showToast) {
        toast.error(errorState.message);
      }

      // Track error if enabled
      if (trackErrors) {
        trackError(error, {
          ...context,
          ...errorState,
          timestamp: new Date().toISOString(),
        });
      }

      return errorState;
    },
    [showToast, trackErrors]
  );

  const clearError = useCallback(() => {
    setError({ message: null, type: null });
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
}
