"use client";

import { useState } from "react";

import { ClientButton } from "@/components/shared/ClientButton";

import { MaintenanceHistory } from "./MaintenanceHistory";
import { MaintenanceStats } from "./MaintenanceStats";
import { UpcomingMaintenance } from "./UpcomingMaintenance";
import { WeatherAlerts } from "./WeatherAlerts";

export function MaintenanceDashboard() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming",
  );

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <MaintenanceStats />
        <div className="lg:col-span-2">
          <WeatherAlerts />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b">
          <div className="flex">
            <ClientButton onClick={() => setActiveTab("upcoming")}>
              Upcoming
            </ClientButton>
            <ClientButton onClick={() => setActiveTab("history")}>
              History
            </ClientButton>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "upcoming"
            ? <UpcomingMaintenance />
            : <MaintenanceHistory />}
        </div>
      </div>
    </div>
  );
}
