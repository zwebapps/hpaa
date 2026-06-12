import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbErrorPayload } from "@/lib/dbError";
import { seedSiteContentFromJsonFile } from "@/lib/siteContentStore";

/** POST — copies `data/site-content.json` from disk into PostgreSQL. Site UI still reads from the JSON file. */
export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const data = await seedSiteContentFromJsonFile();
    return Response.json({ ok: true, data, message: "Database seeded from data/site-content.json" });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}
