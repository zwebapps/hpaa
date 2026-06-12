import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbErrorPayload, formatDbError } from "@/lib/dbError";
import {
  createOutreachCompany,
  deleteOutreachCompanies,
  getOutreachStats,
  listOutreachCompanies,
} from "@/lib/outreachStore";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const [companies, stats] = await Promise.all([
      listOutreachCompanies(),
      getOutreachStats(),
    ]);
    return Response.json({ ok: true, companies, stats });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}

export async function DELETE(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = (await request.json()) as { ids?: unknown };
    const ids = Array.isArray(body.ids)
      ? body.ids.map((id) => String(id).trim()).filter(Boolean)
      : [];
    if (ids.length === 0) {
      return Response.json({ ok: false, error: "No companies selected to delete" }, { status: 400 });
    }

    const { deleted } = await deleteOutreachCompanies(ids);
    const stats = await getOutreachStats();
    return Response.json({ ok: true, deleted, stats });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const company = await createOutreachCompany({
      company_name: String(body.company_name ?? ""),
      email: String(body.email ?? ""),
      country: String(body.country ?? ""),
      city: String(body.city ?? ""),
      phone: String(body.phone ?? ""),
      website: String(body.website ?? ""),
    });
    const stats = await getOutreachStats();
    return Response.json({ ok: true, company, stats });
  } catch (error) {
    const message = formatDbError(error);
    const status =
      message.includes("already exists") || message.includes("required") || message.includes("valid")
        ? 400
        : 503;
    return Response.json(dbErrorPayload(error), { status });
  }
}
