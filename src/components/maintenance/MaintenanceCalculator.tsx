"use client";

import { useState } from "react";

import { Calculator, Leaf, LineChart } from "lucide-react";

import { ClientButton } from "@/components/shared/ClientButton";
import { Select } from "@/components/shared/Select";
import { trackEvent } from "@/lib/utils/analytics";
import {
  calculateEnvironmentalImpact,
  calculateROIProjections,
  type EnvironmentalImpact,
  type ROIProjection,
} from "@/lib/utils/calculations";

interface CalculatorInputs {
  systemSize: string;
  lastCleaning: string;
  shading: string;
  location: string;
}

const BASELINE_COSTS = {
  small: 150,
  medium: 250,
  large: 350,
};

const LOCATION_FACTORS = {
  coastal: 1.2,
  urban: 1.1,
  rural: 1.0,
};

const SHADING_FACTORS = {
  heavy: 1.3,
  moderate: 1.15,
  minimal: 1.0,
};

interface CalculatorState extends CalculatorInputs {
  estimate: {
    cost: number;
    savings: number;
    efficiency: number;
  } | null;
  roiProjections: ROIProjection[];
  environmentalImpact: EnvironmentalImpact | null;
}

export function MaintenanceCalculator() {
  const [state, setState] = useState<CalculatorState>({
    systemSize: "",
    lastCleaning: "",
    shading: "",
    location: "",
    estimate: null,
    roiProjections: [],
    environmentalImpact: null,
  });

  const calculateEstimate = () => {
    const baseCost =
      BASELINE_COSTS[state.systemSize as keyof typeof BASELINE_COSTS] || 0;
    const locationFactor =
      LOCATION_FACTORS[state.location as keyof typeof LOCATION_FACTORS] || 1;
    const shadingFactor =
      SHADING_FACTORS[state.shading as keyof typeof SHADING_FACTORS] || 1;

    const monthsSinceClean = parseInt(state.lastCleaning) || 0;
    const cost = Math.round(
      baseCost *
        locationFactor *
        shadingFactor *
        Math.min(1.5, 1 + (monthsSinceClean * 0.02)),
    );
    const efficiency = Math.round(100 - (monthsSinceClean * 1.5));
    const savings = Math.round((100 - efficiency) * baseCost * 0.12);

    const systemSizeNumber = {
      small: 10,
      medium: 15,
      large: 25,
    }[state.systemSize as keyof typeof BASELINE_COSTS] || 0;

    const roiProjections = calculateROIProjections(
      systemSizeNumber,
      savings,
      cost,
      5,
    );

    const environmentalImpact = calculateEnvironmentalImpact(
      systemSizeNumber,
      efficiency,
    );

    setState((prev) => ({
      ...prev,
      estimate: { cost, savings, efficiency },
      roiProjections,
      environmentalImpact,
    }));

    trackEvent("maintenance_calculator_used", {
      systemSize: state.systemSize,
      estimatedCost: cost,
      efficiency,
      potentialSavings: savings,
      environmentalImpact,
    });
  };

  const handleInputChange = (name: keyof CalculatorInputs, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-primary/5">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold">Maintenance Cost Calculator</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Select
            label="System Size"
            value={state.systemSize}
            onChange={(e) => handleInputChange("systemSize", e.target.value)}
            options={[
              { label: "1-10 panels", value: "small" },
              { label: "11-20 panels", value: "medium" },
              { label: "21+ panels", value: "large" },
            ]}
          />

          <Select
            label="Months Since Last Cleaning"
            value={state.lastCleaning}
            onChange={(e) => handleInputChange("lastCleaning", e.target.value)}
            options={[
              { label: "0-3 months", value: "3" },
              { label: "4-6 months", value: "6" },
              { label: "7-12 months", value: "12" },
              { label: "Over 12 months", value: "18" },
              { label: "Never cleaned", value: "24" },
            ]}
          />

          <Select
            label="Shading Environment"
            value={state.shading}
            onChange={(e) => handleInputChange("shading", e.target.value)}
            options={[
              { label: "Minimal (Open Area)", value: "minimal" },
              { label: "Moderate (Some Trees)", value: "moderate" },
              { label: "Heavy (Many Trees)", value: "heavy" },
            ]}
          />

          <Select
            label="Location Type"
            value={state.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            options={[
              { label: "Coastal Area", value: "coastal" },
              { label: "Urban Area", value: "urban" },
              { label: "Rural Area", value: "rural" },
            ]}
          />
        </div>

        <ClientButton
          onClick={calculateEstimate}
          disabled={!Object.values(state).every(Boolean)}
          className="mt-6 w-full"
        >
          Calculate Estimate
        </ClientButton>
      </div>

      {state.estimate && (
        <>
          <div className="p-6 border-t">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
                <div className="text-3xl font-bold text-primary">
                  ${state.estimate.cost}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  Current Efficiency
                </div>
                <div className="text-3xl font-bold text-primary">
                  {state.estimate.efficiency}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  Potential Savings
                </div>
                <div className="text-3xl font-bold text-primary">
                  ${state.estimate.savings}/yr
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              * Estimates are based on average data and may vary based on
              specific conditions. Contact us for a detailed assessment.
            </p>
          </div>

          <div className="p-6 border-t bg-gray-50">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              5-Year ROI Projection
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Year</th>
                    <th className="p-2 text-right">Savings</th>
                    <th className="p-2 text-right">Maintenance Cost</th>
                    <th className="p-2 text-right">Net Savings</th>
                    <th className="p-2 text-right">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {state.roiProjections.map((projection) => (
                    <tr key={projection.year} className="border-b">
                      <td className="p-2">Year {projection.year}</td>
                      <td className="p-2 text-right">${projection.savings}</td>
                      <td className="p-2 text-right">
                        ${projection.maintenanceCost}
                      </td>
                      <td className="p-2 text-right">
                        ${projection.netSavings}
                      </td>
                      <td className="p-2 text-right">{projection.roi}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {state.environmentalImpact && (
            <div className="p-6 border-t">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" />
                Environmental Impact
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    CO₂ Reduction
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {state.environmentalImpact.co2Reduction}kg
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    Trees Equivalent
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {state.environmentalImpact.treesEquivalent}
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Water Saved</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {state.environmentalImpact.waterSaved} gal
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">
                    Carbon Offset
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {state.environmentalImpact.carbonOffset}kg
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
