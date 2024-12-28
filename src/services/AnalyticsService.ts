interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
  timestamp: string;
  sessionId?: string;
  userId?: string;
}

interface ConversionData {
  type: "lead" | "appointment" | "contact" | "quote";
  value?: number;
  metadata?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private apiUrl: string;

  private constructor() {
    this.apiUrl = process.env.ANALYTICS_API_URL || "/api/analytics";
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch(`${this.apiUrl}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error("Failed to track event:", error);
    }
  }

  async trackConversion(data: ConversionData): Promise<void> {
    try {
      await fetch(`${this.apiUrl}/conversions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Failed to track conversion:", error);
    }
  }

  async getConversionRate(
    type: ConversionData["type"],
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    try {
      const response = await fetch(
        `${this.apiUrl}/conversions/rate?` +
          new URLSearchParams({
            type,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          })
      );

      if (!response.ok) {
        throw new Error("Failed to fetch conversion rate");
      }

      const data = await response.json();
      return data.rate;
    } catch (error) {
      console.error("Failed to get conversion rate:", error);
      return 0;
    }
  }

  async getDropOffPoints(
    formId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Array<{ field: string; dropOffCount: number }>> {
    try {
      const response = await fetch(
        `${this.apiUrl}/forms/${formId}/drop-offs?` +
          new URLSearchParams({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          })
      );

      if (!response.ok) {
        throw new Error("Failed to fetch drop-off points");
      }

      return response.json();
    } catch (error) {
      console.error("Failed to get drop-off points:", error);
      return [];
    }
  }
}
