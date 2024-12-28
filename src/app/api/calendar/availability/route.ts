import { NextResponse } from "next/server";

import { CalendarService } from "@/services/CalendarService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get("serviceType") as
      | "repair"
      | "maintenance"
      | "inspection";
    const date = new Date(searchParams.get("date") || "");
    const duration = parseInt(searchParams.get("duration") || "120", 10);

    if (!serviceType || isNaN(date.getTime())) {
      return NextResponse.json(
        { message: "Invalid parameters" },
        { status: 400 }
      );
    }

    const calendar = CalendarService.getInstance();
    const slots = await calendar.getAvailableSlots(serviceType, date, duration);

    return NextResponse.json(slots);
  } catch (error) {
    console.error("Calendar availability error:", error);
    return NextResponse.json(
      { message: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
