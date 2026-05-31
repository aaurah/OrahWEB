import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addOrder, getOrders, TLDS } from "@/lib/domain-store";
import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(1).max(63).regex(/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/),
  tld: z.string().min(1).max(20),
  years: z.number().int().min(1).max(10),
});

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json({ orders: getOrders() });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, tld, years } = parsed.data;
  const tldInfo = TLDS.find((t) => t.tld === tld);
  if (!tldInfo) {
    return NextResponse.json({ error: "Unknown TLD" }, { status: 400 });
  }

  const order = addOrder({
    domain: name,
    tld,
    pricePerYear: tldInfo.price,
    years,
    total: parseFloat((tldInfo.price * years).toFixed(2)),
  });

  return NextResponse.json({ order }, { status: 201 });
}
