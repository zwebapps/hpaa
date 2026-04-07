import { seedSiteContentFromJsonFile } from "@/lib/siteContentStore";
import { requireAdmin } from "@/lib/adminAuth";

/** POST — copies `data/site-content.json` from disk into MongoDB. Site UI still reads from the JSON file. */
export async function POST(request: Request) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  try {
    const data = await seedSiteContentFromJsonFile();
    return Response.json({ ok: true, data, message: "Database seeded from data/site-content.json" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Seed failed.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
