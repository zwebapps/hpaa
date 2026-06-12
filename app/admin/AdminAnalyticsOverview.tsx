"use client";

import type { AnalyticsIntegrations } from "@/lib/analyticsIntegrations";
import { AdminVisitsChart } from "./AdminVisitsChart";

export type AnalyticsOverviewData = {
  total: number;
  last7Days: number;
  last30Days: number;
  topPages: { path: string; count: number }[];
  dailyByDay: { date: string; count: number }[];
  topSources: { source: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
};

type Props = {
  analytics: AnalyticsOverviewData | null;
  integrations: AnalyticsIntegrations | null;
  outreachPending: number | string;
  analyticsError: string | null;
  analyticsHint: string | null;
  onRetry: () => void;
};

function maxCount(rows: { count: number }[]) {
  return Math.max(1, ...rows.map((r) => r.count));
}

function hasThirdPartyConfigured(integrations: AnalyticsIntegrations | null) {
  if (!integrations) return false;
  return (
    integrations.plausible.enabled ||
    integrations.ga4.enabled ||
    integrations.umami.enabled ||
    Boolean(integrations.plausible.embedUrl) ||
    Boolean(integrations.umami.embedUrl)
  );
}

export function AdminAnalyticsOverview({
  analytics,
  integrations,
  outreachPending,
  analyticsError,
  analyticsHint,
  onRetry,
}: Props) {
  const maxSource = maxCount(analytics?.topSources ?? [{ count: 1 }]);
  const showThirdParty = hasThirdPartyConfigured(integrations);

  const hasEmbed = Boolean(
    integrations?.plausible.embedUrl || integrations?.umami.embedUrl,
  );
  const showExternalLinks =
    !hasEmbed &&
    Boolean(integrations?.ga4.dashboardUrl || integrations?.plausible.domain);

  if (analyticsError) {
    return (
      <div className="admin-panel admin-db-banner">
        <h3>Site traffic (first-party)</h3>
        <p className="admin-db-banner__lead">
          Counts are stored in PostgreSQL on your server. No Plausible or GA4 required.
        </p>
        <p className="admin-db-banner__err">{analyticsError}</p>
        {analyticsHint ? <p className="admin-db-banner__hint">{analyticsHint}</p> : null}
        <ol className="admin-db-steps">
          <li>
            Set <code>DB_HOST</code>, <code>DB_USER</code>, <code>DB_PASSWORD</code>,{" "}
            <code>DB_PORT</code> (and optionally <code>DB_NAME</code>) in <code>.env</code>
          </li>
          <li>Restart <code>npm run dev</code></li>
        </ol>
        <button type="button" className="admin-btn admin-btn-primary" onClick={onRetry}>
          Retry connection
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="admin-panel admin-first-party-header">
        <h3>Site traffic (first-party)</h3>
        <p className="admin-analytics-sub">
          Page views from your site, stored in PostgreSQL. Works without Plausible or Google Analytics.
        </p>
      </div>

      <div className="admin-overview-top-row">
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="label">All-time views</div>
          <div className="value">{analytics?.total ?? 0}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Last 7 days</div>
          <div className="value">{analytics?.last7Days ?? 0}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Last 30 days</div>
          <div className="value">{analytics?.last30Days ?? 0}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Companies pending</div>
          <div className="value">{outreachPending}</div>
        </div>
      </div>

        <div className="admin-panel admin-panel--traffic-sources">
          <h3>Traffic sources (30 days)</h3>
          <p className="admin-analytics-sub">Google, direct, social, etc.</p>
          {(analytics?.topSources?.length ?? 0) === 0 ? (
            <p className="admin-analytics-empty">No referrer data yet.</p>
          ) : (
            <ul className="admin-hbar-list admin-hbar-list--compact">
              {analytics!.topSources.map((s) => (
                <li key={s.source}>
                  <span className="admin-hbar-label">{s.source}</span>
                  <span className="admin-hbar-track">
                    <span
                      className="admin-hbar-fill"
                      style={{ width: `${Math.round((s.count / maxSource) * 100)}%` }}
                    />
                  </span>
                  <span className="admin-hbar-value">{s.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {(analytics?.total ?? 0) === 0 ? (
        <p className="admin-analytics-empty admin-analytics-empty--tip">
          No visits yet. Open the public site in another tab; each page load is recorded automatically.
        </p>
      ) : null}

      <div className="admin-analytics-grid">
        <div className="admin-panel admin-panel--wide">
          <h3>Visits by week</h3>
          <p className="admin-analytics-sub">Switch week or day, chart type, then use arrows below the chart</p>
          <AdminVisitsChart daily={analytics?.dailyByDay ?? []} />
        </div>
      </div>

      <div className="admin-analytics-grid admin-analytics-grid--2">
        <div className="admin-panel">
          <h3>Top pages (30 days)</h3>
          <DataTable
            headers={["Path", "Views"]}
            rows={(analytics?.topPages ?? []).map((p) => [p.path, String(p.count)])}
          />
        </div>

        <div className="admin-panel">
          <h3>Top referrers (30 days)</h3>
          <DataTable
            headers={["Referrer", "Views"]}
            rows={(analytics?.topReferrers ?? []).map((r) => [r.referrer, String(r.count)])}
          />
        </div>
      </div>

      {showThirdParty && integrations ? (
        <details className="admin-panel admin-analytics-integrations">
          <summary>Optional third-party analytics</summary>
          <p className="admin-analytics-hint">
            Plausible, GA4, or Umami can complement first-party counts. Configure via env vars.
          </p>
          <ul className="admin-integration-chips">
            <li className={integrations.plausible.enabled ? "on" : "off"}>
              Plausible {integrations.plausible.enabled ? "· on" : "· off"}
            </li>
            <li className={integrations.ga4.enabled ? "on" : "off"}>
              GA4 {integrations.ga4.enabled ? "· on" : "· off"}
            </li>
            <li className={integrations.umami.enabled ? "on" : "off"}>
              Umami {integrations.umami.enabled ? "· on" : "· off"}
            </li>
          </ul>
          {hasEmbed ? <ExternalEmbeds integrations={integrations} /> : null}
          {showExternalLinks ? <ExternalLinks integrations={integrations} /> : null}
        </details>
      ) : null}
    </>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  if (rows.length === 0) {
    return <p className="admin-analytics-empty">No data yet.</p>;
  }
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row[0]}-${i}`}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExternalEmbeds({ integrations }: { integrations: AnalyticsIntegrations }) {
  return (
    <div className="admin-analytics-embeds">
      {integrations.plausible.embedUrl ? (
        <div className="admin-analytics-embed-wrap">
          <h4>Plausible</h4>
          <iframe
            title="Plausible analytics"
            className="admin-analytics-embed"
            src={integrations.plausible.embedUrl}
            loading="lazy"
          />
        </div>
      ) : null}
      {integrations.umami.embedUrl ? (
        <div className="admin-analytics-embed-wrap">
          <h4>Umami</h4>
          <iframe
            title="Umami analytics"
            className="admin-analytics-embed"
            src={integrations.umami.embedUrl}
            loading="lazy"
          />
        </div>
      ) : null}
    </div>
  );
}

function ExternalLinks({ integrations }: { integrations: AnalyticsIntegrations }) {
  return (
    <div className="admin-analytics-links">
      {integrations.ga4.dashboardUrl ? (
        <a href={integrations.ga4.dashboardUrl} target="_blank" rel="noopener noreferrer">
          Open Google Analytics →
        </a>
      ) : null}
      {integrations.plausible.domain ? (
        <a
          href={`https://plausible.io/${integrations.plausible.domain}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Plausible →
        </a>
      ) : null}
    </div>
  );
}
