"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { ClientButton } from "@/components/shared/ClientButton";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { Textarea } from "@/components/shared/Textarea";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ValidationError } from "@/utils/errors";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "maintenance", label: "Maintenance Service" },
  { value: "repair", label: "Repair Service" },
  { value: "inspection", label: "System Inspection" },
  { value: "emergency", label: "Emergency Service" },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { error, handleError, clearError } = useErrorHandler();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      throw new ValidationError("Please enter your name");
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new ValidationError("Please enter a valid email address");
    }
    if (!formData.phone.match(/^\+?[\d\s-]{10,}$/)) {
      throw new ValidationError("Please enter a valid phone number");
    }
    if (!formData.service) {
      throw new ValidationError("Please select a service");
    }
    if (!formData.message.trim()) {
      throw new ValidationError("Please enter your message");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      validateForm();
      setStatus("loading");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setFormData(initialFormData);
    } catch (err) {
      setStatus("idle");
      handleError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
      {error.message && (
        <ErrorAlert
          message={error.message}
          type={error.type}
          onClose={clearError}
        />
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === "loading"}
            required
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Service Type <span className="text-red-500">*</span>
          </label>
          <Select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            options={serviceOptions}
            disabled={status === "loading"}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={status === "loading"}
            rows={4}
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <ClientButton
          type="submit"
          variant="primary"
          size="lg"
          loading={status === "loading"}
          className="min-w-[200px]"
        >
          Send Message
        </ClientButton>
      </div>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-green-50 text-green-700 rounded-lg"
        >
          Thank you for your message! We&apos;ll get back to you shortly.
        </motion.div>
      )}
    </form>
  );
}
