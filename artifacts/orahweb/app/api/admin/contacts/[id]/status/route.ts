import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateSubmissionStatus } from "@/lib/contact-store";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;

  if (!session || role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const status = formData.get("status") as string;

  if (!["new", "read", "replied"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = updateSubmissionStatus(
    params.id,
    status as "new" | "read" | "replied"
  );

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const referer = request.headers.get("referer") ?? "/admin/contacts";
  return NextResponse.redirect(referer, { status: 303 });
}
