import { SunIcon } from "../Icons";

const features = [
  {
    title: "Professional Installation",
    description:
      "Expert installation by certified professionals with years of experience in solar technology.",
  },
  {
    title: "25-Year Warranty",
    description:
      "Industry-leading warranty coverage for panels, inverters, and workmanship.",
  },
  {
    title: "Energy Independence",
    description:
      "Generate your own clean energy and reduce dependence on traditional power sources.",
  },
  {
    title: "Cost Savings",
    description:
      "Significant reduction in energy bills and potential tax incentives for solar adoption.",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose A-A-RON Solar?
          </h2>
          <p className="text-gray-600">
            We provide comprehensive solar solutions with industry-leading
            quality and service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <SunIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
