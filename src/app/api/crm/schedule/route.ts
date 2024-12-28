import { NextResponse } from "next/server";
import { z } from "zod";

import { csrfProtection } from "@/middleware/csrf";
import { rateLimiter } from "@/middleware/rateLimiter";
import { AuditService } from "@/services/AuditService";
import { CalendarService } from "@/services/CalendarService";
import { CRMService } from "@/services/CRMService";
import { EmailService } from "@/services/EmailService";

const scheduleSchema = z.object({
  customer: z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    address: z.string().optional(),
    serviceType: z.enum(["repair", "maintenance", "inspection"]),
    message: z.string().optional(),
  }),
  preferredDate: z.date().optional(),
  urgency: z.enum(["normal", "urgent"]),
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateLimit = await rateLimiter(ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        { message: "Too many requests" },
        {
          status: 429,
          headers: rateLimit.headers,
        }
      );
    }

    // CSRF protection
    const csrfCheck = await csrfProtection(request);
    if (!csrfCheck.success) {
      return NextResponse.json({ message: csrfCheck.error }, { status: 403 });
    }

    const formData = await request.formData();
    const data = JSON.parse(formData.get("data") as string);
    const files = formData.getAll("files") as File[];

    const validatedData = scheduleSchema.parse(data);
    const crm = CRMService.getInstance();

    // Create audit log
    const audit = AuditService.getInstance();
    await audit.log({
      action: "schedule_service",
      resourceType: "service",
      metadata: {
        serviceType: validatedData.customer.serviceType,
        email: validatedData.customer.email,
      },
      ip,
      userAgent: request.headers.get("user-agent"),
    });

    // Create or update contact
    const contact = await crm.createLead({
      name: validatedData.customer.name,
      email: validatedData.customer.email,
      phone: validatedData.customer.phone,
      address: validatedData.customer.address,
    });

    // Process files
    const fileUrls = await Promise.all(
      files.map(async (file) => {
        // Implement file upload logic here
        return `https://storage.example.com/${file.name}`;
      })
    );

    // Create service record
    const service = await crm.createServiceRecord(contact.id, {
      serviceType: validatedData.customer.serviceType,
      status: "scheduled",
      scheduledDate: validatedData.preferredDate,
      attachments: fileUrls,
      notes: validatedData.customer.message
        ? [validatedData.customer.message]
        : [],
    });

    // Book the appointment
    const calendar = CalendarService.getInstance();
    const booked = await calendar.bookAppointment(service);

    if (!booked) {
      throw new Error("Failed to book appointment");
    }

    // Sync with Google Calendar
    await calendar.syncWithGoogleCalendar(service);

    // Send confirmation email
    const emailService = EmailService.getInstance();
    await emailService.sendServiceConfirmation(
      service,
      validatedData.customer.email
    );

    return NextResponse.json(
      {
        message: "Service scheduled successfully",
        id: service.id,
      },
      { status: 201 }
    );
  } catch (error) {
    // Create audit log for errors
    const audit = AuditService.getInstance();
    await audit.log({
      action: "schedule_service_error",
      resourceType: "service",
      metadata: {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: request.headers.get("user-agent"),
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("CRM submission error:", error);
    return NextResponse.json(
      { message: "Failed to process scheduling request" },
      { status: 500 }
    );
  }
}
