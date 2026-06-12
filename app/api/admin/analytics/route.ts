import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getAnalyticsIntegrations } from "@/lib/analyticsIntegrations";
import { getAnalyticsSummary } from "@/lib/analyticsStore";
import { checkDbHealth } from "@/lib/dbHealth";
import { dbErrorPayload } from "@/lib/dbError";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const integrations = getAnalyticsIntegrations();
  const db = await checkDbHealth();

  if (!db.ok) {
    return Response.json({
      ok: false,
      error: db.error ?? "Database unavailable",
      hint: db.hint,
      integrations,
      firstParty: { ok: false },
    }, { status: 503 });
  }

  try {
    const data = await getAnalyticsSummary();
    return Response.json({
      ok: true,
      data,
      integrations,
      firstParty: { ok: true },
    });
  } catch (error) {
    return Response.json({
      ...dbErrorPayload(error),
      integrations,
      firstParty: { ok: false },
    }, { status: 503 });
  }
}
