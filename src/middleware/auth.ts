import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return {
      success: false,
      error: "Missing authentication token",
    };
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    return {
      success: true,
      payload: verified.payload,
    };
  } catch (error) {
    return {
      success: false,
      error: "Invalid token",
    };
  }
}

export async function protectRoute(request: NextRequest) {
  const auth = await verifyAuth(request);

  if (!auth.success) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  return null; // Continue to route handler
}

// For role-based access control
export async function requireRole(request: NextRequest, requiredRole: string) {
  const auth = await verifyAuth(request);

  if (!auth.success) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  const userRole = (auth.payload as any).role;

  if (userRole !== requiredRole) {
    return NextResponse.json(
      { message: "Insufficient permissions" },
      { status: 403 }
    );
  }

  return null; // Continue to route handler
}
