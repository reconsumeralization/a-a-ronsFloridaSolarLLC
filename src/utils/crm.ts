"use client";

interface Customer {
  name?: string;
  email: string;
  phone?: string;
  address?: string;
  serviceType: "repair" | "maintenance" | "inspection";
  message?: string;
}

interface SchedulingRequest {
  customer: Customer;
  preferredDate?: Date;
  urgency: "normal" | "urgent";
  files?: File[];
}

interface CRMResponse {
  message: string;
  id?: string;
  errors?: any[];
}

export async function submitToCRM(
  data: SchedulingRequest
): Promise<CRMResponse> {
  try {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        customer: data.customer,
        preferredDate: data.preferredDate,
        urgency: data.urgency,
      })
    );

    if (data.files?.length) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    const response = await fetch("/api/crm/schedule", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to submit to CRM");
    }

    return result;
  } catch (error) {
    console.error("CRM submission error:", error);
    throw error;
  }
}
