import { dbErrorPayload } from "@/lib/dbError";
import { isLocalDevelopmentHost } from "@/lib/analyticsSource";
import { recordPageView } from "@/lib/analyticsStore";

function requestHost(request: Request): string {
  const raw =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host") ||
    "";
  return raw.split(":")[0];
}

export async function POST(request: Request) {
  try {
    if (isLocalDevelopmentHost(requestHost(request))) {
      return Response.json({ ok: true, skipped: true });
    }

    const body = (await request.json()) as { path?: string; referrer?: string };
    const path = String(body.path || "/");
    await recordPageView(path, body.referrer);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}
