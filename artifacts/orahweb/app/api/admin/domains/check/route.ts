import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { TLDS } from "@/lib/domain-store";

// Deterministic availability sim: consistent per domain+tld pair, ~70% available
function isAvailable(name: string, tld: string): boolean {
  let h = 0;
  const s = `${name}.${tld}`;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % 10 >= 3;
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const name = new URL(request.url).searchParams.get("name")?.toLowerCase().trim() ?? "";

  if (!name || !/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(name)) {
    return NextResponse.json({ error: "Invalid domain name" }, { status: 400 });
  }

  const results = TLDS.map((t) => ({
    tld: t.tld,
    domain: `${name}.${t.tld}`,
    available: isAvailable(name, t.tld),
    price: t.price,
    renewalPrice: t.renewalPrice,
    category: t.category,
  }));

  return NextResponse.json({ name, results });
}
