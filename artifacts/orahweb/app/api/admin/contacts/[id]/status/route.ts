import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateSubmissionStatus } from "@/lib/contact-store";

const VALID_STATUSES = ["new", "read", "replied"] as const;
type SubmissionStatus = (typeof VALID_STATUSES)[number];

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const statusValue = formData.get("status");

  if (
    typeof statusValue !== "string" ||
    !(VALID_STATUSES as readonly string[]).includes(statusValue)
  ) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = updateSubmissionStatus(params.id, statusValue as SubmissionStatus);

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const referer = request.headers.get("referer") ?? "/admin/contacts";
  return NextResponse.redirect(referer, { status: 303 });
}
