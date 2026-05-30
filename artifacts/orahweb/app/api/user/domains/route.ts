import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserDomains } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = parseInt((session.user as { id?: string }).id ?? "0");
  if (!userId) {
    return NextResponse.json({ domains: [] });
  }
  const domains = await getUserDomains(userId);
  return NextResponse.json({ domains });
}
