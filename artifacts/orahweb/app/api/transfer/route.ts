import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { createTransfer, getUserTransfers } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const { domainName, authCode, email, direction } = body;

  if (!domainName || !authCode) {
    return NextResponse.json({ error: "domainName and authCode required" }, { status: 400 });
  }

  const userId = session?.user?.id ? Number(session.user.id) : null;
  const customerEmail = email || session?.user?.email || null;

  const transfer = await createTransfer(userId, domainName, direction || "in", authCode, customerEmail);
  return NextResponse.json({ transfer, ok: true });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const transfers = await getUserTransfers(Number(session.user.id));
  return NextResponse.json({ transfers });
}
