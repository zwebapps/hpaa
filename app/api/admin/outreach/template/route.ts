import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  fillOutreachTemplate,
  loadOutreachTemplate,
  outreachSubjectBase,
} from "@/lib/outreachMail";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || "Sample Company";
    const template = await loadOutreachTemplate();
    const html = fillOutreachTemplate(template, name);
    return Response.json({
      ok: true,
      html,
      subject: outreachSubjectBase(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Template load failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
