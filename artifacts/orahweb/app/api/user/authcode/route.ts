import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDomainByName, getOrCreateAuthCode, regenerateAuthCode, initDomainsTable } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = parseInt((session?.user as { id?: string })?.id ?? "0") || null;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const domain = req.nextUrl.searchParams.get("domain");
  const regen = req.nextUrl.searchParams.get("regen") === "1";
  if (!domain) return NextResponse.json({ error: "domain required" }, { status: 400 });

  await initDomainsTable();
  const dom = await getDomainByName(domain, userId);
  if (!dom) return NextResponse.json({ error: "Domain not found" }, { status: 404 });

  const code = regen
    ? await regenerateAuthCode(dom.id)
    : await getOrCreateAuthCode(dom.id);

  return NextResponse.json({ authCode: code, domain: dom.domain_name });
}
