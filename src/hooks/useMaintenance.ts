import { useEffect, useState } from "react";

import type { MaintenanceRecord } from "@/types/maintenance";

interface MaintenanceStats {
  scheduled: number;
  inProgress: number;
  completed: number;
  weatherAlerts: number;
}

export function useMaintenance() {
  const [maintenanceHistory, setMaintenanceHistory] = useState<
    MaintenanceRecord[]
  >([]);
  const [upcomingMaintenance, setUpcomingMaintenance] = useState<
    MaintenanceRecord[]
  >([]);
  const [stats, setStats] = useState<MaintenanceStats>({
    scheduled: 0,
    inProgress: 0,
    completed: 0,
    weatherAlerts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        // In a real app, these would be API calls
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulated data
        const mockHistory: MaintenanceRecord[] = [
          {
            id: "1",
            customerName: "John Doe",
            customerEmail: "john@example.com",
            customerPhone: "(555) 123-4567",
            serviceType: "cleaning",
            status: "completed",
            scheduledDate: new Date("2024-02-15"),
            completedDate: new Date("2024-02-15"),
            timeSlot: "morning",
            technicianNotes:
              "All panels cleaned and inspected. No issues found.",
          },
          // Add more mock data as needed
        ];

        const mockUpcoming: MaintenanceRecord[] = [
          {
            id: "2",
            customerName: "Jane Smith",
            customerEmail: "jane@example.com",
            customerPhone: "(555) 987-6543",
            serviceType: "inspection",
            status: "scheduled",
            scheduledDate: new Date("2024-03-20"),
            timeSlot: "afternoon",
            weatherAlert: {
              type: "rain",
              severity: "medium",
              message: "Possible rain forecasted. May need rescheduling.",
            },
          },
          // Add more mock data as needed
        ];

        setMaintenanceHistory(mockHistory);
        setUpcomingMaintenance(mockUpcoming);
        setStats({
          scheduled: 5,
          inProgress: 2,
          completed: 12,
          weatherAlerts: 3,
        });
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaintenanceData();
  }, []);

  return {
    maintenanceHistory,
    upcomingMaintenance,
    stats,
    isLoading,
  };
}
