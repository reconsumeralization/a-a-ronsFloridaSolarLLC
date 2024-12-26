"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  CheckIcon,
  HeartIcon,
  SearchIcon,
  SunIcon,
  ToolsIcon,
  WarningIcon,
} from "@/components/Icons";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useErrorHandler } from "@/hooks/useErrorHandler";

const features = [
  {
    title: "Professional Inspection",
    description:
      "Comprehensive system evaluation using advanced diagnostic tools",
    Icon: SearchIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Expert Maintenance",
    description: "Thorough cleaning and optimization by certified technicians",
    Icon: ToolsIcon,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Performance Monitoring",
    description: "Real-time tracking and analysis of system efficiency",
    Icon: SunIcon,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Preventive Care",
    description: "Early detection and resolution of potential issues",
    Icon: WarningIcon,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous testing and validation of all repairs",
    Icon: CheckIcon,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Customer Support",
    description: "24/7 dedicated assistance for all your needs",
    Icon: HeartIcon,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
];

export function Features() {
  const [data, setData] = useState(features);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandler();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 600));
        setData(features);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, [handleError]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white" id="features">
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
                  Comprehensive Solar Maintenance
                </h2>
                <p className="text-xl text-gray-600">
                  Expert care for your solar investment with our full range of
                  professional services
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} mb-6 group-hover:scale-110 transition-transform`}
                      >
                        <feature.Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {feature.description}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-600">
                        <span className="w-8 h-[2px] bg-gray-200" />
                        Learn More
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
      </div>
    </section>
  );
}
