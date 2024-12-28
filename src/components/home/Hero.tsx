"use client";

import { useState } from "react";

import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ValidationError } from "@/utils/errors";

export function Hero() {
  const [email, setEmail] = useState("");
  const { error, handleError, clearError } = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new ValidationError("Please enter a valid email address");
      }

      // Rest of submission logic
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {error.message && (
          <ErrorAlert
            message={error.message}
            type={error.type}
            onClose={clearError}
          />
        )}
        {/* Rest of the component */}
      </div>
    </section>
  );
}
