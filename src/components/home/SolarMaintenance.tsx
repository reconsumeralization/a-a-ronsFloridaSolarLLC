"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  Gauge,
  Leaf,
  ShieldCheck,
  Thermometer,
  Wrench,
  Zap,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";

const services = [
  {
    Icon: Droplets,
    title: "Panel Cleaning",
    description: "Professional cleaning to remove dirt, dust, and debris",
    benefits: [
      "Up to 30% efficiency increase",
      "Extends panel lifespan",
      "Prevents hot spots",
    ],
  },
  {
    Icon: Wrench,
    title: "System Repairs",
    description: "Expert diagnosis and repair of system issues",
    benefits: [
      "Fast response times",
      "Genuine parts used",
      "Warranty-approved repairs",
    ],
  },
  {
    Icon: Gauge,
    title: "Performance Testing",
    description: "Comprehensive system performance analysis",
    benefits: [
      "Detailed diagnostics",
      "Efficiency optimization",
      "Production monitoring",
    ],
  },
  {
    Icon: ShieldCheck,
    title: "Preventive Care",
    description: "Regular inspections and maintenance checks",
    benefits: [
      "Prevent future issues",
      "Maintain warranty",
      "Peace of mind",
    ],
  },
  {
    Icon: Thermometer,
    title: "Heat Monitoring",
    description: "Thermal imaging to detect potential issues",
    benefits: [
      "Early problem detection",
      "Prevent failures",
      "Optimize performance",
    ],
  },
  {
    Icon: Activity,
    title: "Health Checks",
    description: "Complete system health assessment",
    benefits: [
      "Component testing",
      "Safety verification",
      "Performance reports",
    ],
  },
  {
    Icon: Zap,
    title: "Electrical Testing",
    description: "Thorough electrical system inspection",
    benefits: [
      "Safety compliance",
      "Connection testing",
      "Voltage optimization",
    ],
  },
  {
    Icon: Leaf,
    title: "Environmental Care",
    description: "Eco-friendly cleaning and maintenance",
    benefits: [
      "Biodegradable solutions",
      "Water conservation",
      "Sustainable practices",
    ],
  },
];

export function SolarMaintenance() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-4xl font-bold mb-4">
            Comprehensive Solar Maintenance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Keep your solar investment performing at its peak with our
            professional maintenance services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="relative w-12 h-12 mb-6">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <service.Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <ul className="space-y-2">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="shadow-lg shadow-primary/25"
            onClick={() => window.location.href = "/contact"}
          >
            Schedule Your Maintenance
          </Button>
        </div>
      </div>
    </section>
  );
}
