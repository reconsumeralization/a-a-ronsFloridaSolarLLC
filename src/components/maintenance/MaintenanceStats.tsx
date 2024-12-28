import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "lucide-react";

import { useMaintenance } from "@/hooks/useMaintenance";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ title, value, icon, description, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        {trend && (
          <div
            className={`text-sm font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : "-"}
            {trend.value}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold mt-4">{value}</h3>
      <p className="text-sm font-medium text-gray-600 mt-1">{title}</p>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  );
}

export function MaintenanceStats() {
  const { stats } = useMaintenance();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
      <StatCard
        title="Scheduled"
        value={stats.scheduled}
        icon={<CalendarIcon className="w-6 h-6 text-primary" />}
        description="Upcoming maintenance visits"
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="In Progress"
        value={stats.inProgress}
        icon={<ClockIcon className="w-6 h-6 text-primary" />}
        description="Currently being serviced"
      />
      <StatCard
        title="Completed"
        value={stats.completed}
        icon={<CheckCircleIcon className="w-6 h-6 text-primary" />}
        description="Successfully completed this month"
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Weather Alerts"
        value={stats.weatherAlerts}
        icon={<ExclamationTriangleIcon className="w-6 h-6 text-primary" />}
        description="Active weather warnings"
        trend={{ value: 2, isPositive: false }}
      />
    </div>
  );
}
