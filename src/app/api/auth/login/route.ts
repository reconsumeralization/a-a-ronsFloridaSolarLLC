import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { csrfProtection } from '@/middleware/csrf';
import { rateLimiter } from '@/middleware/rateLimiter';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const rateLimit = await rateLimiter(ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        { message: "Too many login attempts" },
        {
          status: 429,
          headers: rateLimit.headers,
        }
      );
    }

    // CSRF protection
    const csrfCheck = await csrfProtection(request);
    if (!csrfCheck.success) {
      return NextResponse.json({ message: csrfCheck.error }, { status: 403 });
    }

    const data = await request.json();
    const validatedData = loginSchema.parse(data);

    // TODO: Replace with your actual user authentication logic
    // This is just an example - you should verify against your database
    if (
      validatedData.email !== "admin@example.com" ||
      validatedData.password !== "password123"
    ) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await new SignJWT({
      email: validatedData.email,
      role: "admin", // Add roles as needed
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Set cookie
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return NextResponse.json({
      message: "Login successful",
      user: {
        email: validatedData.email,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
