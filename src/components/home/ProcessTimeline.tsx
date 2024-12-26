"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Settings,
  Sparkles,
  UserCheck,
  Wrench,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Initial Assessment",
    description:
      "We evaluate your system's current performance and identify maintenance needs.",
  },
  {
    icon: Settings,
    title: "Customized Plan",
    description:
      "We create a tailored maintenance plan based on your system's specific requirements.",
  },
  {
    icon: Wrench,
    title: "Professional Service",
    description:
      "Our certified technicians perform thorough maintenance and necessary repairs.",
  },
  {
    icon: Sparkles,
    title: "Quality Check",
    description:
      "We verify system performance and ensure everything meets our high standards.",
  },
  {
    icon: UserCheck,
    title: "Ongoing Support",
    description:
      "We provide continuous monitoring and support to maintain optimal performance.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've streamlined our maintenance process to ensure you receive the
            best service with minimal hassle
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          {/* Timeline Steps */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative grid grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? "" : "dir-rtl"
                }`}
              >
                <div
                  className={`text-${
                    index % 2 === 0 ? "right" : "left"
                  } space-y-3`}
                >
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                <div
                  className={`flex ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                    <div className="relative w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-primary">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
