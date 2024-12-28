"use client";

import { forwardRef } from "react";

import { IMaskInput } from "react-imask";

interface PhoneInputProps {
  label: string;
  error?: string;
  className?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <IMaskInput
          {...props}
          mask="(000) 000-0000"
          definitions={{
            "#": /[1-9]/,
          }}
          inputRef={ref}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-300 focus:ring-primary/20"
          }`}
          placeholder="(555) 555-5555"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";
