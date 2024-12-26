"use client";

import { useState } from "react";

import { submitToCRM } from "@/utils/crm";

interface SchedulingOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface SchedulingData {
  name?: string;
  email: string;
  phone?: string;
  serviceType: "repair" | "maintenance" | "inspection";
  message?: string;
  preferredDate?: Date;
  urgency: "normal" | "urgent";
}

export function useScheduling({ onSuccess, onError }: SchedulingOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleScheduling = async (data: SchedulingData) => {
    setIsLoading(true);
    try {
      await submitToCRM({
        customer: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          serviceType: data.serviceType,
          message: data.message,
        },
        preferredDate: data.preferredDate,
        urgency: data.urgency,
      });
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleScheduling, isLoading };
}
