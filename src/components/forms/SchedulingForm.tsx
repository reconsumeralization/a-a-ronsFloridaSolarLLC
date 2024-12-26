"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { useAnalytics } from "@/hooks/useAnalytics";
import { generateCsrfToken } from "@/middleware/csrf";
import { zodResolver } from "@hookform/resolvers/zod";

import { AddressInput } from "../shared/AddressInput";
import { Button } from "../shared/Button";
import { FileUpload } from "../shared/FileUpload";
import { Input } from "../shared/Input";
import { PhoneInput } from "../shared/PhoneInput";
import { Select } from "../shared/Select";
import { Textarea } from "../shared/Textarea";

const schedulingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(14, "Please enter a complete phone number")
    .max(14, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  serviceType: z.enum(["repair", "maintenance", "inspection"], {
    errorMap: () => ({ message: "Please select a service type" }),
  }),
  message: z.string().optional(),
  preferredDate: z.string().optional(),
  urgency: z.enum(["normal", "urgent"], {
    errorMap: () => ({ message: "Please select urgency level" }),
  }),
  files: z
    .array(
      z.custom<File>(
        (file) => file instanceof File,
        "Please upload valid files",
      ),
    )
    .optional(),
});

type SchedulingFormData = z.infer<typeof schedulingSchema>;

interface SchedulingFormProps {
  onSubmit: (data: SchedulingFormData, csrfToken: string) => Promise<void>;
  isLoading?: boolean;
}

export function SchedulingForm({ onSubmit, isLoading }: SchedulingFormProps) {
  const { trackEvent, trackConversion, trackFormAbandonment } = useAnalytics();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchedulingFormData>({
    resolver: zodResolver(schedulingSchema),
  });

  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    setCsrfToken(generateCsrfToken());
  }, []);

  // Track field changes
  const watchAllFields = watch();
  useEffect(() => {
    const lastField = Object.keys(watchAllFields).find(
      (key) => watchAllFields[key],
    );
    if (lastField) {
      trackEvent({
        action: "form_field_complete",
        category: "scheduling_form",
        label: lastField,
      });
    }
  }, [watchAllFields, trackEvent]);

  // Track form submission
  const handleFormSubmit = async (data: SchedulingFormData) => {
    try {
      await onSubmit(data, csrfToken);
      trackConversion({
        action: "schedule_service",
        category: "scheduling_form",
        conversionType: "appointment",
        metadata: {
          serviceType: data.serviceType,
          urgency: data.urgency,
        },
      });
    } catch (error) {
      trackEvent({
        action: "form_submission_error",
        category: "scheduling_form",
        metadata: { error: error.message },
      });
      throw error;
    }
  };

  // Track form abandonment
  useEffect(() => {
    const handleBeforeUnload = () => {
      const lastField = Object.keys(watchAllFields).find(
        (key) => watchAllFields[key],
      );
      if (lastField) {
        trackFormAbandonment("scheduling_form", lastField);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [watchAllFields, trackFormAbandonment]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input
        label="Name"
        {...register("name")}
        error={errors.name?.message}
        placeholder="John Doe"
      />
      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
        placeholder="john@example.com"
      />
      <PhoneInput
        label="Phone"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <AddressInput
        label="Address"
        {...register("address")}
        error={errors.address?.message}
        onSelect={(address) => setValue("address", address)}
      />
      <Select
        label="Service Type"
        {...register("serviceType")}
        error={errors.serviceType?.message}
      >
        <option value="">Select a service type</option>
        <option value="repair">Repair</option>
        <option value="maintenance">Maintenance</option>
        <option value="inspection">Inspection</option>
      </Select>
      <Input
        label="Preferred Date"
        type="date"
        {...register("preferredDate")}
        error={errors.preferredDate?.message}
        min={new Date().toISOString().split("T")[0]}
      />
      <Select
        label="Urgency"
        {...register("urgency")}
        error={errors.urgency?.message}
      >
        <option value="">Select urgency level</option>
        <option value="normal">Normal</option>
        <option value="urgent">Urgent</option>
      </Select>
      <Textarea
        label="Message"
        {...register("message")}
        error={errors.message?.message}
        placeholder="Additional details about your service request..."
      />
      <FileUpload
        label="Supporting Documentation"
        error={errors.files?.message}
        onChange={(files) => setValue("files", files)}
      />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Schedule Service"}
      </Button>
    </form>
  );
}
