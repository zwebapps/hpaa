import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  OUTREACH_EXCEL_SAMPLE_ROWS,
  buildOutreachWorkbook,
  workbookToBuffer,
} from "@/lib/outreachExcel";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const wb = buildOutreachWorkbook(OUTREACH_EXCEL_SAMPLE_ROWS, "Sample");
  const buffer = workbookToBuffer(wb);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="outreach-companies-sample.xlsx"',
      "Cache-Control": "no-store",
    },
  });
}
