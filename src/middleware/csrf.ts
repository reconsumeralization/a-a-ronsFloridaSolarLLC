import { Tokens } from "csrf";

const tokens = new Tokens();

export function generateCsrfToken(): string {
  const secret = process.env.CSRF_SECRET || "your-secret-key";
  return tokens.create(secret);
}

export function validateCsrfToken(token: string): boolean {
  const secret = process.env.CSRF_SECRET || "your-secret-key";
  return tokens.verify(secret, token);
}

export async function csrfProtection(request: Request) {
  const token = request.headers.get("X-CSRF-Token");

  if (!token || !validateCsrfToken(token)) {
    return {
      success: false,
      error: "Invalid CSRF token",
    };
  }

  return { success: true };
}
