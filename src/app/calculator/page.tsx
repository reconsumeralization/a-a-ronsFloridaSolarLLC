"use client";

import { useState } from "react";

import { ComparisonTable } from "@/components/calculator/ComparisonTable";
import { DownloadReport } from "@/components/calculator/DownloadReport";
import { SavingsChart } from "@/components/calculator/SavingsChart";
import { SavingsResults } from "@/components/calculator/SavingsResults";
import { SystemConfig } from "@/components/calculator/SystemConfig";
import {
  SystemSizeCalculator,
} from "@/components/calculator/SystemSizeCalculator";
import {
  averageUtilityRates,
  defaultSystemData,
  type ElectricityData,
  floridaIncentives,
  type SolarSystemData,
} from "@/data/calculator";
import { calculateSolarSavings } from "@/utils/calculator";

export default function CalculatorPage() {
  const [systemData, setSystemData] = useState<SolarSystemData>(
    defaultSystemData,
  );
  const [electricityData, setElectricityData] = useState<ElectricityData>({
    monthlyBill: 150,
    averageUsage: 1000,
    utilityRate: averageUtilityRates.florida,
  });

  const handleSizeCalculated = (size: number, usage: number, bill: number) => {
    setSystemData((prev) => ({
      ...prev,
      systemSize: Math.round(size * 10) / 10,
    }));
    setElectricityData((prev) => ({
      ...prev,
      monthlyBill: bill,
      averageUsage: usage,
    }));
  };

  const results = calculateSolarSavings(
    electricityData,
    systemData,
    floridaIncentives,
  );

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Solar Savings Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Estimate your potential savings with solar energy
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <SystemSizeCalculator onSizeCalculated={handleSizeCalculated} />
          <SystemConfig
            initialConfig={systemData}
            onConfigUpdate={setSystemData}
          />
        </div>

        <div className="space-y-12">
          <SavingsResults
            annualProduction={results.annualProduction}
            totalIncentives={results.totalIncentives}
            netCost={results.netCost}
            paybackPeriod={results.paybackPeriod}
            twentyYearSavings={results.savings
              .slice(0, 20)
              .reduce((sum, saving) => sum + saving, 0)}
          />

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Cost Comparison</h3>
            <ComparisonTable
              monthlyBill={electricityData.monthlyBill}
              yearlySavings={results.savings[0]}
              twentyYearSavings={results.savings
                .slice(0, 20)
                .reduce((sum, saving) => sum + saving, 0)}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">
              25-Year Savings Projection
            </h3>
            <SavingsChart savings={results.savings} years={25} />
          </div>

          <div className="text-center">
            <DownloadReport
              electricity={electricityData}
              system={systemData}
              incentives={floridaIncentives}
              results={results}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
