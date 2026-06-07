import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserById, updateUser } from "@/lib/user-store";
import { z } from "zod";

const patchSchema = z.object({
  role: z.enum(["admin", "user"]).optional(),
  banned: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (params.id === session.user.id) {
    return NextResponse.json({ error: "Cannot modify your own account" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const target = getUserById(params.id);
  if (!target) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updated = updateUser(params.id, parsed.data);
  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user: updated });
}
