import { CheckCircle, XCircle } from "lucide-react";

const comparisonData = {
  maintained: {
    efficiency: "95-100%",
    lifespan: "25+ years",
    warranty: "Full coverage",
    annualSavings: "$1,200+",
    performance: "Optimal",
    issues: "Preventive care",
  },
  unmaintained: {
    efficiency: "70-85%",
    lifespan: "15-20 years",
    warranty: "May be void",
    annualSavings: "$800-900",
    performance: "Degraded",
    issues: "Reactive repairs",
  },
};

export function ROIComparison() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-primary/5">
        <h3 className="text-2xl font-bold mb-2">
          Maintenance ROI Comparison
        </h3>
        <p className="text-gray-600">
          See the difference professional maintenance makes to your solar
          investment
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1" />
          <div className="text-center font-bold text-primary">
            With Maintenance
          </div>
          <div className="text-center font-bold text-gray-500">
            Without Maintenance
          </div>

          {Object.entries(comparisonData.maintained).map(([key, value]) => (
            <div key={key} className="contents">
              <div className="py-4 font-medium border-t">
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
              </div>
              <div className="py-4 text-center border-t">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{value}</span>
                </div>
              </div>
              <div className="py-4 text-center border-t">
                <div className="flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span>
                    {comparisonData
                      .unmaintained[
                        key as keyof typeof comparisonData.unmaintained
                      ]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-gray-600">
            * Based on average data from maintained vs unmaintained systems in
            Florida. Actual results may vary based on system size, location, and
            environmental factors.
          </p>
        </div>
      </div>
    </div>
  );
}
