"use client";

import { useState } from "react";

import { ClientButton } from "@/components/shared/ClientButton";
import { recommendSystemSize } from "@/utils/calculator";

interface SystemSizeCalculatorProps {
  onSizeCalculated: (size: number, usage: number, bill: number) => void;
}

export function SystemSizeCalculator(
  { onSizeCalculated }: SystemSizeCalculatorProps,
) {
  const [monthlyUsage, setMonthlyUsage] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");

  const handleCalculate = () => {
    const usage = parseFloat(monthlyUsage);
    const bill = parseFloat(monthlyBill);
    if (!isNaN(usage) && !isNaN(bill)) {
      const recommendedSize = recommendSystemSize(usage);
      onSizeCalculated(recommendedSize, usage, bill);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">System Size Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Monthly Electricity Usage (kWh)
          </label>
          <input
            type="number"
            value={monthlyUsage}
            onChange={(e) => setMonthlyUsage(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Monthly Electricity Bill ($)
          </label>
          <input
            type="number"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <ClientButton onClick={handleCalculate}>
          Calculate Recommended Size
        </ClientButton>
      </div>
    </div>
  );
}
