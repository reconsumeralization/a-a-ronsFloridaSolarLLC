import { CheckCircle } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    title: "Increased Energy Production",
    description: "Up to 30% more efficient energy production with clean panels",
    icon: "/icons/energy-production.svg",
    stats: "25-30% Increase",
  },
  {
    title: "Extended System Lifespan",
    description: "Regular maintenance can extend panel life by 5-10 years",
    icon: "/icons/lifespan.svg",
    stats: "10+ Years",
  },
  {
    title: "ROI Protection",
    description: "Protect your solar investment with professional maintenance",
    icon: "/icons/roi.svg",
    stats: "200% ROI",
  },
  {
    title: "Warranty Compliance",
    description: "Maintain manufacturer warranty with certified maintenance",
    icon: "/icons/warranty.svg",
    stats: "100% Coverage",
  },
];

export function MaintenanceBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why Professional Solar Maintenance Matters
          </h2>
          <p className="text-lg text-gray-600">
            Maximize your solar investment with our expert maintenance services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center mb-4">
                <Image
                  src={benefit.icon}
                  alt={benefit.title}
                  width={48}
                  height={48}
                  className="text-primary"
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {benefit.description}
              </p>
              <div className="flex items-center justify-center gap-2 text-primary font-bold">
                <CheckCircle className="w-5 h-5" />
                <span>{benefit.stats}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Our Comprehensive Maintenance Package
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Professional Panel Cleaning",
              "Performance Monitoring",
              "Efficiency Testing",
              "Weather Protection",
              "Debris Removal",
              "System Inspection",
              "Connection Check",
              "Warranty Support",
              "24/7 Emergency Service",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 bg-white p-4 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
