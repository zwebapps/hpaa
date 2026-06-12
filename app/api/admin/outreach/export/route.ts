import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  buildOutreachWorkbook,
  companyToExcelRow,
  workbookToBuffer,
} from "@/lib/outreachExcel";
import { dbErrorPayload } from "@/lib/dbError";
import { listOutreachCompanies } from "@/lib/outreachStore";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const companies = await listOutreachCompanies();
    const rows = companies.map(companyToExcelRow);
    const wb = buildOutreachWorkbook(rows, "Companies");
    const buffer = workbookToBuffer(wb);
    const date = new Date().toISOString().slice(0, 10);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="outreach-companies-${date}.xlsx"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}
