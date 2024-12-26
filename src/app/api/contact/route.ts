import { type NextRequest } from "next/server";

import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(data);

    // TODO: Add your email service integration here
    // Example: Send email using your preferred service
    // await sendEmail(validatedData);

    // For now, just log the data
    console.log("Contact form submission:", validatedData);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to process contact form submission",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
