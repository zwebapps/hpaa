import defaultSiteContent from "@/data/site-content.json";
import { getDb } from "@/lib/mongodb";
import { readFile } from "node:fs/promises";
import path from "node:path";

const COLLECTION = "content";
const SITE_CONTENT_KEY = "site-content";

type SiteContentRecord = {
  key: string;
  data: unknown;
  updatedAt: Date;
  createdAt: Date;
};

function isRecordLike(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/** Runtime site copy still comes from `data/site-content.json` via imports. DB is for API/admin and future use. */
export async function getSiteContent() {
  const db = await getDb();
  const collection = db.collection<SiteContentRecord>(COLLECTION);
  const current = await collection.findOne({ key: SITE_CONTENT_KEY });

  if (current?.data && isRecordLike(current.data)) {
    return current.data;
  }

  const now = new Date();
  await collection.updateOne(
    { key: SITE_CONTENT_KEY },
    {
      $set: { data: defaultSiteContent, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );

  return defaultSiteContent;
}

export async function saveSiteContent(content: unknown) {
  if (!isRecordLike(content)) {
    throw new Error("Site content payload must be a JSON object.");
  }

  const db = await getDb();
  const collection = db.collection<SiteContentRecord>(COLLECTION);
  const now = new Date();

  await collection.updateOne(
    { key: SITE_CONTENT_KEY },
    {
      $set: { data: content, updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );

  return content;
}

/** Load `data/site-content.json` from disk and upsert into MongoDB (sync file → database). */
export async function seedSiteContentFromJsonFile() {
  const filePath = path.join(process.cwd(), "data", "site-content.json");
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  if (!isRecordLike(parsed)) {
    throw new Error("site-content.json must contain a JSON object.");
  }
  return saveSiteContent(parsed);
}
