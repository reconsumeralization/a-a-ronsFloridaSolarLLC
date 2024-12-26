"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Calculator, DollarSign, Sun, Zap } from "lucide-react";

import { ClientButton } from "@/components/shared/ClientButton";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";

interface CalculationResult {
  monthlyProduction: number;
  annualSavings: number;
  paybackPeriod: number;
  twentyYearSavings: number;
}

const AVERAGE_SOLAR_PRODUCTION = 1.3; // kWh per watt per year in Florida
const AVERAGE_ELECTRICITY_RATE = 0.13; // $ per kWh in Florida
const ANNUAL_RATE_INCREASE = 0.03; // 3% annual electricity rate increase

export function ROICalculator() {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [roofShading, setRoofShading] = useState("none");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateROI = () => {
    const monthlyUsage = Number(monthlyBill) / AVERAGE_ELECTRICITY_RATE;
    const annualUsage = monthlyUsage * 12;

    // Calculate system size needed
    const systemSize = Math.ceil(annualUsage / AVERAGE_SOLAR_PRODUCTION);

    // Apply shading factor
    const shadingFactors = {
      none: 1,
      light: 0.9,
      moderate: 0.8,
      heavy: 0.7,
    };

    const shadingFactor =
      shadingFactors[roofShading as keyof typeof shadingFactors];

    // Calculate production and savings
    const monthlyProduction =
      (systemSize * AVERAGE_SOLAR_PRODUCTION * shadingFactor) / 12;
    const firstYearSavings = monthlyProduction * 12 * AVERAGE_ELECTRICITY_RATE;

    // Calculate 20-year savings with rate increases
    let totalSavings = 0;
    let currentRate = AVERAGE_ELECTRICITY_RATE;

    for (let year = 0; year < 20; year++) {
      totalSavings += monthlyProduction * 12 * currentRate;
      currentRate *= 1 + ANNUAL_RATE_INCREASE;
    }

    // Calculate payback period
    const systemCost = systemSize * 2.5 * 1000; // $2.50 per watt
    const paybackPeriod = systemCost / firstYearSavings;

    setResult({
      monthlyProduction: Math.round(monthlyProduction),
      annualSavings: Math.round(firstYearSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      twentyYearSavings: Math.round(totalSavings),
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Calculator className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Solar Savings Calculator
          </h2>
          <p className="text-xl text-gray-600">
            See how much you could save with professional solar maintenance
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Monthly Electric Bill
                </label>
                <Input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  placeholder="Enter amount in $"
                  icon={<DollarSign className="w-5 h-5" />}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Roof Shading
                </label>
                <Select
                  value={roofShading}
                  onChange={(e) => setRoofShading(e.target.value)}
                  options={[
                    { value: "none", label: "No Shading" },
                    { value: "light", label: "Light Shading" },
                    { value: "moderate", label: "Moderate Shading" },
                    { value: "heavy", label: "Heavy Shading" },
                  ]}
                />
              </div>

              <ClientButton
                onClick={calculateROI}
                disabled={!monthlyBill}
                className="w-full"
              >
                Calculate Savings
              </ClientButton>
            </div>

            <div>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white rounded-xl shadow-sm">
                      <Sun className="w-6 h-6 text-primary mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        {result.monthlyProduction.toLocaleString()} kWh
                      </div>
                      <div className="text-sm text-gray-600">
                        Monthly Production
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm">
                      <DollarSign className="w-6 h-6 text-green-500 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        ${result.annualSavings.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Annual Savings
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white rounded-xl shadow-sm">
                      <Calculator className="w-6 h-6 text-blue-500 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        {result.paybackPeriod} Years
                      </div>
                      <div className="text-sm text-gray-600">
                        Payback Period
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm">
                      <Zap className="w-6 h-6 text-yellow-500 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        ${(result.twentyYearSavings / 1000).toFixed(1)}k
                      </div>
                      <div className="text-sm text-gray-600">
                        20-Year Savings
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
