"use client";

import { useState } from "react";

import type { SolarSystemData } from "@/data/calculator";

interface SystemConfigProps {
  initialConfig: SolarSystemData;
  onConfigUpdate: (config: SolarSystemData) => void;
}

export function SystemConfig({
  initialConfig,
  onConfigUpdate,
}: SystemConfigProps) {
  const [config, setConfig] = useState(initialConfig);

  const handleChange = (
    field: keyof SolarSystemData,
    value: string,
  ) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const newConfig = { ...config, [field]: numValue };
      setConfig(newConfig);
      onConfigUpdate(newConfig);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">System Configuration</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            System Size (kW)
          </label>
          <input
            type="number"
            value={config.systemSize}
            onChange={(e) => handleChange("systemSize", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            min="1"
            max="20"
            step="0.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Panel Efficiency (%)
          </label>
          <input
            type="number"
            value={config.panelEfficiency * 100}
            onChange={(e) =>
              handleChange(
                "panelEfficiency",
                (parseFloat(e.target.value) / 100).toString(),
              )}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            min="15"
            max="23"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Installation Cost ($)
          </label>
          <input
            type="number"
            value={config.installationCost}
            onChange={(e) => handleChange("installationCost", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            min="5000"
            step="1000"
          />
        </div>
      </div>
    </div>
  );
}
