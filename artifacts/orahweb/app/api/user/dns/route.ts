import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDomainByName, getDnsRecords, addDnsRecord, deleteDnsRecord } from "@/lib/db";

async function getUserId(session: Session | null) {
  return parseInt((session?.user as { id?: string })?.id ?? "0") || null;
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const domainName = searchParams.get("domain");
  if (!domainName) return NextResponse.json({ error: "Missing domain" }, { status: 400 });

  const domain = await getDomainByName(domainName, userId);
  if (!domain) return NextResponse.json({ error: "Domain not found" }, { status: 404 });

  const records = await getDnsRecords(domain.id);
  return NextResponse.json({ domain, records });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { domainName, recordType, name, value, ttl } = await req.json();
  const domain = await getDomainByName(domainName, userId);
  if (!domain) return NextResponse.json({ error: "Domain not found" }, { status: 404 });

  const record = await addDnsRecord(domain.id, recordType, name, value, ttl ?? 3600);
  return NextResponse.json({ record }, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const domainName = searchParams.get("domain");
  const recordId = parseInt(searchParams.get("recordId") ?? "0");
  if (!domainName || !recordId) return NextResponse.json({ error: "Missing params" }, { status: 400 });

  const domain = await getDomainByName(domainName, userId);
  if (!domain) return NextResponse.json({ error: "Domain not found" }, { status: 404 });

  await deleteDnsRecord(recordId, domain.id);
  return NextResponse.json({ success: true });
}
