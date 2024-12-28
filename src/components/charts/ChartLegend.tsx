"use client";

import { Info } from "lucide-react";

interface LegendItem {
  label: string;
  description: string;
  color: string;
  value?: string | number;
}

interface ChartLegendProps {
  items: LegendItem[];
  title?: string;
}

export function ChartLegend({ items, title }: ChartLegendProps) {
  return (
    <div className="mt-6 bg-white rounded-lg p-4">
      {title && (
        <h5 className="text-sm font-semibold text-gray-700 mb-3">{title}</h5>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="group flex items-start gap-3 cursor-help"
          >
            <div
              className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.label}</span>
                {item.value && (
                  <span className="text-sm text-gray-600">({item.value})</span>
                )}
                <Info className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
