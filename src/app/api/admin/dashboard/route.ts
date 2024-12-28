import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { requireRole } from '@/middleware/auth';

export async function GET(request: NextRequest) {
  // Check if user has admin role
  const authCheck = await requireRole(request, "admin");
  if (authCheck) return authCheck;

  // Return protected data
  return NextResponse.json({
    stats: {
      totalUsers: 100,
      activeUsers: 75,
      revenue: 50000,
    },
    recentActivity: [
      {
        id: 1,
        type: "new_user",
        details: "New user registration",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        type: "payment",
        details: "Payment received",
        timestamp: new Date().toISOString(),
      },
    ],
  });
}
