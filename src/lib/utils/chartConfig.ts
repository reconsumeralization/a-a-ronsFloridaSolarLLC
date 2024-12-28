import { type ChartOptions } from "chart.js";

export const CHART_COLORS = {
  primary: {
    main: "rgb(34, 197, 94)",
    light: "rgba(34, 197, 94, 0.1)",
  },
  secondary: {
    main: "rgb(234, 179, 8)",
    light: "rgba(234, 179, 8, 0.1)",
  },
  tertiary: {
    main: "rgb(59, 130, 246)",
    light: "rgba(59, 130, 246, 0.1)",
  },
  quaternary: {
    main: "rgb(168, 85, 247)",
    light: "rgba(168, 85, 247, 0.1)",
  },
};

export const baseChartOptions: ChartOptions = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleFont: {
        size: 14,
        weight: "bold",
      },
      bodyFont: {
        size: 13,
      },
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
    },
  },
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
