import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { saveDomainPurchase } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const apiBase = process.env.API_BASE_URL || "http://localhost:8080";
    const stripeRes = await fetch(`${apiBase}/api/stripe/session/${sessionId}`);
    if (!stripeRes.ok) {
      return NextResponse.json({ error: "Failed to fetch session" }, { status: 502 });
    }
    const stripeData = await stripeRes.json();

    if (stripeData.status !== "paid") {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 402 });
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user
      ? parseInt((session.user as { id?: string }).id ?? "0") || null
      : null;

    await saveDomainPurchase(
      sessionId,
      stripeData.domains ?? [],
      stripeData.customer_email ?? null,
      userId
    );

    return NextResponse.json({
      domains: stripeData.domains,
      customer_email: stripeData.customer_email,
      status: stripeData.status,
    });
  } catch (err: unknown) {
    console.error("Checkout complete error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
