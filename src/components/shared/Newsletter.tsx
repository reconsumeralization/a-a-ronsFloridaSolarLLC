"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { BellIcon } from "@/components/Icons";
import { ClientButton } from "@/components/shared/ClientButton";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { Input } from "@/components/shared/Input";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { ValidationError } from "@/utils/errors";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { error, handleError, clearError } = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      // Validate email
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new ValidationError("Please enter a valid email address");
      }

      setStatus("loading");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check for existing subscription
      if (email === "test@example.com") {
        throw new ValidationError("This email is already subscribed");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("idle");
      handleError(err);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <BellIcon className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest solar maintenance tips and exclusive offers
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error.message && (
              <ErrorAlert
                message={error.message}
                type={error.type}
                onClose={clearError}
              />
            )}

            <div className="flex gap-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === "loading"}
                className="flex-1"
                required
              />
              <ClientButton
                type="submit"
                variant="primary"
                size="lg"
                loading={status === "loading"}
              >
                Subscribe
              </ClientButton>
            </div>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-600"
              >
                Thank you for subscribing! Please check your email to confirm.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
