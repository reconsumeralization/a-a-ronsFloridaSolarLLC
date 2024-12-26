interface GTagWindow {
  gtag: (
    command: string,
    eventName: string,
    eventParams: Record<string, unknown>
  ) => void;
}

declare global {
  interface Window {
    gtag: GTagWindow["gtag"];
  }
}

export interface CalculatorEvent {
  type: "calculator_used";
  data: {
    monthlyBill: number;
    systemSize: number;
    estimatedSavings: number;
  };
}

type ErrorContext = {
  componentStack?: string;
  timestamp?: string;
  [key: string]: any;
};

export function trackError(error: unknown, context?: ErrorContext) {
  // In development, just log to console
  if (process.env.NODE_ENV === "development") {
    console.error("Error tracked:", error);
    if (context && Object.keys(context).length > 0) {
      console.error("Error context:", context);
    }
    return;
  }

  // In production, you would send to your analytics service
  try {
    // analytics.trackError(error, context);

    // Or send to a logging service like Sentry
    // Sentry.captureException(error, { extra: context });

    // For now, we'll just log to console in production too
    console.error("Error tracked:", error);
    if (context && Object.keys(context).length > 0) {
      console.error("Error context:", context);
    }
  } catch (err) {
    // Fail silently in production, but log in development
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to track error:", err);
    }
  }
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  // In development, just log to console
  if (process.env.NODE_ENV === "development") {
    console.log("Event tracked:", eventName, properties);
    return;
  }

  // In production, you would send to your analytics service
  try {
    // analytics.track(eventName, properties);

    // For now, we'll just log to console
    console.log("Event tracked:", eventName, properties);
  } catch (err) {
    // Fail silently in production, but log in development
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to track event:", err);
    }
  }
}
