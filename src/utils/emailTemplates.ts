import type { ServiceHistory } from "@/types/crm";

export const emailTemplates = {
  serviceConfirmation: (service: ServiceHistory) => ({
    subject: "Your Solar Service Appointment Confirmation",
    body: `
      <h1>Service Appointment Confirmed</h1>
      <p>Dear Customer,</p>
      <p>Your ${service.serviceType} appointment has been scheduled for ${
        service.scheduledDate
          ? new Date(service.scheduledDate).toLocaleDateString()
          : "TBD"
      }.</p>
      <!-- ... rest of the template ... -->
    `,
  }),

  serviceReminder: (service: ServiceHistory) => ({
    subject: "Reminder: Solar Service Appointment Tomorrow",
    body: `
      <h1>Service Appointment Reminder</h1>
      <!-- ... template content ... -->
    `,
  }),

  followUpSequence: [
    {
      subject: "How was your solar service experience?",
      body: `
        <h1>We value your feedback</h1>
        <!-- ... template content ... -->
      `,
    },
    // ... other sequence templates
  ],
};
