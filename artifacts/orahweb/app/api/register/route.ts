import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { registeredUsers } from "@/lib/users";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    const normalised = email.toLowerCase().trim();

    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === normalised
    );
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: String(Date.now()),
      name: name.trim(),
      email: normalised,
      passwordHash,
      role: "user" as const,
    };

    registeredUsers.push(newUser);

    return NextResponse.json(
      { success: true, message: "Account created successfully." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
