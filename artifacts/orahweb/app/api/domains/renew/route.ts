import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDomainByName, renewDomain, initDomainsTable } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = parseInt((session?.user as { id?: string })?.id ?? "0") || null;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { domain } = await req.json();
  if (!domain) return NextResponse.json({ error: "domain required" }, { status: 400 });

  await initDomainsTable();
  const dom = await getDomainByName(domain, userId);
  if (!dom) return NextResponse.json({ error: "Domain not found" }, { status: 404 });
  if (dom.type === "web3") return NextResponse.json({ error: "Web3 domains never expire" }, { status: 400 });

  const result = await renewDomain(dom.id, userId);
  return NextResponse.json({ ok: true, expiresAt: result?.expires_at });
}
