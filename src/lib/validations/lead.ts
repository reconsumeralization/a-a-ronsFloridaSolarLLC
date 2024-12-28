import { z } from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9-+() ]*$/, "Please enter a valid phone number"),
  systemSize: z.enum(["small", "medium", "large"], {
    required_error: "Please select your system size",
  }),
  offer: z.string({
    required_error: "Please select an offer",
  }),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
