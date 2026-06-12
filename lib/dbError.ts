export function formatDbError(error: unknown): string {
  if (error instanceof Error) {
    const parts = [error.message];
    const cause = (error as Error & { cause?: unknown }).cause;
    if (cause instanceof Error && cause.message && !error.message.includes(cause.message)) {
      parts.push(cause.message);
    }
    return parts.filter(Boolean).join(": ");
  }
  return "Database error";
}

/** Raw fields from node-pg / Node network errors (errno, code, syscall, address, port, …). */
export function dumpDbError(error: unknown): Record<string, unknown> | undefined {
  if (!(error instanceof Error)) return undefined;

  const dump: Record<string, unknown> = {
    name: error.name,
    message: error.message,
  };

  const extra = error as Error & Record<string, unknown>;
  for (const key of ["code", "errno", "syscall", "address", "port", "severity", "detail", "hint", "where", "schema", "table", "column", "dataType", "constraint"]) {
    if (extra[key] !== undefined) dump[key] = extra[key];
  }

  if (error.stack) dump.stack = error.stack;

  const cause = extra.cause;
  if (cause instanceof Error) {
    dump.cause = dumpDbError(cause);
  }

  return dump;
}

export function dbErrorHint(message: string): string | undefined {
  if (/ETIMEDOUT|ECONNREFUSED|ENOTFOUND|ECONNRESET|EHOSTUNREACH/i.test(message)) {
    return "Cannot reach PostgreSQL. Check DB_HOST, DB_PORT, VPS firewall (UFW), and that Postgres accepts remote connections.";
  }
  if (/password authentication failed/i.test(message)) {
    return "Check DB_USER and DB_PASSWORD in .env.";
  }
  if (/database .* does not exist/i.test(message)) {
    return "Create the database on the server or set DB_NAME correctly.";
  }
  if (/SSL|ssl/i.test(message)) {
    return "Try DB_SSL=true for remote VPS, or DB_SSL=false for localhost.";
  }
  if (/Missing database config/i.test(message)) {
    return "Set DATABASE_URL or DB_HOST, DB_USER, DB_PASSWORD, and DB_PORT in .env.";
  }
  return undefined;
}

export function dbErrorPayload(error: unknown) {
  const errorMessage = formatDbError(error);
  const details = dumpDbError(error);
  return {
    ok: false as const,
    error: errorMessage,
    hint: dbErrorHint(errorMessage),
    ...(details ? { details } : {}),
  };
}

export function dbErrorResponse(error: unknown, status = 500) {
  return Response.json(dbErrorPayload(error), { status });
}
