"use client";

import { useEffect, useRef } from "react";

import { Chart, registerables } from "chart.js";
import { PieChart } from "lucide-react";

import {
  baseChartOptions,
  CHART_COLORS,
  currencyFormatter,
} from "@/lib/utils/chartConfig";

Chart.register(...registerables);

interface CostBreakdownProps {
  laborCost: number;
  materialsCost: number;
  equipmentCost: number;
  overheadCost: number;
}

export function CostBreakdownChart({
  laborCost,
  materialsCost,
  equipmentCost,
  overheadCost,
}: CostBreakdownProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const total = laborCost + materialsCost + equipmentCost + overheadCost;

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Labor", "Materials", "Equipment", "Overhead"],
        datasets: [
          {
            data: [laborCost, materialsCost, equipmentCost, overheadCost],
            backgroundColor: [
              CHART_COLORS.primary.main,
              CHART_COLORS.secondary.main,
              CHART_COLORS.tertiary.main,
              CHART_COLORS.quaternary.main,
            ],
          },
        ],
      },
      options: {
        ...baseChartOptions,
        plugins: {
          ...baseChartOptions.plugins,
          tooltip: {
            ...baseChartOptions.plugins?.tooltip,
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${
                  currencyFormatter.format(value)
                } (${percentage}%)`;
              },
            },
          },
        },
      },
    });
  }, [laborCost, materialsCost, equipmentCost, overheadCost]);

  return (
    <div className="p-6 border-t bg-gray-50">
      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <PieChart className="w-5 h-5" />
        Cost Breakdown
      </h4>
      <div className="aspect-square max-w-md mx-auto">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
