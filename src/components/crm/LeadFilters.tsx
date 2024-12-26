"use client";

import { useState } from "react";

import { ClientButton } from "@/components/shared/ClientButton";
import type { Customer } from "@/types/crm";

interface LeadFiltersProps {
  filters: {
    status: string;
    source: string;
    dateRange: string;
  };
  onFilterChange: (filters: LeadFiltersProps["filters"]) => void;
}

type Status = Customer["status"] | "all";
type Source = Customer["source"] | "all";
type DateRange = "all" | "today" | "week" | "month" | "quarter";

export function LeadFilters({ filters, onFilterChange }: LeadFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const statuses: Status[] = [
    "all",
    "lead",
    "prospect",
    "customer",
    "completed",
  ];
  const sources: Source[] = [
    "all",
    "website",
    "referral",
    "advertisement",
    "other",
  ];
  const dateRanges: { value: DateRange; label: string }[] = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
  ];

  const handleFilterChange = (
    key: keyof LeadFiltersProps["filters"],
    value: string,
  ) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      status: "all",
      source: "all",
      dateRange: "all",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <ClientButton onClick={() => setIsOpen(!isOpen)}>Filters</ClientButton>
      </div>

      {isOpen && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Statuses" : status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <select
                value={filters.source}
                onChange={(e) => handleFilterChange("source", e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source === "all" ? "All Sources" : source}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) =>
                  handleFilterChange("dateRange", e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <ClientButton onClick={clearFilters} variant="outline" size="sm">
              Clear Filters
            </ClientButton>
          </div>
        </div>
      )}
    </div>
  );
}
