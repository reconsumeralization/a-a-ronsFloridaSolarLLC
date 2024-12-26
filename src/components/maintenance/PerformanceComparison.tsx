"use client";

import { useEffect, useRef } from "react";

import Chart from "chart.js/auto";

export function PerformanceComparison() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Maintained Panels",
            data: [95, 93, 94, 95, 93, 94],
            borderColor: "#1E88E5",
            tension: 0.4,
          },
          {
            label: "Unmaintained Panels",
            data: [95, 90, 85, 80, 75, 70],
            borderColor: "#EF5350",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Solar Panel Efficiency Over Time",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 60,
            max: 100,
            title: {
              display: true,
              text: "Efficiency (%)",
            },
          },
        },
      },
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <canvas ref={chartRef} />
    </div>
  );
}
