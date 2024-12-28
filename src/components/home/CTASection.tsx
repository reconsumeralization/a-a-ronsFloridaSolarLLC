"use client";

import { motion } from "framer-motion";

import { ArrowRightIcon, SunIcon, ToolsIcon } from "@/components/Icons";
import { ClientButton } from "@/components/shared/ClientButton";

export function CTASection() {
  const handleGetStarted = () => {
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <SunIcon className="w-8 h-8" />
              </div>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <ToolsIcon className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Optimize Your Solar Investment?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of satisfied Florida homeowners who trust us with
              their solar maintenance needs. Get 10% off your first service!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ClientButton
                onClick={handleGetStarted}
                variant="secondary"
                size="xl"
                className="group bg-white text-primary hover:bg-white/90"
              >
                Schedule Maintenance
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </ClientButton>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 grid sm:grid-cols-3 gap-8 text-center"
            >
              {[
                {
                  value: "24/7",
                  label: "Emergency Service",
                },
                {
                  value: "10%",
                  label: "First Service Discount",
                },
                {
                  value: "100%",
                  label: "Satisfaction Guaranteed",
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
