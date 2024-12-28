import { formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/shared/Badge";
import { useMaintenance } from "@/hooks/useMaintenance";
import type { MaintenanceStatus } from "@/types/maintenance";

const statusColors: Record<MaintenanceStatus, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function MaintenanceHistory() {
  const { maintenanceHistory, isLoading } = useMaintenance();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {maintenanceHistory.map((record) => (
        <div
          key={record.id}
          className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{record.customerName}</h3>
              <Badge className={statusColors[record.status]}>
                {record.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              {record.serviceType} - {record.timeSlot}
            </p>
            <time className="text-sm text-gray-500">
              {formatDistanceToNow(record.scheduledDate, { addSuffix: true })}
            </time>
            {record.weatherAlert && (
              <div className="mt-2 text-sm text-yellow-600">
                ⚠️ {record.weatherAlert.message}
              </div>
            )}
          </div>
          {record.technicianNotes && (
            <div className="max-w-md text-sm text-gray-600">
              <p className="font-medium">Technician Notes:</p>
              <p>{record.technicianNotes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
