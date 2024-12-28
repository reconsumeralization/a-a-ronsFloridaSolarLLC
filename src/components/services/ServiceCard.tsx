import { ArrowRightIcon } from "@/components/Icons";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
      <p className="text-gray-600 mb-6">{service.description}</p>
      <div className="space-y-4 mb-6">
        {service.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">{service.priceRange}</span>
        <button className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
          Learn More
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
