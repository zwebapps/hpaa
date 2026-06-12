import { NextRequest } from "next/server";
import * as XLSX from "xlsx";
import { requireAdmin } from "@/lib/adminAuth";
import { dbErrorPayload } from "@/lib/dbError";
import { upsertCompaniesFromRows } from "@/lib/outreachStore";

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!file || !(file instanceof Blob)) {
      return Response.json({ ok: false, error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    if (!sheet) {
      return Response.json({ ok: false, error: "Empty spreadsheet" }, { status: 400 });
    }

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: "",
    });

    const result = await upsertCompaniesFromRows(rows, { preserveSent: true });
    return Response.json({ ok: true, ...result });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}
