import { dbErrorHint, formatDbError } from "@/lib/dbError";
import { ensureSchema, getPool, hasDatabaseConfig } from "@/lib/postgres";

export type DbHealth = {
  ok: boolean;
  error?: string;
  hint?: string;
};

export async function checkDbHealth(): Promise<DbHealth> {
  if (!hasDatabaseConfig()) {
    return {
      ok: false,
      error: "Database is not configured",
      hint: "Set DATABASE_URL or DB_HOST, DB_USER, DB_PASSWORD, DB_PORT (and optionally DB_NAME) in .env.",
    };
  }

  try {
    await ensureSchema();
    await getPool().query("SELECT 1");
    return { ok: true };
  } catch (error) {
    const message = formatDbError(error);
    return {
      ok: false,
      error: message,
      hint: dbErrorHint(message) ?? "Check your VPS Postgres is running and DB_* credentials in .env are correct.",
    };
  }
}
