import { z } from "zod";

export const maintenanceFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9-+() ]*$/, "Please enter a valid phone number"),
  serviceType: z.enum(["cleaning", "inspection", "repair", "emergency"]),
  date: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Please select a future date"),
  timeSlot: z.enum(["morning", "afternoon", "evening"]),
  notes: z.string().optional(),
});

export type MaintenanceFormData = z.infer<typeof maintenanceFormSchema>;
