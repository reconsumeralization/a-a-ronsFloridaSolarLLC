"use client";

import { motion } from 'framer-motion';

export function BenefitsInteractive() {
  return (
    <section className="py-20 bg-blue-900">
      <div className="container px-4 md:px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Benefits of Professional Solar Maintenance
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Increased Efficiency",
              description:
                "Regular cleaning can increase panel efficiency by up to 30%",
            },
            {
              title: "Extended Lifespan",
              description:
                "Proper maintenance helps your solar system last longer",
            },
            {
              title: "Better ROI",
              description: "Maximize your investment with optimal performance",
            },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              className="bg-blue-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                {benefit.title}
              </h3>
              <p className="text-blue-100">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
