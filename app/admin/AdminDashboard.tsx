"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AnalyticsIntegrations } from "@/lib/analyticsIntegrations";
import {
  AdminAnalyticsOverview,
  type AnalyticsOverviewData,
} from "./AdminAnalyticsOverview";
import { AdminAlertModal, type AdminAlert } from "./AdminAlertModal";
import { AdminConfirmModal, type AdminConfirm } from "./AdminConfirmModal";
import {
  AdminOutreachCompanies,
  type OutreachSendMeta,
  type OutreachSendPayload,
} from "./AdminOutreachCompanies";

function outreachSendResultCopy(sent: number, failed: number, apiMessage?: string): Pick<AdminAlert, "title" | "message"> {
  if (sent === 0 && apiMessage) {
    return { title: "Outreach send complete", message: apiMessage };
  }

  const recipientWord = sent === 1 ? "recipient" : "recipients";
  if (failed === 0) {
    return {
      title: "Outreach send complete",
      message: `Your outreach email was delivered successfully to ${sent} ${recipientWord}.`,
    };
  }

  const failedWord = failed === 1 ? "delivery attempt" : "delivery attempts";
  return {
    title: "Outreach send finished",
    message: `Successfully sent to ${sent} ${recipientWord}. ${failed} ${failedWord} did not complete.`,
  };
}

function outreachSendConfirmCopy(meta: OutreachSendMeta): Pick<AdminConfirm, "title" | "message" | "confirmLabel"> {
  const { count, mode } = meta;
  const companyWord = count === 1 ? "company" : "companies";

  if (mode === "selected") {
    return {
      title: "Confirm outreach send",
      message: `You are about to send the outreach email to ${count} selected ${companyWord}. Only recipients with a pending status will be included. Messages are delivered through your configured SMTP server.`,
      confirmLabel: "Confirm and send",
    };
  }

  if (mode === "filtered") {
    return {
      title: "Confirm outreach send",
      message: `You are about to send the outreach email to ${count} pending ${companyWord} matching your current country filter. Messages are delivered through your configured SMTP server.`,
      confirmLabel: "Confirm and send",
    };
  }

  return {
    title: "Confirm outreach send",
    message: `You are about to send the outreach email to all ${count} pending ${companyWord} in your list. Messages are delivered through your configured SMTP server.`,
    confirmLabel: "Confirm and send",
  };
}
import { validEmail } from "@/lib/outreachNormalize";

type Tab = "overview" | "outreach" | "content";

type Company = {
  id: string;
  company_name: string;
  email: string;
  sentAt: string | null;
  country: string;
};

type OutreachStats = { total: number; sent: number; pending: number };

type DbErrorState = { error: string; hint?: string; details?: Record<string, unknown> };

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [analytics, setAnalytics] = useState<AnalyticsOverviewData | null>(null);
  const [integrations, setIntegrations] = useState<AnalyticsIntegrations | null>(null);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [analyticsHint, setAnalyticsHint] = useState<string | null>(null);
  const [dbError, setDbError] = useState<DbErrorState | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState<OutreachStats | null>(null);
  const [templateHtml, setTemplateHtml] = useState("");
  const [previewName, setPreviewName] = useState("Sample Company");
  const [rawJson, setRawJson] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [newCompany, setNewCompany] = useState({
    company_name: "",
    email: "",
    country: "",
  });
  const [addCompanyFormKey, setAddCompanyFormKey] = useState(0);
  const [alert, setAlert] = useState<AdminAlert | null>(null);
  const [confirm, setConfirm] = useState<AdminConfirm | null>(null);
  const [confirmBusy, setConfirmBusy] = useState(false);
  const confirmActionRef = useRef<(() => Promise<void>) | null>(null);
  const [companyFormNotice, setCompanyFormNotice] = useState<string | null>(null);

  const showMsg = (type: "ok" | "err", text: string) => setMessage({ type, text });

  const showAlert = (type: AdminAlert["type"], title: string, message: string) => {
    setAlert({ type, title, message });
  };

  const reportDbFailure = (
    res: Response,
    payload: { error?: string; hint?: string; details?: Record<string, unknown> },
    fallback: string,
  ) => {
    setDbError((prev) =>
      prev ?? {
        error: payload.error || `${fallback} (HTTP ${res.status})`,
        hint: payload.hint,
        details: payload.details,
      },
    );
  };

  const loadAnalytics = useCallback(async () => {
    const res = await fetch("/api/admin/analytics", { cache: "no-store" });
    const payload = (await res.json()) as {
      ok: boolean;
      data?: AnalyticsOverviewData;
      integrations?: AnalyticsIntegrations;
      error?: string;
      hint?: string;
    };
    setIntegrations(payload.integrations ?? null);
    if (!res.ok || !payload.ok) {
      setAnalytics(null);
      const errorText = payload.error || "Analytics failed";
      setAnalyticsError(errorText);
      setAnalyticsHint(payload.hint ?? null);
      reportDbFailure(res, payload, "Analytics failed");
      return;
    }
    setDbError(null);
    setAnalyticsError(null);
    setAnalyticsHint(null);
    setAnalytics({
      ...payload.data!,
      topSources: payload.data!.topSources ?? [],
      topReferrers: payload.data!.topReferrers ?? [],
      dailyByDay: payload.data!.dailyByDay ?? [],
    });
  }, []);

  const loadOutreach = useCallback(async () => {
    const compRes = await fetch("/api/admin/outreach/companies", { cache: "no-store" });
    const compPayload = (await compRes.json()) as {
      ok: boolean;
      companies?: Company[];
      stats?: OutreachStats;
      error?: string;
      hint?: string;
    };
    if (!compRes.ok || !compPayload.ok) {
      reportDbFailure(compRes, compPayload, "Failed to load companies");
      throw new Error(compPayload.error || `Failed to load companies (HTTP ${compRes.status})`);
    }
    setDbError(null);
    setCompanies(compPayload.companies || []);
    setStats(compPayload.stats || null);
  }, []);

  const loadTemplate = useCallback(async (name: string) => {
    const tplRes = await fetch(
      `/api/admin/outreach/template?name=${encodeURIComponent(name)}`,
      { cache: "no-store" },
    );
    const tplPayload = (await tplRes.json()) as { ok: boolean; html?: string };
    if (tplRes.ok && tplPayload.ok && tplPayload.html) {
      setTemplateHtml(tplPayload.html);
    }
  }, []);

  const loadContent = useCallback(async () => {
    const res = await fetch("/api/site-content", { cache: "no-store" });
    const payload = (await res.json()) as {
      ok: boolean;
      data?: unknown;
      error?: string;
      hint?: string;
    };
    if (!res.ok || !payload.ok) {
      reportDbFailure(res, payload, "Failed to load content");
      throw new Error(payload.error || `Failed to load content (HTTP ${res.status})`);
    }
    setDbError(null);
    setRawJson(JSON.stringify(payload.data, null, 2));
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        await Promise.all([loadOutreach(), loadContent()]);
        await loadTemplate("Sample Company");
      } catch (e) {
        showMsg("err", e instanceof Error ? e.message : "Load failed");
      }
      await loadAnalytics();
    })();
  }, [loadAnalytics, loadOutreach, loadContent, loadTemplate]);

  useEffect(() => {
    if (tab !== "outreach") return;
    void loadTemplate(previewName);
  }, [previewName, tab, loadTemplate]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const downloadExcel = async (url: string, fallbackName: string) => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as {
          error?: string;
          hint?: string;
        } | null;
        if (payload?.error) {
          setDbError({ error: payload.error, hint: payload.hint });
        }
        throw new Error(payload?.error || `Download failed (HTTP ${res.status})`);
      }
      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") ?? "";
      const match = /filename="([^"]+)"/.exec(disposition);
      const filename = match?.[1] ?? fallbackName;
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(objectUrl);
    } catch (e) {
      showMsg("err", e instanceof Error ? e.message : "Download failed");
    } finally {
      setBusy(false);
    }
  };

  const onBulkUpdate = async (file: File) => {
    setBusy(true);
    setMessage(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/outreach/upload", { method: "POST", body: form });
      const payload = (await res.json()) as {
        ok: boolean;
        inserted?: number;
        updated?: number;
        skipped?: number;
        error?: string;
        hint?: string;
      };
      if (!res.ok || !payload.ok) {
        reportDbFailure(res, payload, "Bulk update failed");
        throw new Error(payload.error || `Bulk update failed (HTTP ${res.status})`);
      }
      setDbError(null);
      showMsg(
        "ok",
        `Bulk update complete: ${payload.inserted} new, ${payload.updated} updated, ${payload.skipped} skipped.`,
      );
      await loadOutreach();
    } catch (e) {
      showMsg("err", e instanceof Error ? e.message : "Bulk update failed");
    } finally {
      setBusy(false);
    }
  };

  const validateNewCompany = () => {
    const company_name = newCompany.company_name.trim();
    const email = newCompany.email.trim();
    if (!company_name) return "Company name is required.";
    if (!email) return "Email is required.";
    if (!validEmail(email)) return "Enter a valid email address.";
    return null;
  };

  const addCompany = async (e: FormEvent) => {
    e.preventDefault();
    setCompanyFormNotice(null);

    const validationError = validateNewCompany();
    if (validationError) {
      showAlert("error", "Cannot add company", validationError);
      return;
    }

    const name = newCompany.company_name.trim();
    const payloadBody = {
      company_name: name,
      email: newCompany.email.trim(),
      country: newCompany.country.trim(),
    };

    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/outreach/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });
      const payload = (await res.json()) as {
        ok: boolean;
        error?: string;
        stats?: OutreachStats;
      };
      if (!res.ok || !payload.ok) {
        throw new Error(payload.error || "Could not add company");
      }
      setNewCompany({ company_name: "", email: "", country: "" });
      setAddCompanyFormKey((k) => k + 1);
      setCompanyFormNotice(`Added ${name} as pending. Fields cleared — add another or filter below.`);
      await loadOutreach();
    } catch (err) {
      const text = err instanceof Error ? err.message : "Could not add company";
      showAlert("error", "Cannot add company", text);
    } finally {
      setBusy(false);
    }
  };

  const deleteCompanies = (ids: string[]) => {
    const count = ids.length;
    confirmActionRef.current = () => executeDeleteCompanies(ids);
    setConfirm({
      title: count === 1 ? "Delete company?" : `Delete ${count} companies?`,
      message: `This will permanently remove ${count === 1 ? "the selected company" : `${count} selected companies`} from outreach. This cannot be undone.`,
      confirmLabel: count === 1 ? "Delete company" : `Delete ${count} companies`,
      variant: "danger",
    });
  };

  const executeDeleteCompanies = async (ids: string[]) => {
    setConfirmBusy(true);
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/outreach/companies", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const payload = (await res.json()) as {
        ok: boolean;
        deleted?: number;
        error?: string;
      };
      if (!res.ok || !payload.ok) throw new Error(payload.error || "Delete failed");
      confirmActionRef.current = null;
      setConfirm(null);
      showMsg("ok", `Deleted ${payload.deleted ?? 0} ${payload.deleted === 1 ? "company" : "companies"}.`);
      await loadOutreach();
    } catch (e) {
      const text = e instanceof Error ? e.message : "Delete failed";
      confirmActionRef.current = null;
      setConfirm(null);
      showAlert("error", "Delete failed", text);
    } finally {
      setConfirmBusy(false);
      setBusy(false);
    }
  };

  const markPendingCompanies = (ids: string[]) => {
    const count = ids.length;
    confirmActionRef.current = () => executeMarkPendingCompanies(ids);
    setConfirm({
      title: count === 1 ? "Mark as pending?" : `Mark ${count} as pending?`,
      message:
        count === 1
          ? "This company will be marked as pending and eligible to receive outreach email again."
          : `These ${count} companies will be marked as pending and eligible to receive outreach email again.`,
      confirmLabel: count === 1 ? "Mark as pending" : `Mark ${count} as pending`,
      variant: "primary",
    });
  };

  const executeMarkPendingCompanies = async (ids: string[]) => {
    setConfirmBusy(true);
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/outreach/companies", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark_pending", ids }),
      });
      const payload = (await res.json()) as {
        ok: boolean;
        updated?: number;
        error?: string;
      };
      if (!res.ok || !payload.ok) throw new Error(payload.error || "Update failed");
      confirmActionRef.current = null;
      setConfirm(null);
      const updated = payload.updated ?? 0;
      showAlert(
        "success",
        "Status updated",
        updated === 1
          ? "1 company marked as pending."
          : `${updated} companies marked as pending.`,
      );
      await loadOutreach();
    } catch (e) {
      const text = e instanceof Error ? e.message : "Update failed";
      confirmActionRef.current = null;
      setConfirm(null);
      showAlert("error", "Could not update status", text);
    } finally {
      setConfirmBusy(false);
      setBusy(false);
    }
  };

  const sendOutreach = (payload: OutreachSendPayload, meta: OutreachSendMeta) => {
    confirmActionRef.current = () => executeSendOutreach(payload);
    setConfirm({
      ...outreachSendConfirmCopy(meta),
      variant: "gold",
    });
  };

  const executeSendOutreach = async (payload: OutreachSendPayload) => {
    setConfirmBusy(true);
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json()) as {
        ok: boolean;
        sent?: number;
        failed?: number;
        error?: string;
        message?: string;
      };
      if (!res.ok || !body.ok) throw new Error(body.error || "Send failed");
      confirmActionRef.current = null;
      setConfirm(null);
      const sent = body.sent ?? 0;
      const failed = body.failed ?? 0;
      const result = outreachSendResultCopy(sent, failed, body.message);
      showAlert("success", result.title, result.message);
      await loadOutreach();
    } catch (e) {
      const text = e instanceof Error ? e.message : "Send failed";
      confirmActionRef.current = null;
      setConfirm(null);
      showAlert("error", "Send failed", text);
    } finally {
      setConfirmBusy(false);
      setBusy(false);
    }
  };

  const sendTest = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: true }),
      });
      const payload = (await res.json()) as { ok: boolean; to?: string; error?: string };
      if (!res.ok || !payload.ok) throw new Error(payload.error || "Test send failed");
      showMsg("ok", `Test email sent to ${payload.to}.`);
    } catch (e) {
      showMsg("err", e instanceof Error ? e.message : "Test send failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-shell" data-theme="royal">
      <AdminAlertModal alert={alert} onClose={() => setAlert(null)} />
      <AdminConfirmModal
        confirm={confirm}
        busy={confirmBusy}
        onConfirm={() => {
          const action = confirmActionRef.current;
          if (action) void action();
        }}
        onCancel={() => {
          if (!confirmBusy) {
            confirmActionRef.current = null;
            setConfirm(null);
          }
        }}
      />
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div className="admin-brand">
            <h1>HPAA Admin</h1>
            <p>Operations</p>
          </div>
          <nav className="admin-nav" aria-label="Admin sections">
              <button
                type="button"
                className={tab === "overview" ? "active" : ""}
                onClick={() => setTab("overview")}
              >
                <span className="admin-nav-long">Overview &amp; analytics</span>
                <span className="admin-nav-short">Overview</span>
              </button>
              <button
                type="button"
                className={tab === "outreach" ? "active" : ""}
                onClick={() => setTab("outreach")}
              >
                <span className="admin-nav-long">Outreach &amp; email</span>
                <span className="admin-nav-short">Outreach</span>
              </button>
              <button
                type="button"
                className={tab === "content" ? "active" : ""}
                onClick={() => setTab("content")}
              >
                <span className="admin-nav-long">Site content</span>
                <span className="admin-nav-short">Content</span>
              </button>
          </nav>
          <div className="admin-topbar-actions">
            <button
              type="button"
              className="admin-signout"
              onClick={() => void logout()}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <header className="admin-header">
          <h2>
            {tab === "overview" && (
              <>
                Analytics <em>overview</em>
              </>
            )}
            {tab === "outreach" && "Outreach campaigns"}
            {tab === "content" && "Site content"}
          </h2>
          <button
            type="button"
            className="admin-btn admin-btn-outline admin-header-signout"
            onClick={() => void logout()}
          >
            Sign out
          </button>
        </header>

        {dbError ? (
          <div className="admin-panel admin-db-banner" role="alert">
            <h3>Database connection error</h3>
            <p className="admin-db-banner__err">{dbError.error}</p>
            {dbError.hint ? <p className="admin-db-banner__hint">{dbError.hint}</p> : null}
            {dbError.details ? (
              <pre className="admin-db-banner__dump">
                {JSON.stringify(dbError.details, null, 2)}
              </pre>
            ) : null}
          </div>
        ) : null}

        {message ? <p className={`admin-msg ${message.type}`}>{message.text}</p> : null}

        {tab === "overview" && (
          <AdminAnalyticsOverview
            analytics={analytics}
            integrations={integrations}
            outreachPending={stats?.pending ?? "—"}
            analyticsError={analyticsError}
            analyticsHint={analyticsHint}
            onRetry={() => void loadAnalytics()}
          />
        )}


        {tab === "outreach" && (
          <>
            <div className="admin-stats">
              <div className="admin-stat-card">
                <div className="label">Total companies</div>
                <div className="value">{stats?.total ?? 0}</div>
              </div>
              <div className="admin-stat-card">
                <div className="label">Sent</div>
                <div className="value">{stats?.sent ?? 0}</div>
              </div>
              <div className="admin-stat-card">
                <div className="label">Pending</div>
                <div className="value">{stats?.pending ?? 0}</div>
              </div>
            </div>

            <div className="admin-panel">
              <h3>Bulk update from Excel</h3>
              <p className="admin-bulk-update-lead">
                Download the sample template or export your current list, edit in Excel, then
                upload to add or update companies in bulk. Rows match by <code>email</code> or{" "}
                <code>id</code>.
              </p>
              <div className="admin-actions admin-bulk-update-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  disabled={busy}
                  onClick={() =>
                    void downloadExcel(
                      "/api/admin/outreach/sample",
                      "outreach-companies-sample.xlsx",
                    )
                  }
                >
                  Download sample Excel
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  disabled={busy}
                  onClick={() =>
                    void downloadExcel("/api/admin/outreach/export", "outreach-companies.xlsx")
                  }
                >
                  Export current companies
                </button>
                <label className="admin-btn admin-btn-primary admin-btn--file">
                  Upload bulk update
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    hidden
                    disabled={busy}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) void onBulkUpdate(f);
                      e.target.value = "";
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  disabled={busy}
                  onClick={() => void sendTest()}
                >
                  Send test email
                </button>
              </div>
              <ul className="admin-bulk-update-columns">
                <li>
                  <strong>Required:</strong> <code>company_name</code>, <code>email</code>
                </li>
                <li>
                  <strong>Optional:</strong> <code>id</code>, <code>phone</code>,{" "}
                  <code>website</code>, <code>country</code>, <code>city</code>,{" "}
                  <code>headquarters</code>, <code>sent</code> (<code>yes</code> / <code>no</code>)
                </li>
                <li>
                  Existing outreach status is kept unless you set <code>sent</code> in the file.
                </li>
              </ul>
            </div>

            <div className="admin-panel">
              <h3>Email template preview</h3>
              <div className="admin-actions" style={{ marginBottom: "0.75rem" }}>
                <label style={{ fontSize: "0.85rem", color: "#2d4059" }}>
                  Salutation name:{" "}
                  <input
                    value={previewName}
                    onChange={(e) => setPreviewName(e.target.value)}
                    style={{ padding: "0.35rem 0.5rem", marginLeft: "0.35rem" }}
                  />
                </label>
              </div>
              <iframe
                className="admin-template-frame"
                title="Outreach template preview"
                srcDoc={templateHtml}
                sandbox=""
              />
            </div>

            <div className="admin-panel">
              <h3>Companies</h3>
              <p className="admin-company-form-hint">
                Add companies manually below — the form <strong>clears after each save</strong>. They
                appear <strong>highlighted</strong> in the list until sent. Filter by country, select
                specific rows, then use <strong>Send email</strong> in the Send outreach section. Only{" "}
                <strong>pending</strong> companies receive mail.
              </p>
              {companyFormNotice ? (
                <p className="admin-form-notice ok" role="status">
                  {companyFormNotice}
                </p>
              ) : null}
              <form
                key={addCompanyFormKey}
                className="admin-company-form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => void addCompany(e)}
              >
                <label>
                  Company name
                  <input
                    type="text"
                    name="company_name"
                    required
                    autoComplete="off"
                    disabled={busy}
                    value={newCompany.company_name}
                    onChange={(e) =>
                      setNewCompany((s) => ({ ...s, company_name: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="off"
                    disabled={busy}
                    value={newCompany.email}
                    onChange={(e) => setNewCompany((s) => ({ ...s, email: e.target.value }))}
                  />
                </label>
                <label>
                  Country <span style={{ textTransform: "none", fontWeight: 400 }}>(optional)</span>
                  <input
                    type="text"
                    name="country"
                    autoComplete="off"
                    disabled={busy}
                    value={newCompany.country}
                    onChange={(e) => setNewCompany((s) => ({ ...s, country: e.target.value }))}
                  />
                </label>
                <div className="admin-company-form-actions admin-actions">
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={busy}>
                    Add company (pending)
                  </button>
                </div>
              </form>
              <AdminOutreachCompanies
                companies={companies}
                busy={busy}
                onSend={(payload, label) => void sendOutreach(payload, label)}
                onDelete={(ids) => void deleteCompanies(ids)}
                onMarkPending={(ids) => void markPendingCompanies(ids)}
              />
            </div>
          </>
        )}

        {tab === "content" && (
          <div className="admin-panel">
            <h3>Site content (read only)</h3>
            <p className="admin-content-readonly-hint">
              View-only copy of site content from the database. Edit{" "}
              <code>data/site-content.json</code> in the repo and deploy — changes are not made
              here.
            </p>
            <textarea
              className="admin-textarea admin-textarea--readonly"
              value={rawJson}
              readOnly
              aria-readonly="true"
              spellCheck={false}
              tabIndex={-1}
            />
          </div>
        )}
      </main>
    </div>
  );
}
