"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { ToolsIcon } from "@/components/Icons";
import { ClientButton } from "@/components/shared/ClientButton";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { AppError } from "@/utils/errors";

const maintenancePlans = [
  {
    name: "Basic",
    price: 199,
    interval: "year",
    features: [
      "Annual system inspection",
      "Basic panel cleaning",
      "Performance report",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 299,
    interval: "6 months",
    features: [
      "Bi-annual inspection",
      "Deep panel cleaning",
      "Performance optimization",
      "Priority support",
      "System health monitoring",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: 499,
    interval: "quarter",
    features: [
      "Quarterly inspection",
      "Premium panel cleaning",
      "Advanced diagnostics",
      "24/7 emergency support",
      "Real-time monitoring",
      "Extended warranty",
    ],
  },
];

export function MaintenanceSection() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { error, handleError, clearError } = useErrorHandler();

  const handlePlanSelect = async (planName: string) => {
    try {
      setLoading(true);
      clearError();
      setSelectedPlan(planName);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simulate potential errors
      if (Math.random() < 0.1) {
        throw new AppError("Unable to select plan. Please try again.");
      }

      // Scroll to contact form
      document
        .getElementById("contact-form")
        ?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      handleError(err);
      setSelectedPlan(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white" id="maintenance-plans">
      <div className="container mx-auto px-4">
        {error.message && (
          <ErrorAlert
            message={error.message}
            type={error.type}
            onClose={clearError}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <ToolsIcon className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Maintenance Plans</h2>
          <p className="text-xl text-gray-600">
            Choose the perfect maintenance plan to keep your solar system
            performing at its best
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {maintenancePlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${
                loading && selectedPlan === plan.name
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
            >
              <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                {plan.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                    Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{plan.interval}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-primary flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <ClientButton
                  onClick={() => handlePlanSelect(plan.name)}
                  variant={plan.popular ? "primary" : "outline"}
                  size="lg"
                  className="w-full"
                  loading={loading && selectedPlan === plan.name}
                >
                  Select Plan
                </ClientButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
