"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/shared/Button";

const serviceCities = [
  { name: "Tampa", count: 1200 },
  { name: "Orlando", count: 950 },
  { name: "Jacksonville", count: 800 },
  { name: "Miami", count: 750 },
  { name: "St. Petersburg", count: 600 },
  { name: "Clearwater", count: 450 },
];

export function ServiceArea() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Service Area
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Serving Florida's Solar Needs
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                With service centers across Florida, we're ready to help
                maintain your solar investment, no matter where you are.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {serviceCities.map((city) => (
                  <div
                    key={city.name}
                    className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">{city.name}</div>
                      <div className="text-sm text-gray-600">
                        {city.count}+ installations
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button>Check If We Serve Your Area</Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square">
              <Image
                src="/images/florida-map.svg"
                alt="Florida Service Area Map"
                fill
                className="object-contain"
              />
              {serviceCities.map((city) => (
                <div
                  key={city.name}
                  className="absolute w-3 h-3 bg-primary rounded-full"
                  style={{
                    // You'll need to add specific coordinates for each city
                    // left: "50%",
                    // top: "30%",
                  }}
                >
                  <div className="absolute w-6 h-6 bg-primary/30 rounded-full -inset-1.5 animate-ping" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
