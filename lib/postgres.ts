import { Pool, type PoolConfig, type QueryResultRow } from "pg";

const DEFAULT_DB_NAME = "hpaa";

declare global {
  // eslint-disable-next-line no-var
  var __hpaaPgPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __hpaaPgSchemaPromise: Promise<void> | undefined;
}

function shouldUseSsl(): false | { rejectUnauthorized: boolean } {
  const ssl = process.env.DB_SSL?.trim().toLowerCase();
  if (ssl === "false" || ssl === "0") return false;
  if (ssl === "true" || ssl === "1") return { rejectUnauthorized: false };

  const host = (process.env.DB_HOST || "").trim();
  if (host === "localhost" || host === "127.0.0.1") return false;
  return { rejectUnauthorized: false };
}

export function getDatabaseName() {
  return process.env.DB_NAME?.trim() || DEFAULT_DB_NAME;
}

export function hasDatabaseConfig(): boolean {
  if (process.env.DATABASE_URL?.trim()) return true;
  return Boolean(
    process.env.DB_HOST?.trim() &&
      process.env.DB_USER?.trim() &&
      process.env.DB_PASSWORD !== undefined &&
      process.env.DB_PORT?.trim(),
  );
}

function getPoolConfig(): PoolConfig {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl) {
    return {
      connectionString: databaseUrl,
      max: 10,
      ssl: shouldUseSsl(),
    };
  }

  const host = process.env.DB_HOST?.trim();
  const user = process.env.DB_USER?.trim();
  const password = process.env.DB_PASSWORD;
  const port = process.env.DB_PORT?.trim();

  if (!host || !user || password === undefined || !port) {
    throw new Error(
      "Missing database config: set DATABASE_URL or DB_HOST, DB_USER, DB_PASSWORD, and DB_PORT.",
    );
  }

  return {
    host,
    user,
    password,
    port: Number(port),
    database: getDatabaseName(),
    max: 10,
    ssl: shouldUseSsl(),
  };
}

export function getPool(): Pool {
  if (!globalThis.__hpaaPgPool) {
    globalThis.__hpaaPgPool = new Pool(getPoolConfig());
  }
  return globalThis.__hpaaPgPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return getPool().query<T>(text, params);
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS content (
  key         TEXT PRIMARY KEY,
  data        JSONB NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_views (
  id        BIGSERIAL PRIMARY KEY,
  path      TEXT NOT NULL,
  at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  referrer  TEXT
);

CREATE INDEX IF NOT EXISTS page_views_at_idx ON page_views (at);
CREATE INDEX IF NOT EXISTS page_views_path_at_idx ON page_views (path, at);

CREATE TABLE IF NOT EXISTS outreach_companies (
  id               TEXT PRIMARY KEY,
  company_name     TEXT NOT NULL,
  email            TEXT NOT NULL UNIQUE,
  phone            TEXT NOT NULL DEFAULT '',
  website          TEXT NOT NULL DEFAULT '',
  country          TEXT NOT NULL DEFAULT '',
  city             TEXT NOT NULL DEFAULT '',
  headquarters     TEXT NOT NULL DEFAULT '',
  sent_at          TIMESTAMPTZ,
  last_message_id  TEXT,
  send_status      TEXT NOT NULL DEFAULT 'pending',
  send_error       TEXT,
  sending_at       TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE outreach_companies ADD COLUMN IF NOT EXISTS send_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE outreach_companies ADD COLUMN IF NOT EXISTS send_error TEXT;
ALTER TABLE outreach_companies ADD COLUMN IF NOT EXISTS sending_at TIMESTAMPTZ;

UPDATE outreach_companies
SET send_status = 'sent'
WHERE sent_at IS NOT NULL AND send_status = 'pending';

CREATE INDEX IF NOT EXISTS outreach_companies_company_name_idx
  ON outreach_companies (company_name);

CREATE TABLE IF NOT EXISTS outreach_meta (
  id         TEXT PRIMARY KEY,
  seeded_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

export async function ensureSchema() {
  if (!globalThis.__hpaaPgSchemaPromise) {
    globalThis.__hpaaPgSchemaPromise = getPool().query(SCHEMA_SQL).then(() => undefined);
  }
  await globalThis.__hpaaPgSchemaPromise;
}
