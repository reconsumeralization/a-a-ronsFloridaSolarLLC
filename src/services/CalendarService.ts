import { google } from "googleapis";

import type { ServiceHistory } from "@/types/crm";

interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
  technicianId?: string;
}

interface Technician {
  id: string;
  name: string;
  specialties: Array<"repair" | "maintenance" | "inspection">;
  calendar: string; // Google Calendar ID
}

export class CalendarService {
  private static instance: CalendarService;
  private calendar: any; // Google Calendar API instance
  private apiUrl: string;

  private constructor() {
    this.apiUrl = process.env.CALENDAR_API_URL || "/api/calendar";
    this.initializeGoogleCalendar();
  }

  public static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }
    return CalendarService.instance;
  }

  private async initializeGoogleCalendar() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    this.calendar = google.calendar({ version: "v3", auth });
  }

  async getAvailableSlots(
    serviceType: ServiceHistory["serviceType"],
    date: Date,
    duration: number = 120 // default 2 hours
  ): Promise<TimeSlot[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}/availability?` +
          new URLSearchParams({
            serviceType,
            date: date.toISOString(),
            duration: duration.toString(),
          })
      );

      if (!response.ok) {
        throw new Error("Failed to fetch availability");
      }

      return response.json();
    } catch (error) {
      console.error("Failed to get available slots:", error);
      return [];
    }
  }

  async bookAppointment(
    service: ServiceHistory,
    technicianId?: string
  ): Promise<boolean> {
    if (!service.scheduledDate) {
      throw new Error("Scheduled date is required");
    }

    try {
      // Create Google Calendar event
      const event = {
        summary: `Solar ${service.serviceType} Service`,
        description: `Service ID: ${service.id}\nType: ${service.serviceType}\nNotes: ${service.notes.join(
          "\n"
        )}`,
        start: {
          dateTime: service.scheduledDate.toISOString(),
          timeZone: "America/New_York",
        },
        end: {
          dateTime: new Date(
            service.scheduledDate.getTime() + 2 * 60 * 60 * 1000
          ).toISOString(), // 2 hours duration
          timeZone: "America/New_York",
        },
      };

      await this.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      // Update service record with booking details
      const response = await fetch(`${this.apiUrl}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          technicianId,
          scheduledDate: service.scheduledDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      return true;
    } catch (error) {
      console.error("Failed to book appointment:", error);
      return false;
    }
  }

  async getTechnicianSchedule(
    technicianId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ServiceHistory[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}/technicians/${technicianId}/schedule?` +
          new URLSearchParams({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          })
      );

      if (!response.ok) {
        throw new Error("Failed to fetch technician schedule");
      }

      return response.json();
    } catch (error) {
      console.error("Failed to get technician schedule:", error);
      return [];
    }
  }

  async syncWithGoogleCalendar(service: ServiceHistory): Promise<void> {
    if (!service.scheduledDate) {
      throw new Error("Scheduled date is required");
    }

    try {
      const event = {
        summary: `Solar ${service.serviceType} Service`,
        description: `Service ID: ${service.id}\nType: ${
          service.serviceType
        }\nNotes: ${service.notes.join("\n")}`,
        start: {
          dateTime: service.scheduledDate.toISOString(),
          timeZone: "America/New_York",
        },
        end: {
          dateTime: new Date(
            service.scheduledDate.getTime() + 2 * 60 * 60 * 1000
          ).toISOString(),
          timeZone: "America/New_York",
        },
      };

      await this.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
    } catch (error) {
      console.error("Failed to sync with Google Calendar:", error);
      throw error;
    }
  }
}
