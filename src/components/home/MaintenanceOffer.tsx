"use client";

import { motion } from "framer-motion";

import { GiftIcon } from "@/components/Icons";
import { ClientButton } from "@/components/shared/ClientButton";

const offerFeatures = [
  "Comprehensive system inspection",
  "Performance optimization",
  "Panel cleaning & maintenance",
  "Detailed health report",
  "30-day satisfaction guarantee",
  "Priority support access",
];

export function MaintenanceOffer() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <GiftIcon className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Exclusive Maintenance Offer
            </h2>
            <p className="text-xl text-gray-600">
              Get your first maintenance service at a special introductory price
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    $199
                    <span className="text-lg font-normal text-gray-500">
                      /service
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Regular price: <span className="line-through">$299</span>
                  </p>

                  <ul className="space-y-4 mb-8">
                    {offerFeatures.map((feature) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-gray-700"
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
                      </motion.li>
                    ))}
                  </ul>

                  <ClientButton
                    onClick={() =>
                      document
                        .getElementById("contact-form")
                        ?.scrollIntoView({ behavior: "smooth" })}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Claim Offer Now
                  </ClientButton>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl" />
                  <div className="relative p-6 bg-white/90 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">
                      Why Choose Our Service?
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li>✓ NABCEP certified technicians</li>
                      <li>✓ Latest diagnostic equipment</li>
                      <li>✓ Comprehensive maintenance protocol</li>
                      <li>✓ Detailed performance reports</li>
                      <li>✓ Florida climate expertise</li>
                      <li>✓ Emergency support available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
