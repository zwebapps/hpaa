import { readFile } from "node:fs/promises";
import path from "node:path";
import { ensureSchema, query } from "@/lib/postgres";
import {
  matchesCountryFilter,
  type OutreachSendFilter,
} from "@/lib/outreachFilters";
import {
  normalizeExcelRow,
  slugifyCompanyId,
  type OutreachCompanyRecord,
  validEmail,
} from "@/lib/outreachNormalize";

export type { OutreachSendFilter } from "@/lib/outreachFilters";
export { OUTREACH_NO_COUNTRY } from "@/lib/outreachFilters";

const LEGACY_SEED_LOCK_ID = "legacy_json_seed";

type CompanyRow = OutreachCompanyRecord;

type DbCompanyRow = {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  city: string;
  headquarters: string;
  sent_at: Date | null;
  last_message_id: string | null;
  created_at: Date;
  updated_at: Date;
};

let outreachMaintenancePromise: Promise<void> | null = null;

async function ensureOutreachCollectionReady() {
  await ensureSchema();
  if (!outreachMaintenancePromise) {
    outreachMaintenancePromise = dedupeOutreachCompanies();
  }
  await outreachMaintenancePromise;
}

async function dedupeOutreachCompanies() {
  await query(`
    WITH ranked AS (
      SELECT id,
        ROW_NUMBER() OVER (
          PARTITION BY email
          ORDER BY (sent_at IS NOT NULL) DESC, updated_at DESC
        ) AS rn
      FROM outreach_companies
    )
    DELETE FROM outreach_companies
    WHERE id IN (SELECT id FROM ranked WHERE rn > 1)
  `);
}

function rowToRecord(row: CompanyRow) {
  return {
    id: row.id,
    company_name: row.company_name,
    email: row.email,
    phone: row.phone,
    website: row.website,
    country: row.country,
    city: row.city,
    headquarters: row.headquarters,
    sentAt: row.sentAt ? row.sentAt.toISOString() : null,
    lastMessageId: row.lastMessageId,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function mapDbRow(row: DbCompanyRow): CompanyRow {
  return {
    id: row.id,
    company_name: row.company_name,
    email: row.email,
    phone: row.phone,
    website: row.website,
    country: row.country,
    city: row.city,
    headquarters: row.headquarters,
    sentAt: row.sent_at,
    lastMessageId: row.last_message_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const COMPANY_SELECT = `
  SELECT id, company_name, email, phone, website, country, city, headquarters,
         sent_at, last_message_id, created_at, updated_at
  FROM outreach_companies
`;

export function filterOutreachRecipients(
  docs: CompanyRow[],
  filter?: Pick<OutreachSendFilter, "countries">,
): CompanyRow[] {
  let result = docs.filter((d) => validEmail(d.email));
  if (filter?.countries?.length) {
    result = result.filter((d) => matchesCountryFilter(d.country, filter.countries!));
  }
  return result;
}

export async function listOutreachCompanies() {
  await ensureOutreachCollectionReady();
  let result = await query<DbCompanyRow>(COMPANY_SELECT + ` ORDER BY company_name ASC`);
  if (result.rows.length === 0) {
    await seedFromLegacyJsonIfPresent();
    result = await query<DbCompanyRow>(COMPANY_SELECT + ` ORDER BY company_name ASC`);
  }
  return result.rows.map((row) => rowToRecord(mapDbRow(row)));
}

async function seedFromLegacyJsonIfPresent() {
  const lock = await query<{ id: string }>(
    `INSERT INTO outreach_meta (id, seeded_at) VALUES ($1, $2)
     ON CONFLICT (id) DO NOTHING
     RETURNING id`,
    [LEGACY_SEED_LOCK_ID, new Date()],
  );
  if (lock.rows.length === 0) return;

  const jsonPath = path.join(process.cwd(), "marketing", "data", "older_companies.json");
  try {
    const raw = await readFile(jsonPath, "utf8");
    const rows = JSON.parse(raw) as Record<string, unknown>[];
    if (!Array.isArray(rows) || rows.length === 0) return;
    await upsertCompaniesFromRows(rows, { preserveSent: true });
  } catch {
    /* no legacy file */
  }
}

export async function upsertCompaniesFromRows(
  rows: Record<string, unknown>[],
  options: { preserveSent?: boolean } = {},
) {
  await ensureOutreachCollectionReady();
  const now = new Date();
  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < rows.length; i++) {
    const normalized = normalizeExcelRow(rows[i], i);
    if (!normalized) {
      skipped++;
      continue;
    }

    const emailKey = normalized.email.toLowerCase();
    const existing = await query<DbCompanyRow>(
      COMPANY_SELECT + ` WHERE email = $1 OR id = $2 LIMIT 1`,
      [emailKey, normalized.id],
    );
    const existingRow = existing.rows[0] ? mapDbRow(existing.rows[0]) : null;

    if (existingRow) {
      let sentAt = existingRow.sentAt;
      if (normalized.sentStatus === "yes") {
        sentAt = normalized.sentAt ?? existingRow.sentAt ?? now;
      } else if (normalized.sentStatus === "no") {
        sentAt = null;
      } else if (options.preserveSent && existingRow.sentAt) {
        sentAt = existingRow.sentAt;
      } else {
        sentAt = normalized.sentAt ?? existingRow.sentAt;
      }

      await query(
        `UPDATE outreach_companies SET
           id = $2, company_name = $3, email = $4, phone = $5, website = $6,
           country = $7, city = $8, headquarters = $9, sent_at = $10,
           last_message_id = $11, updated_at = $12
         WHERE id = $1`,
        [
          existingRow.id,
          normalized.id,
          normalized.company_name,
          emailKey,
          normalized.phone,
          normalized.website,
          normalized.country,
          normalized.city,
          normalized.headquarters,
          sentAt,
          existingRow.lastMessageId,
          now,
        ],
      );
      updated++;
    } else {
      await query(
        `INSERT INTO outreach_companies (
           id, company_name, email, phone, website, country, city, headquarters,
           sent_at, last_message_id, created_at, updated_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $11)`,
        [
          normalized.id,
          normalized.company_name,
          emailKey,
          normalized.phone,
          normalized.website,
          normalized.country,
          normalized.city,
          normalized.headquarters,
          normalized.sentAt,
          normalized.lastMessageId,
          now,
        ],
      );
      inserted++;
    }
  }

  return { inserted, updated, skipped, total: rows.length };
}

export type CreateOutreachCompanyInput = {
  company_name: string;
  email: string;
  country?: string;
  city?: string;
  phone?: string;
  website?: string;
};

export async function createOutreachCompany(input: CreateOutreachCompanyInput) {
  await ensureOutreachCollectionReady();
  const company_name = input.company_name.trim();
  const email = input.email.trim().toLowerCase();
  if (!company_name) throw new Error("Company name is required");
  if (!validEmail(email)) throw new Error("A valid email address is required");

  const existingByEmail = await query<DbCompanyRow>(
    COMPANY_SELECT + ` WHERE email = $1 LIMIT 1`,
    [email],
  );
  if (existingByEmail.rows.length > 0) {
    throw new Error("A company with this email already exists");
  }

  let id = slugifyCompanyId(company_name) || `company-${Date.now()}`;
  let suffix = 2;
  while (true) {
    const clash = await query(`SELECT 1 FROM outreach_companies WHERE id = $1 LIMIT 1`, [id]);
    if (clash.rows.length === 0) break;
    id = `${slugifyCompanyId(company_name)}-${suffix}`;
    suffix++;
  }

  const country = String(input.country ?? "").trim();
  const city = String(input.city ?? "").trim();
  const now = new Date();
  await query(
    `INSERT INTO outreach_companies (
       id, company_name, email, phone, website, country, city, headquarters,
       sent_at, last_message_id, created_at, updated_at
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NULL, NULL, $9, $9)`,
    [
      id,
      company_name,
      email,
      String(input.phone ?? "").trim(),
      String(input.website ?? "").trim(),
      country,
      city,
      [city, country].filter(Boolean).join(", "),
      now,
    ],
  );

  const doc: CompanyRow = {
    id,
    company_name,
    email,
    phone: String(input.phone ?? "").trim(),
    website: String(input.website ?? "").trim(),
    country,
    city,
    headquarters: [city, country].filter(Boolean).join(", "),
    sentAt: null,
    lastMessageId: null,
    createdAt: now,
    updatedAt: now,
  };
  return rowToRecord(doc);
}

export async function deleteOutreachCompanies(ids: string[]) {
  await ensureOutreachCollectionReady();
  const uniqueIds = [...new Set(ids.map((id) => id.trim()).filter(Boolean))];
  if (uniqueIds.length === 0) {
    throw new Error("No companies selected to delete");
  }

  const result = await query(
    `DELETE FROM outreach_companies WHERE id = ANY($1::text[])`,
    [uniqueIds],
  );
  return { deleted: result.rowCount ?? 0 };
}

export async function markCompanySent(id: string, messageId: string) {
  const now = new Date();
  await query(
    `UPDATE outreach_companies
     SET sent_at = $2, last_message_id = $3, updated_at = $2
     WHERE id = $1`,
    [id, now, messageId],
  );
}

export async function markCompaniesPending(ids: string[]) {
  await ensureOutreachCollectionReady();
  const uniqueIds = [...new Set(ids.map((id) => id.trim()).filter(Boolean))];
  if (uniqueIds.length === 0) {
    throw new Error("No companies selected");
  }

  const now = new Date();
  const result = await query(
    `UPDATE outreach_companies
     SET sent_at = NULL, last_message_id = NULL, updated_at = $2
     WHERE id = ANY($1::text[])`,
    [uniqueIds, now],
  );
  return { updated: result.rowCount ?? 0 };
}

export async function getPendingOutreachCompanies(filter?: OutreachSendFilter) {
  await ensureOutreachCollectionReady();

  const params: unknown[] = [];
  let where = `sent_at IS NULL`;
  if (filter?.ids?.length) {
    params.push(filter.ids);
    where += ` AND id = ANY($${params.length}::text[])`;
  }

  const result = await query<DbCompanyRow>(
    COMPANY_SELECT + ` WHERE ${where} ORDER BY company_name ASC`,
    params,
  );
  const docs = result.rows.map((row) => mapDbRow(row));

  const countryFilter =
    filter?.countries && filter.countries.length > 0
      ? { countries: filter.countries }
      : undefined;

  return filterOutreachRecipients(docs, countryFilter);
}

export async function getOutreachStats() {
  await ensureOutreachCollectionReady();
  const result = await query<{
    total: string;
    sent: string;
    pending: string;
  }>(`
    SELECT
      COUNT(*)::text AS total,
      COUNT(*) FILTER (WHERE sent_at IS NOT NULL)::text AS sent,
      COUNT(*) FILTER (WHERE sent_at IS NULL)::text AS pending
    FROM outreach_companies
  `);
  const row = result.rows[0];
  return {
    total: Number(row?.total ?? 0),
    sent: Number(row?.sent ?? 0),
    pending: Number(row?.pending ?? 0),
  };
}
