import { trackEvent } from "@/lib/utils/analytics";
import { type ContactFormData } from "@/lib/validations/contact";

export async function submitContactForm(data: ContactFormData): Promise<void> {
  try {
    // Track form submission attempt
    trackEvent("contact_form_submit_attempt", {
      propertyType: data.propertyType,
    });

    // TODO: Replace with your actual API endpoint
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    // Track successful submission
    trackEvent("contact_form_submit_success", {
      propertyType: data.propertyType,
    });
  } catch (error) {
    // Track submission error
    trackEvent("contact_form_submit_error", {
      propertyType: data.propertyType,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw error;
  }
}
