import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDomainByName, getCryptoRecords, addCryptoRecord, deleteCryptoRecord, setIpfsHash, initDomainsTable } from "@/lib/db";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = parseInt((session?.user as { id?: string })?.id ?? "0") || null;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const domain = req.nextUrl.searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "domain required" }, { status: 400 });

  await initDomainsTable();
  const dom = await getDomainByName(domain, userId);
  if (!dom) return NextResponse.json({ error: "Domain not found" }, { status: 404 });

  const records = await getCryptoRecords(dom.id);
  return NextResponse.json({ records, ipfsHash: dom.ipfs_hash ?? null });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = parseInt((session?.user as { id?: string })?.id ?? "0") || null;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { domain, coin, network, address, ipfsHash } = body;
  if (!domain) return NextResponse.json({ error: "domain required" }, { status: 400 });

  await initDomainsTable();
  const dom = await getDomainByName(domain, userId);
  if (!dom) return NextResponse.json({ error: "Domain not found" }, { status: 404 });

  if (ipfsHash !== undefined) {
    await setIpfsHash(dom.id, ipfsHash);
    return NextResponse.json({ ok: true });
  }

  if (!coin || !address) return NextResponse.json({ error: "coin and address required" }, { status: 400 });
  const record = await addCryptoRecord(dom.id, coin, network || "mainnet", address);
  return NextResponse.json({ record });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = parseInt((session?.user as { id?: string })?.id ?? "0") || null;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const domain = req.nextUrl.searchParams.get("domain");
  const id = req.nextUrl.searchParams.get("id");
  if (!domain || !id) return NextResponse.json({ error: "domain and id required" }, { status: 400 });

  await initDomainsTable();
  const dom = await getDomainByName(domain, userId);
  if (!dom) return NextResponse.json({ error: "Domain not found" }, { status: 404 });

  await deleteCryptoRecord(Number(id), dom.id);
  return NextResponse.json({ ok: true });
}
