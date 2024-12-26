import Image from "next/image";

import { Button } from "@/components/shared/Button";

import { MaintenanceFAQ } from "./MaintenanceFAQ";

export function MaintenanceSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Solar Panel Maintenance & Cleaning
          </h2>
          <p className="text-lg text-gray-600">
            Keep your solar investment performing at its peak with our
            professional maintenance and cleaning services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              Professional Cleaning Services
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary">✓</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Scheduled Maintenance</h4>
                  <p className="text-gray-600">
                    Regular cleaning and inspection to ensure optimal
                    performance
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary">✓</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Performance Monitoring</h4>
                  <p className="text-gray-600">
                    Real-time monitoring to detect and address issues promptly
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary">✓</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Specialized Equipment</h4>
                  <p className="text-gray-600">
                    Professional-grade tools and eco-friendly cleaning solutions
                  </p>
                </div>
              </div>
            </div>
            <Button className="mt-6">Schedule Maintenance</Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/solar-cleaning.jpg"
              alt="Solar panel cleaning"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Maintenance Plans</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Quarterly inspections</li>
              <li>• Performance reports</li>
              <li>• Priority service</li>
              <li>• Weather damage checks</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Cleaning Process</h3>
            <ul className="space-y-3 text-gray-600">
              <li>• Deionized water cleaning</li>
              <li>• Soft brush techniques</li>
              <li>• Bird deterrent installation</li>
              <li>• Debris removal</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Benefits</h3>
            <ul className="space-y-3 text-gray-600">
              <li>�� Increased efficiency</li>
              <li>• Extended system life</li>
              <li>• Warranty compliance</li>
              <li>• Maximum ROI</li>
            </ul>
          </div>
        </div>

        <MaintenanceFAQ />
      </div>
    </section>
  );
}
