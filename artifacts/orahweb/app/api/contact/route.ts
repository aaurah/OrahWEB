import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addSubmission } from "@/lib/contact-store";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const submission = addSubmission(parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! We'll get back to you within 24 hours.",
        data: { id: submission.id, name: submission.name, email: submission.email, subject: submission.subject },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
