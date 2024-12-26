"use client";

import { useCallback } from "react";

import { usePathname, useSearchParams } from "next/navigation";

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

interface PageView {
  path: string;
  title: string;
  referrer?: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
}

interface ConversionEvent extends AnalyticsEvent {
  conversionValue?: number;
  conversionType: "lead" | "appointment" | "contact" | "quote";
}

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getUtmParams = useCallback(() => {
    if (!searchParams) return undefined;

    return {
      source: searchParams.get("utm_source") || undefined,
      medium: searchParams.get("utm_medium") || undefined,
      campaign: searchParams.get("utm_campaign") || undefined,
      term: searchParams.get("utm_term") || undefined,
      content: searchParams.get("utm_content") || undefined,
    };
  }, [searchParams]);

  const trackPageView = useCallback(
    (title: string) => {
      const pageView: PageView = {
        path: pathname,
        title,
        referrer: document.referrer,
        utmParams: getUtmParams(),
      };

      // Send to analytics service
      console.log("Track pageview:", pageView);

      // You can implement actual tracking here:
      // - Google Analytics
      // - Mixpanel
      // - Custom analytics endpoint
    },
    [pathname, getUtmParams]
  );

  const trackEvent = useCallback(
    ({ action, category, label, value, metadata }: AnalyticsEvent) => {
      const event = {
        action,
        category,
        label,
        value,
        metadata: {
          ...metadata,
          path: pathname,
          utmParams: getUtmParams(),
        },
      };

      // Send to analytics service
      console.log("Track event:", event);
    },
    [pathname, getUtmParams]
  );

  const trackConversion = useCallback(
    ({
      action,
      category,
      conversionType,
      conversionValue,
      metadata,
    }: ConversionEvent) => {
      const conversion = {
        action,
        category,
        conversionType,
        conversionValue,
        metadata: {
          ...metadata,
          path: pathname,
          utmParams: getUtmParams(),
        },
        timestamp: new Date().toISOString(),
      };

      // Send to analytics service
      console.log("Track conversion:", conversion);
    },
    [pathname, getUtmParams]
  );

  const trackFormAbandonment = useCallback(
    (formId: string, lastCompletedField?: string) => {
      const event = {
        action: "form_abandonment",
        category: "forms",
        label: formId,
        metadata: {
          lastCompletedField,
          path: pathname,
          utmParams: getUtmParams(),
        },
      };

      // Send to analytics service
      console.log("Track form abandonment:", event);
    },
    [pathname, getUtmParams]
  );

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackFormAbandonment,
  };
}
