export function trackWebVitals(metric: any) {
  const { id, name, label, value } = metric;

  // Analytics implementation
  if (window.gtag) {
    window.gtag("event", name, {
      event_category: label === "web-vital" ? "Web Vitals" : "Next.js Metrics",
      event_label: id,
      value: Math.round(name === "CLS" ? value * 1000 : value),
      non_interaction: true,
    });
  }
}

export function measurePageLoad() {
  if (typeof window === "undefined") return;

  const navigation = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  const paintEntries = performance.getEntriesByType("paint");

  return {
    // Navigation timing
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    ttfb: navigation.responseStart - navigation.requestStart,
    download: navigation.responseEnd - navigation.responseStart,
    domInteractive: navigation.domInteractive - navigation.fetchStart,
    domComplete: navigation.domComplete - navigation.fetchStart,

    // Paint timing
    fcp: paintEntries.find((entry) => entry.name === "first-contentful-paint")
      ?.startTime,
    lcp: paintEntries.find((entry) => entry.name === "largest-contentful-paint")
      ?.startTime,
  };
}
