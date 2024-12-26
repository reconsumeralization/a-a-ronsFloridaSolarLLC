import type { Service } from "@/data/services";

interface ServiceBenefitsProps {
  service: Service;
}

export function ServiceBenefits({ service }: ServiceBenefitsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {service.benefits.map((benefit) => (
        <div
          key={benefit.title}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
          <p className="text-gray-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}
