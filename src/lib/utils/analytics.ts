import { trackClarityEvent } from "./clarity";

// Define specific event payloads for better type safety
interface AnalyticsEvents {
  form_submit: {
    offerType: string;
    systemSize: string;
  };
  form_error: {
    errorCode: string;
    errorField?: string;
    errorMessage: string;
  };
  form_validation_error: {
    field: string;
    message: string;
  };
  form_success: {
    offerType: string;
  };
  form_retry: {
    attempt: number;
    error: string;
  };
  maintenance_calculator_used: {
    systemSize: string;
    estimatedCost: number;
  };
  maintenance_offer_selected: {
    offerId: string;
    offerType: string;
  };
  maintenance_form_started: Record<string, never>;
  maintenance_form_completed: {
    offerType: string;
    systemSize: string;
    timeToComplete: number;
  };
}

type EventName = keyof AnalyticsEvents;

export function trackEvent<T extends EventName>(
  name: T,
  properties: AnalyticsEvents[T]
) {
  // Log to console in development
  console.log("Analytics event:", name, properties);

  // Track in Clarity
  trackClarityEvent(name, JSON.stringify(properties));

  // In production, send to other analytics services
  // Example: mixpanel.track(name, properties)
}

export function trackError(
  error: unknown,
  context: Record<string, unknown> = {}
) {
  console.error("Error tracked:", error, context);

  // Track error in Clarity
  trackClarityEvent(
    "error",
    JSON.stringify({
      error: error instanceof Error ? error.message : String(error),
      ...context,
    })
  );

  // In production, send to error tracking service
  // Example: Sentry.captureException(error, { extra: context })
}

export function trackPageView(url: string) {
  trackClarityEvent("page_view", url);
}

export function trackUserAction(
  action: string,
  details?: Record<string, unknown>
) {
  trackClarityEvent("user_action", JSON.stringify({ action, ...details }));
}
