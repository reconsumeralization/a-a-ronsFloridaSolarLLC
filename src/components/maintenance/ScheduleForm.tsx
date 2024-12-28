"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ClientButton } from "@/components/shared/ClientButton";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { Textarea } from "@/components/shared/Textarea";
import {
  type MaintenanceFormData,
  maintenanceFormSchema,
} from "@/lib/validations/maintenance";
import { zodResolver } from "@hookform/resolvers/zod";

const serviceTypes = [
  { label: "Regular Cleaning", value: "cleaning" },
  { label: "System Inspection", value: "inspection" },
  { label: "Repair Service", value: "repair" },
  { label: "Emergency Service", value: "emergency" },
];

const timeSlots = [
  { label: "Morning (8AM - 12PM)", value: "morning" },
  { label: "Afternoon (12PM - 4PM)", value: "afternoon" },
  { label: "Evening (4PM - 7PM)", value: "evening" },
];

export function ScheduleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceFormSchema),
  });

  const onSubmit = async (data: MaintenanceFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call with the form data
      await new Promise((resolve) => {
        console.log("Scheduling maintenance:", data);
        setTimeout(resolve, 1000);
      });

      toast.success("Maintenance scheduled successfully!");
      reset();
    } catch {
      toast.error("Failed to schedule maintenance. Please try again.");
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
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>

        <Input
          type="tel"
          label="Phone Number"
          error={errors.phone?.message}
          required
          {...register("phone")}
        />

        <Select
          label="Service Type"
          options={serviceTypes}
          error={errors.serviceType?.message}
          required
          {...register("serviceType")}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="date"
            label="Preferred Date"
            min={new Date().toISOString().split("T")[0]}
            error={errors.date?.message}
            required
            {...register("date")}
          />
          <Select
            label="Preferred Time"
            options={timeSlots}
            error={errors.timeSlot?.message}
            required
            {...register("timeSlot")}
          />
        </div>

        <Textarea
          label="Additional Notes"
          error={errors.notes?.message}
          placeholder="Please provide any specific concerns or requirements..."
          {...register("notes")}
        />

        <div className="space-y-4">
          <ClientButton
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Scheduling..." : "Schedule Maintenance"}
          </ClientButton>

          <ClientButton
            onClick={() => reset()}
            variant="outline"
            className="w-full"
          >
            Reset Form
          </ClientButton>
        </div>
      </div>
    </form>
  );
}
