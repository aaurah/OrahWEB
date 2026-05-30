import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      id: (session.user as { id?: string }).id ?? null,
      name: session.user.name,
      email: session.user.email,
      role: (session.user as { role?: string }).role ?? "user",
      avatar: session.user.image ?? null,
    });
  } catch (error) {
    console.error("[User API Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
