import type {
  Contact,
  CustomerProfile,
  Lead,
  LeadStatus,
  ServiceHistory,
  ServiceStatus,
} from "@/types/crm";

export class CRMService {
  private static instance: CRMService;
  private apiUrl: string;

  private constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
  }

  public static getInstance(): CRMService {
    if (!CRMService.instance) {
      CRMService.instance = new CRMService();
    }
    return CRMService.instance;
  }

  // Lead Management
  async createLead(contact: Partial<Contact>): Promise<Lead> {
    const response = await fetch(`${this.apiUrl}/crm/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error("Failed to create lead");
    }

    return response.json();
  }

  async updateLeadStatus(leadId: string, status: LeadStatus): Promise<Lead> {
    const response = await fetch(`${this.apiUrl}/crm/leads/${leadId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update lead status");
    }

    return response.json();
  }

  // Service History
  async createServiceRecord(
    contactId: string,
    serviceData: Partial<ServiceHistory>
  ): Promise<ServiceHistory> {
    const response = await fetch(`${this.apiUrl}/crm/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId, ...serviceData }),
    });

    if (!response.ok) {
      throw new Error("Failed to create service record");
    }

    return response.json();
  }

  async updateServiceStatus(
    serviceId: string,
    status: ServiceStatus
  ): Promise<ServiceHistory> {
    const response = await fetch(
      `${this.apiUrl}/crm/services/${serviceId}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update service status");
    }

    return response.json();
  }

  // Customer Profile
  async getCustomerProfile(contactId: string): Promise<CustomerProfile> {
    const response = await fetch(`${this.apiUrl}/crm/customers/${contactId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch customer profile");
    }

    return response.json();
  }

  async updateCustomerProfile(
    contactId: string,
    updates: Partial<CustomerProfile>
  ): Promise<CustomerProfile> {
    const response = await fetch(`${this.apiUrl}/crm/customers/${contactId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error("Failed to update customer profile");
    }

    return response.json();
  }

  // Contact History
  async addContactNote(
    contactId: string,
    note: string
  ): Promise<{ id: string; note: string; createdAt: Date }> {
    const response = await fetch(
      `${this.apiUrl}/crm/contacts/${contactId}/notes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add contact note");
    }

    return response.json();
  }

  async getContactHistory(contactId: string): Promise<{
    notes: Array<{ id: string; note: string; createdAt: Date }>;
    interactions: Array<{ type: string; details: string; date: Date }>;
  }> {
    const response = await fetch(
      `${this.apiUrl}/crm/contacts/${contactId}/history`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contact history");
    }

    return response.json();
  }
}
