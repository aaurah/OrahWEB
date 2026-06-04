import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { domains } = await req.json();
    if (!Array.isArray(domains) || domains.length === 0) {
      return NextResponse.json({ registered: [] });
    }

    const result = await pool.query(
      `SELECT domain_name FROM orahweb_domains
       WHERE domain_name = ANY($1) AND status = 'active'`,
      [domains]
    );

    const registered = result.rows.map((r: { domain_name: string }) => r.domain_name);
    return NextResponse.json({ registered });
  } catch {
    return NextResponse.json({ registered: [] });
  }
}
