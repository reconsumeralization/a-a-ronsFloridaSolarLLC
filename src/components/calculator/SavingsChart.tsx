"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SavingsChartProps {
  savings: number[];
  years: number;
}

export function SavingsChart({ savings, years }: SavingsChartProps) {
  const data = savings.map((saving, index) => ({
    year: `Year ${index + 1}`,
    savings: Math.round(saving),
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            interval={Math.floor(years / 10)}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(
              value: number,
            ) => [`$${value.toLocaleString()}`, "Savings"]}
          />
          <Legend />
          <Bar dataKey="savings" fill="#22c55e" name="Annual Savings" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
