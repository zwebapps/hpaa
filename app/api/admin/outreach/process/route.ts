import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbErrorPayload } from "@/lib/dbError";
import { smtpConfigured } from "@/lib/outreachMail";
import { getOutreachStats } from "@/lib/outreachStore";
import { startOutreachSendWorker } from "@/lib/outreachWorker";

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  if (!smtpConfigured()) {
    return Response.json(
      { ok: false, error: "SMTP is not configured in environment variables." },
      { status: 503 },
    );
  }

  try {
    void startOutreachSendWorker();
    const stats = await getOutreachStats();
    return Response.json({ ok: true, stats });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}
