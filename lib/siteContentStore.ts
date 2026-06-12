import defaultSiteContent from "@/data/site-content.json";
import { ensureSchema, query } from "@/lib/postgres";
import { readFile } from "node:fs/promises";
import path from "node:path";

const SITE_CONTENT_KEY = "site-content";

type SiteContentRow = {
  data: unknown;
};

function isRecordLike(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/** Runtime site copy still comes from `data/site-content.json` via imports. DB is for API/admin and future use. */
export async function getSiteContent() {
  await ensureSchema();
  const result = await query<SiteContentRow>(
    `SELECT data FROM content WHERE key = $1`,
    [SITE_CONTENT_KEY],
  );
  const current = result.rows[0];

  if (current?.data && isRecordLike(current.data)) {
    return current.data;
  }

  const now = new Date();
  await query(
    `INSERT INTO content (key, data, created_at, updated_at)
     VALUES ($1, $2::jsonb, $3, $3)
     ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = EXCLUDED.updated_at`,
    [SITE_CONTENT_KEY, JSON.stringify(defaultSiteContent), now],
  );

  return defaultSiteContent;
}

export async function saveSiteContent(content: unknown) {
  if (!isRecordLike(content)) {
    throw new Error("Site content payload must be a JSON object.");
  }

  await ensureSchema();
  const now = new Date();
  await query(
    `INSERT INTO content (key, data, created_at, updated_at)
     VALUES ($1, $2::jsonb, $3, $3)
     ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = EXCLUDED.updated_at`,
    [SITE_CONTENT_KEY, JSON.stringify(content), now],
  );

  return content;
}

/** Load `data/site-content.json` from disk and upsert into PostgreSQL (sync file → database). */
export async function seedSiteContentFromJsonFile() {
  const filePath = path.join(process.cwd(), "data", "site-content.json");
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  if (!isRecordLike(parsed)) {
    throw new Error("site-content.json must contain a JSON object.");
  }
  return saveSiteContent(parsed);
}
