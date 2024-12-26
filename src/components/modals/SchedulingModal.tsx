"use client";

import { X } from "lucide-react";

import { useNotification } from "@/contexts/NotificationContext";
import { useScheduling } from "@/hooks/useScheduling";
import { Dialog } from "@headlessui/react";

import { SchedulingForm } from "../forms/SchedulingForm";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchedulingModal({ isOpen, onClose }: SchedulingModalProps) {
  const { showNotification } = useNotification();
  const { handleScheduling, isLoading } = useScheduling({
    onSuccess: () => {
      onClose();
      showNotification(
        "success",
        "Service scheduled successfully! We'll be in touch shortly.",
      );
    },
    onError: (error) => {
      showNotification(
        "error",
        error.message || "Failed to schedule service. Please try again.",
      );
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-bold">
              Schedule Service
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <SchedulingForm onSubmit={handleScheduling} isLoading={isLoading} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
