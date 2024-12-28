"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { ChartIcon, SunIcon, ToolsIcon } from "@/components/Icons";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { AppError } from "@/utils/errors";

const stats = [
  {
    label: "Solar Panels Maintained",
    value: "15,000+",
    description: "Across Florida",
    Icon: SunIcon,
  },
  {
    label: "Efficiency Increase",
    value: "25%",
    description: "Average improvement",
    Icon: ChartIcon,
  },
  {
    label: "Service Calls",
    value: "10,000+",
    description: "Completed successfully",
    Icon: ToolsIcon,
  },
];

export function Stats() {
  const [data, setData] = useState(stats);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandler();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simulate error condition
        if (Math.random() < 0.1) {
          throw new AppError("Unable to load statistics. Please try again.");
        }

        setData(stats);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [handleError]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {error.message
          ? (
            <ErrorAlert
              message={error.message}
              type={error.type}
              onClose={clearError}
            />
          )
          : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">
                  Florida&apos;s Leading Solar Maintenance Provider
                </h2>
                <p className="text-xl text-gray-600">
                  Our track record speaks for itself - trusted by thousands of
                  homeowners across Florida
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {data.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <stat.Icon className="w-8 h-8" />
                      </div>

                      <div className="text-4xl font-bold mb-2 text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-lg font-medium mb-2 text-gray-900">
                        {stat.label}
                      </div>
                      <div className="text-gray-600">{stat.description}</div>

                      <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-2xl group-hover:border-primary/50 transition-colors" />
                      <div className="absolute inset-0 bg-white rounded-2xl transform transition-transform group-hover:scale-[1.02]" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-16"
              >
                <p className="text-lg text-gray-600">
                  Join thousands of satisfied customers who trust us with their
                  solar maintenance needs
                </p>
              </motion.div>
            </>
          )}
      </div>
    </section>
  );
}
