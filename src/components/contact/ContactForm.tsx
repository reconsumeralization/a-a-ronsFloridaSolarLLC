"use client";

import { useState } from "react";

import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/shared/Button";
import { ClientButton } from "@/components/shared/ClientButton";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { Textarea } from "@/components/shared/Textarea";
import { submitContactForm } from "@/lib/utils/contact";
import {
  type ContactFormData,
  contactFormSchema,
} from "@/lib/validations/contact";
import { zodResolver } from "@hookform/resolvers/zod";

const propertyTypeOptions = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Other", value: "other" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      toast.success("Message sent successfully!");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow-lg p-6 animate-fade-in"
    >
      <div className="space-y-6">
        <Input
          label="Full Name"
          error={errors.name?.message}
          required
          {...register("name")}
        />

        <Input
          type="email"
          label="Email"
          error={errors.email?.message}
          required
          {...register("email")}
        />

        <Input
          type="tel"
          label="Phone Number"
          error={errors.phone?.message}
          required
          {...register("phone")}
        />

        <Select
          label="Property Type"
          options={propertyTypeOptions}
          error={errors.propertyType?.message}
          required
          {...register("propertyType")}
        />

        <Textarea
          label="Message"
          error={errors.message?.message}
          required
          rows={4}
          {...register("message")}
        />

        <div className="space-y-4">
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
            icon={<Mail className="h-4 w-4" />}
            iconPosition="left"
            loadingVariant="dots"
            loadingText="Sending..."
            ripple={{
              color: "rgba(255, 255, 255, 0.6)",
              size: "lg",
              duration: 0.8,
              style: "dual",
            }}
          >
            Send Message
          </Button>

          <ClientButton onClick={() => reset()}>Reset Form</ClientButton>
        </div>
      </div>
    </form>
  );
}
