import { Metadata } from "next";

import { ServiceBenefits } from "@/components/services/ServiceBenefits";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | A-A-RON Florida Solar",
  description:
    "Professional solar installation and maintenance services in Florida",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function ServicesPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-600">
            Comprehensive solar solutions for your home or business, from
            installation to maintenance
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Individual Service Sections */}
        {services.map((service) => (
          <section key={service.id} className="py-20" id={service.id}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
              <p className="text-xl text-gray-600 mb-12">
                {service.description}
              </p>
              <ServiceBenefits service={service} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
