"use client";

import { useEffect, useRef } from "react";

import { Chart, registerables } from "chart.js";
import { LineChart } from "lucide-react";

import { type ROIProjection } from "@/lib/utils/calculations";
import {
  baseChartOptions,
  CHART_COLORS,
  currencyFormatter,
} from "@/lib/utils/chartConfig";

Chart.register(...registerables);

interface ROIChartProps {
  data: ROIProjection[];
}

export function ROIChart({ data }: ROIChartProps) {
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
      type: "line",
      data: {
        labels: data.map((d) => `Year ${d.year}`),
        datasets: [
          {
            label: "Net Savings",
            data: data.map((d) => d.netSavings),
            borderColor: CHART_COLORS.primary.main,
            backgroundColor: CHART_COLORS.primary.light,
            fill: true,
          },
          {
            label: "Maintenance Cost",
            data: data.map((d) => d.maintenanceCost),
            borderColor: CHART_COLORS.secondary.main,
            backgroundColor: CHART_COLORS.secondary.light,
            fill: true,
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
              afterBody: (tooltipItems) => {
                const item = tooltipItems[0];
                const yearData = data[item.dataIndex];
                return [
                  "",
                  `ROI: ${yearData.roi.toFixed(1)}%`,
                  `Cumulative Savings: ${
                    currencyFormatter.format(yearData.cumulativeSavings)
                  }`,
                ];
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
        <LineChart className="w-5 h-5" />
        ROI Visualization
      </h4>
      <div className="aspect-[2/1] w-full">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
