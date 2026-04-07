import { getSiteContent, saveSiteContent } from "@/lib/siteContentStore";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  try {
    const data = await getSiteContent();
    return Response.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load site content.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  try {
    const body = (await request.json()) as { data?: unknown } | unknown;
    const payload =
      body && typeof body === "object" && "data" in body
        ? (body as { data?: unknown }).data
        : body;

    const data = await saveSiteContent(payload);
    return Response.json({ ok: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save site content.";
    return Response.json({ ok: false, error: message }, { status: 400 });
  }
}
