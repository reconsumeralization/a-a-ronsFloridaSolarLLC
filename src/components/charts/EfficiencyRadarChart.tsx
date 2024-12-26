"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Chart, registerables } from "chart.js";
import { Activity } from "lucide-react";

import { ClientButton } from "@/components/shared/ClientButton";
import { trackEvent } from "@/lib/utils/analytics";
import { baseChartOptions, CHART_COLORS } from "@/lib/utils/chartConfig";
import { EFFICIENCY_DESCRIPTIONS } from "@/lib/utils/efficiency";

import { ChartLegend } from "./ChartLegend";

Chart.register(...registerables);

interface EfficiencyMetrics {
  energyOutput: number;
  panelEfficiency: number;
  shadeOptimization: number;
  dustReduction: number;
  degradationPrevention: number;
}

interface EfficiencyRadarProps {
  current: EfficiencyMetrics;
  potential: EfficiencyMetrics;
}

export function EfficiencyRadarChart(
  { current, potential }: EfficiencyRadarProps,
) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const handleHover = useCallback((event: MouseEvent) => {
    if (!chartInstance.current) return;

    const points = chartInstance.current.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      false,
    );

    if (points.length) {
      const metric = Object.keys(current)[points[0].index];
      setSelectedMetric(metric);
    } else {
      setSelectedMetric(null);
    }
  }, [current]);

  const handleClick = useCallback((event: MouseEvent) => {
    if (!chartInstance.current || isDragging.current) return;

    const points = chartInstance.current.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: true },
      false,
    );

    if (points.length) {
      const metric = Object.keys(current)[points[0].index];
      setSelectedMetric((prev) => {
        const newSelection = prev === metric ? null : metric;
        trackEvent("efficiency_metric_selected", {
          metric,
          selected: Boolean(newSelection),
        });
        return newSelection;
      });
    }
  }, [current]);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    isDragging.current = true;
    lastX.current = event.clientX;
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = event.clientX - lastX.current;
    setRotation((prev) => (prev + deltaX) % 360);
    lastX.current = event.clientX;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (event.touches.length === 1) {
      isDragging.current = true;
      lastX.current = event.touches[0].clientX;
    }
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!isDragging.current || event.touches.length !== 1) return;

    const deltaX = event.touches[0].clientX - lastX.current;
    setRotation((prev) => (prev + deltaX) % 360);
    lastX.current = event.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const exportData = useCallback(() => {
    const data = {
      current,
      potential,
      timestamp: new Date().toISOString(),
      metrics: Object.keys(current).map((key) => ({
        name: key,
        current: current[key as keyof typeof current],
        potential: potential[key as keyof typeof potential],
        description:
          EFFICIENCY_DESCRIPTIONS[key as keyof typeof EFFICIENCY_DESCRIPTIONS],
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "efficiency-analysis.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    trackEvent("efficiency_data_exported", {
      metrics: Object.keys(current),
    });
  }, [current, potential]);

  const handleZoom = (direction: "in" | "out") => {
    setZoomLevel((prev) => {
      const newLevel = direction === "in" ? prev + 0.2 : prev - 0.2;
      return Math.min(Math.max(newLevel, 0.5), 2);
    });
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const canvas = chartRef.current;
    canvas.addEventListener("mousemove", handleHover);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("mousemove", handleHover);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    handleHover,
    handleClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: Object.keys(current).map(
          (key) =>
            key.charAt(0).toUpperCase() +
            key.slice(1).replace(/([A-Z])/g, " $1"),
        ),
        datasets: [
          {
            label: "Current Performance",
            data: Object.values(current),
            borderColor: CHART_COLORS.secondary.main,
            backgroundColor: CHART_COLORS.secondary.light,
            fill: true,
          },
          {
            label: "Potential After Maintenance",
            data: Object.values(potential),
            borderColor: CHART_COLORS.primary.main,
            backgroundColor: CHART_COLORS.primary.light,
            fill: true,
          },
        ],
      },
      options: {
        ...baseChartOptions,
        animation: {
          duration: 750,
          easing: "easeInOutQuart",
        },
        scales: {
          r: {
            min: 0,
            max: 100 / zoomLevel,
            ticks: {
              stepSize: 20,
              callback: (value) => `${value}%`,
            },
            pointLabels: {
              font: {
                size: 11,
              },
            },
            startAngle: rotation,
          },
        },
        plugins: {
          ...baseChartOptions.plugins,
          tooltip: {
            ...baseChartOptions.plugins?.tooltip,
            callbacks: {
              label: (context) => {
                const isSelected =
                  selectedMetric === Object.keys(current)[context.dataIndex];
                const value = context.raw as number;
                return `${context.dataset.label}: ${value}%${
                  isSelected ? " (Selected)" : ""
                }`;
              },
              afterBody: (tooltipItems) => {
                const metric = Object.keys(current)[tooltipItems[0].dataIndex];
                return [
                  "",
                  EFFICIENCY_DESCRIPTIONS[
                    metric as keyof typeof EFFICIENCY_DESCRIPTIONS
                  ],
                ];
              },
            },
          },
        },
      },
    });
  }, [current, potential, zoomLevel, selectedMetric, rotation]);

  const legendItems = Object.entries(current).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() +
      key.slice(1).replace(/([A-Z])/g, " $1"),
    description:
      EFFICIENCY_DESCRIPTIONS[key as keyof typeof EFFICIENCY_DESCRIPTIONS],
    color: selectedMetric === key
      ? CHART_COLORS.primary.main
      : CHART_COLORS.secondary.main,
    value: `${value}% → ${potential[key as keyof typeof potential]}%`,
  }));

  return (
    <div className="p-6 border-t bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5" />
          System Efficiency Analysis
        </h4>
        <div className="flex items-center gap-2">
          <ClientButton onClick={exportData}>Export</ClientButton>
          <ClientButton onClick={() => handleZoom("out")}>
            Zoom Out
          </ClientButton>
          <ClientButton onClick={() => handleZoom("in")}>Zoom In</ClientButton>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="aspect-square relative group">
          <canvas ref={chartRef} />
          {selectedMetric && (
            <div className="absolute top-0 left-0 bg-black/50 text-white px-2 py-1 text-sm rounded">
              Click to deselect metric
            </div>
          )}
        </div>
        <ChartLegend
          title="Efficiency Metrics"
          items={legendItems}
        />
      </div>
    </div>
  );
}
