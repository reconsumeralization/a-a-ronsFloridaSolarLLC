import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9-+() ]*$/, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  propertyType: z.enum(["residential", "commercial", "other"]),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
