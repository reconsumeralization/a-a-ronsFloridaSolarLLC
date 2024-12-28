"use client";

import { useEffect, useRef } from "react";

import { MapPin } from "lucide-react";

interface ServiceArea {
  city: string;
  county: string;
  coordinates: [number, number];
  primaryService: boolean;
}

const serviceAreas: ServiceArea[] = [
  {
    city: "Melbourne",
    county: "Brevard",
    coordinates: [28.0836, -80.6081],
    primaryService: true,
  },
  {
    city: "Palm Bay",
    county: "Brevard",
    coordinates: [28.0345, -80.5887],
    primaryService: true,
  },
  {
    city: "Titusville",
    county: "Brevard",
    coordinates: [28.6122, -80.8075],
    primaryService: true,
  },
  {
    city: "Cocoa",
    county: "Brevard",
    coordinates: [28.3861, -80.7428],
    primaryService: true,
  },
  {
    city: "Vero Beach",
    county: "Indian River",
    coordinates: [27.6386, -80.3973],
    primaryService: false,
  },
  {
    city: "Orlando",
    county: "Orange",
    coordinates: [28.5383, -81.3792],
    primaryService: false,
  },
];

export function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map (using your preferred mapping library)
    // Example using Leaflet or Google Maps would go here
    // For now, we'll show a list view
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Service Areas</h2>
          <p className="text-lg text-gray-600">
            Providing expert solar maintenance across Brevard County and
            surrounding areas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Primary Service Areas</h3>
            <div className="space-y-4">
              {serviceAreas
                .filter((area) => area.primaryService)
                .map((area) => (
                  <div
                    key={area.city}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{area.city}</h4>
                      <p className="text-sm text-gray-600">
                        {area.county} County
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Extended Service Areas</h3>
            <div className="space-y-4">
              {serviceAreas
                .filter((area) => !area.primaryService)
                .map((area) => (
                  <div
                    key={area.city}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{area.city}</h4>
                      <p className="text-sm text-gray-600">
                        {area.county} County
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
