export type MaintenanceStatus =
  | "scheduled"
  | "in-progress"
  | "completed"
  | "cancelled";

export type MaintenanceType =
  | "cleaning"
  | "inspection"
  | "repair"
  | "emergency";

export interface MaintenanceRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: Date;
  timeSlot: "morning" | "afternoon" | "evening";
  notes?: string;
  completedDate?: Date;
  technicianNotes?: string;
  weatherAlert?: {
    type: "rain" | "storm" | "wind" | "heat";
    severity: "low" | "medium" | "high";
    message: string;
  };
}
