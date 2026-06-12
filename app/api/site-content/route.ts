import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbErrorPayload, formatDbError } from "@/lib/dbError";
import { getSiteContent, saveSiteContent } from "@/lib/siteContentStore";

export async function GET() {
  try {
    const data = await getSiteContent();
    return Response.json({ ok: true, data });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}

export async function PUT(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = (await request.json()) as { data?: unknown } | unknown;
    const payload =
      body && typeof body === "object" && "data" in body
        ? (body as { data?: unknown }).data
        : body;

    const data = await saveSiteContent(payload);
    return Response.json({ ok: true, data });
  } catch (error) {
    const message = formatDbError(error);
    if (message.includes("must be a JSON object")) {
      return Response.json({ ok: false, error: message }, { status: 400 });
    }
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}
