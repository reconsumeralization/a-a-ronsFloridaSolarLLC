import type { Metadata } from "next";

import {
  MaintenanceBenefits,
} from "@/components/maintenance/MaintenanceBenefits";
import {
  MaintenanceCalculator,
} from "@/components/maintenance/MaintenanceCalculator";
import { MaintenanceSchema } from "@/components/maintenance/MaintenanceSchema";
import { ServiceAreaMap } from "@/components/maintenance/ServiceAreaMap";
import { Testimonials } from "@/components/maintenance/Testimonials";

export const metadata: Metadata = {
  title: "Solar Panel Maintenance & Cleaning Services | A-A-RON Florida Solar",
  description:
    "Professional solar panel maintenance and cleaning services in Brevard County. Increase efficiency by up to 30%. Free estimates, certified technicians.",
  keywords: [
    "solar panel cleaning",
    "solar maintenance",
    "Brevard County solar",
    "solar panel efficiency",
    "solar system maintenance",
    "professional solar cleaning",
    "Melbourne solar services",
    "Palm Bay solar maintenance",
  ],
  openGraph: {
    title: "Expert Solar Panel Maintenance & Cleaning | A-A-RON Florida Solar",
    description:
      "Keep your solar investment performing at peak efficiency. Professional maintenance services in Brevard County and surrounding areas.",
    images: [
      {
        url: "/images/maintenance-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Solar panel maintenance services",
      },
    ],
  },
};

export default function MaintenancePage() {
  return (
    <>
      <MaintenanceSchema />
      <main>
        <section className="relative bg-gradient-to-b from-primary/10 to-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Professional Solar Panel Maintenance & Cleaning
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Maximize your solar investment with expert maintenance. Increase
                efficiency by up to 30% with regular professional cleaning and
                maintenance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#calculator"
                  className="btn btn-primary"
                >
                  Get Free Estimate
                </a>
                <a
                  href="#benefits"
                  className="btn btn-outline"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits">
          <MaintenanceBenefits />
        </section>

        <section id="calculator" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <MaintenanceCalculator />
            </div>
          </div>
        </section>

        <Testimonials />
        <ServiceAreaMap />
      </main>
    </>
  );
}
