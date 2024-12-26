import type { ServiceHistory } from "@/types/crm";

interface EmailTemplate {
  subject: string;
  body: string;
}

interface EmailOptions {
  to: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType: string;
  }>;
}

export class EmailService {
  private static instance: EmailService;
  private apiUrl: string;
  private defaultFrom: string;

  private constructor() {
    this.apiUrl = process.env.EMAIL_API_URL || "/api/email";
    this.defaultFrom = "A-A-RON Florida Solar <noreply@aaronfloridasolar.com>";
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private async sendEmail(
    template: EmailTemplate,
    options: EmailOptions
  ): Promise<void> {
    try {
      await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: options.to,
          from: options.from || this.defaultFrom,
          replyTo: options.replyTo,
          subject: template.subject,
          html: template.body,
          attachments: options.attachments,
        }),
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      throw error;
    }
  }

  async sendServiceConfirmation(
    service: ServiceHistory,
    customerEmail: string
  ): Promise<void> {
    const template = {
      subject: "Your Solar Service Appointment Confirmation",
      body: `
        <h1>Service Appointment Confirmed</h1>
        <p>Dear Customer,</p>
        <p>Your ${service.serviceType} appointment has been scheduled for ${
          service.scheduledDate
            ? new Date(service.scheduledDate).toLocaleDateString()
            : "TBD"
        }.</p>
        <p>Service Details:</p>
        <ul>
          <li>Service Type: ${service.serviceType}</li>
          <li>Status: ${service.status}</li>
          ${
            service.technician
              ? `<li>Technician: ${service.technician}</li>`
              : ""
          }
        </ul>
        <p>What to expect:</p>
        <ul>
          <li>Our technician will arrive within a 2-hour window</li>
          <li>We'll call you 30 minutes before arrival</li>
          <li>Please ensure access to your solar system</li>
        </ul>
        <p>Need to reschedule? Call us at 1-800-SOLAR-FL</p>
      `,
    };

    await this.sendEmail(template, { to: customerEmail });
  }

  async sendServiceReminder(
    service: ServiceHistory,
    customerEmail: string
  ): Promise<void> {
    const template = {
      subject: "Reminder: Solar Service Appointment Tomorrow",
      body: `
        <h1>Service Appointment Reminder</h1>
        <p>Dear Customer,</p>
        <p>This is a reminder that your ${
          service.serviceType
        } appointment is scheduled for tomorrow, ${
          service.scheduledDate
            ? new Date(service.scheduledDate).toLocaleDateString()
            : "TBD"
        }.</p>
        <p>Please ensure:</p>
        <ul>
          <li>Clear access to your solar system</li>
          <li>Someone over 18 is present</li>
          <li>Any pets are secured</li>
        </ul>
        <p>Need to reschedule? Call us at 1-800-SOLAR-FL</p>
      `,
    };

    await this.sendEmail(template, { to: customerEmail });
  }

  async sendFollowUpSequence(
    service: ServiceHistory,
    customerEmail: string,
    sequenceNumber: number
  ): Promise<void> {
    const templates = [
      {
        subject: "How was your solar service experience?",
        body: `
          <h1>We value your feedback</h1>
          <p>Dear Customer,</p>
          <p>We hope you're satisfied with your recent ${service.serviceType} service.</p>
          <p>Could you take a moment to share your experience?</p>
          <p><a href="#">Rate your service</a></p>
        `,
      },
      {
        subject: "Solar System Maintenance Tips",
        body: `
          <h1>Keep Your Solar System Running Efficiently</h1>
          <p>Dear Customer,</p>
          <p>Here are some tips to maintain your solar system's performance:</p>
          <ul>
            <li>Regular cleaning</li>
            <li>Monitor performance</li>
            <li>Schedule annual inspections</li>
          </ul>
        `,
      },
      {
        subject: "Schedule Your Next Solar Service",
        body: `
          <h1>Time for a Check-up?</h1>
          <p>Dear Customer,</p>
          <p>Regular maintenance helps ensure optimal performance.</p>
          <p><a href="#">Schedule your next service</a></p>
        `,
      },
    ];

    if (sequenceNumber < templates.length) {
      await this.sendEmail(templates[sequenceNumber], { to: customerEmail });
    }
  }
}
