import {
  formatReferrerLabel,
  isLocalDevelopmentReferrer,
  normalizeReferrerForStorage,
  trafficSourceFromReferrer,
} from "@/lib/analyticsSource";
import { ensureSchema, query } from "@/lib/postgres";

export type PageViewDoc = {
  path: string;
  at: Date;
  referrer?: string;
};

export async function recordPageView(path: string, referrer?: string) {
  const normalized = path.split("?")[0] || "/";
  if (
    normalized.startsWith("/admin") ||
    normalized.startsWith("/api") ||
    normalized.includes(".")
  ) {
    return;
  }

  await ensureSchema();
  await query(
    `INSERT INTO page_views (path, at, referrer) VALUES ($1, $2, $3)`,
    [normalized, new Date(), normalizeReferrerForStorage(referrer)],
  );
}

export async function getAnalyticsSummary() {
  await ensureSchema();
  const now = new Date();
  const day7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const day30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const day90 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const [totalRes, last7Res, last30Res, topPagesRes, dailyRes, referrersRes] = await Promise.all([
    query<{ count: string }>(`SELECT COUNT(*)::text AS count FROM page_views`),
    query<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM page_views WHERE at >= $1`,
      [day7],
    ),
    query<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM page_views WHERE at >= $1`,
      [day30],
    ),
    query<{ path: string; count: string }>(
      `SELECT path, COUNT(*)::text AS count
       FROM page_views
       WHERE at >= $1
       GROUP BY path
       ORDER BY COUNT(*) DESC
       LIMIT 12`,
      [day30],
    ),
    query<{ date: string; count: string }>(
      `SELECT to_char(at AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS date, COUNT(*)::text AS count
       FROM page_views
       WHERE at >= $1
       GROUP BY 1
       ORDER BY 1`,
      [day90],
    ),
    query<{ referrer: string | null }>(
      `SELECT referrer FROM page_views WHERE at >= $1 LIMIT 8000`,
      [day30],
    ),
  ]);

  const sourceCounts = new Map<string, number>();
  const referrerCounts = new Map<string, number>();
  for (const row of referrersRes.rows) {
    if (isLocalDevelopmentReferrer(row.referrer)) continue;
    const source = trafficSourceFromReferrer(row.referrer ?? undefined);
    sourceCounts.set(source, (sourceCounts.get(source) ?? 0) + 1);
    const refLabel = formatReferrerLabel(row.referrer ?? undefined);
    referrerCounts.set(refLabel, (referrerCounts.get(refLabel) ?? 0) + 1);
  }

  const topSources = [...sourceCounts.entries()]
    .map(([source, count]) => ({ source, count }))
    .filter(
      ({ source }) =>
        source !== "localhost" &&
        !source.startsWith("localhost/") &&
        source !== "127.0.0.1",
    )
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topReferrers = [...referrerCounts.entries()]
    .map(([referrer, count]) => ({ referrer, count }))
    .filter(
      ({ referrer }) =>
        referrer !== "localhost" &&
        !referrer.startsWith("localhost/") &&
        !referrer.startsWith("127.0.0.1"),
    )
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    total: Number(totalRes.rows[0]?.count ?? 0),
    last7Days: Number(last7Res.rows[0]?.count ?? 0),
    last30Days: Number(last30Res.rows[0]?.count ?? 0),
    topPages: topPagesRes.rows.map((r) => ({ path: r.path, count: Number(r.count) })),
    dailyByDay: dailyRes.rows.map((r) => ({ date: r.date, count: Number(r.count) })),
    topSources,
    topReferrers,
  };
}
