"use client";

import { useState } from "react";

import { CustomerList } from "./CustomerList";
import { CustomerStats } from "./CustomerStats";
import { LeadFilters } from "./LeadFilters";

export function CRMDashboard() {
  const [filters, setFilters] = useState({
    status: "all",
    source: "all",
    dateRange: "all",
  });

  return (
    <div className="space-y-6">
      <CustomerStats />
      <LeadFilters filters={filters} onFilterChange={setFilters} />
      <CustomerList filters={filters} />
    </div>
  );
}
