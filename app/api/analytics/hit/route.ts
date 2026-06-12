import { dbErrorPayload } from "@/lib/dbError";
import { recordPageView } from "@/lib/analyticsStore";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { path?: string; referrer?: string };
    const path = String(body.path || "/");
    await recordPageView(path, body.referrer);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}
