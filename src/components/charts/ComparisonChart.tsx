"use client";

import { useEffect, useRef } from "react";

import { Chart, registerables } from "chart.js";
import { BarChart } from "lucide-react";

import { type ROIProjection } from "@/lib/utils/calculations";
import {
  baseChartOptions,
  CHART_COLORS,
  currencyFormatter,
} from "@/lib/utils/chartConfig";

Chart.register(...registerables);

interface ComparisonChartProps {
  data: ROIProjection[];
}

export function ComparisonChart({ data }: ComparisonChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((d) => `Year ${d.year}`),
        datasets: [
          {
            label: "Annual Savings",
            data: data.map((d) => d.savings),
            backgroundColor: CHART_COLORS.primary.main,
            borderColor: CHART_COLORS.primary.main,
            borderWidth: 1,
          },
          {
            label: "Maintenance Investment",
            data: data.map((d) => d.maintenanceCost),
            backgroundColor: CHART_COLORS.secondary.main,
            borderColor: CHART_COLORS.secondary.main,
            borderWidth: 1,
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
                const label = context.dataset.label || "";
                const value = currencyFormatter.format(context.parsed.y);
                return `${label}: ${value}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => currencyFormatter.format(value as number),
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="p-6 border-t bg-gray-50">
      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart className="w-5 h-5" />
        Savings vs. Investment Comparison
      </h4>
      <div className="aspect-[2/1] w-full">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
