type PerformanceMetric = {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
};

type PerformanceData = {
  metrics: PerformanceMetric[];
  timestamp: number;
  url: string;
  connection?: {
    type?: string;
    downlink?: number;
    rtt?: number;
  };
};

// Add NetworkInformation interface
interface NetworkInformation {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  type?: string;
}

// Extend Navigator interface
declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

export function trackPerformanceMetrics(): PerformanceData {
  if (typeof window === "undefined") {
    return { metrics: [], timestamp: Date.now(), url: "" };
  }

  const navigationEntry = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  const paintEntries = performance.getEntriesByType("paint");
  const fcp = paintEntries.find(
    (entry) => entry.name === "first-contentful-paint"
  );

  const metrics: PerformanceMetric[] = [
    {
      name: "Time to First Byte",
      value: navigationEntry.responseStart - navigationEntry.requestStart,
      rating: getRating(
        "ttfb",
        navigationEntry.responseStart - navigationEntry.requestStart
      ),
    },
    {
      name: "First Contentful Paint",
      value: fcp?.startTime || 0,
      rating: getRating("fcp", fcp?.startTime || 0),
    },
    {
      name: "DOM Interactive",
      value: navigationEntry.domInteractive,
      rating: getRating("domInteractive", navigationEntry.domInteractive),
    },
    {
      name: "Page Load",
      value: navigationEntry.loadEventEnd - navigationEntry.startTime,
      rating: getRating(
        "pageLoad",
        navigationEntry.loadEventEnd - navigationEntry.startTime
      ),
    },
  ];

  return {
    metrics,
    timestamp: Date.now(),
    url: window.location.href,
    connection: getConnectionInfo(),
  };
}

function getRating(metric: string, value: number): PerformanceMetric["rating"] {
  const thresholds = {
    ttfb: { good: 200, poor: 600 },
    fcp: { good: 1000, poor: 3000 },
    domInteractive: { good: 2000, poor: 5000 },
    pageLoad: { good: 3000, poor: 8000 },
  };

  const threshold = thresholds[metric as keyof typeof thresholds];
  if (!threshold) return "needs-improvement";

  if (value <= threshold.good) return "good";
  if (value >= threshold.poor) return "poor";
  return "needs-improvement";
}

function getConnectionInfo() {
  if (typeof navigator === "undefined" || !("connection" in navigator)) {
    return undefined;
  }

  const connection = navigator.connection;
  return {
    type: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
  };
}
