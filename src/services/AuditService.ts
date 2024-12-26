interface AuditLog {
  action: string;
  userId?: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ip?: string;
  userAgent?: string;
  timestamp: Date;
}

export class AuditService {
  private static instance: AuditService;
  private apiUrl: string;

  private constructor() {
    this.apiUrl = process.env.AUDIT_API_URL || "/api/audit";
  }

  public static getInstance(): AuditService {
    if (!AuditService.instance) {
      AuditService.instance = new AuditService();
    }
    return AuditService.instance;
  }

  async log(data: Omit<AuditLog, "timestamp">): Promise<void> {
    try {
      const log: AuditLog = {
        ...data,
        timestamp: new Date(),
      };

      await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
      });
    } catch (error) {
      console.error("Failed to create audit log:", error);
    }
  }

  async getAuditLogs(
    filters: Partial<{
      action: string;
      userId: string;
      resourceType: string;
      resourceId: string;
      startDate: Date;
      endDate: Date;
    }>
  ): Promise<AuditLog[]> {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`${this.apiUrl}?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch audit logs");
      }

      return response.json();
    } catch (error) {
      console.error("Failed to get audit logs:", error);
      return [];
    }
  }
}
