"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { OUTREACH_NO_COUNTRY, normalizeCountryKey } from "@/lib/outreachFilters";

export type OutreachCompanyRow = {
  id: string;
  company_name: string;
  email: string;
  sentAt: string | null;
  country: string;
};

export type OutreachSendPayload = {
  ids?: string[];
  countries?: string[];
};

export type OutreachSendMeta = {
  count: number;
  mode: "selected" | "filtered" | "all";
};

type StatusFilter = "all" | "pending" | "sent";

type Props = {
  companies: OutreachCompanyRow[];
  busy: boolean;
  onSend: (payload: OutreachSendPayload, meta: OutreachSendMeta) => void;
  onDelete: (ids: string[]) => void;
};

type CountryOption = {
  key: string;
  label: string;
  pendingCount: number;
  totalCount: number;
};

const PAGE_SIZE = 100;

function countryLabel(key: string): string {
  return key === OUTREACH_NO_COUNTRY ? "(No country)" : key;
}

type PaginationBarProps = {
  page: number;
  totalPages: number;
  busy: boolean;
  onPageChange: (page: number) => void;
};

function PaginationBar({ page, totalPages, busy, onPageChange }: PaginationBarProps) {
  return (
    <nav className="admin-pagination" aria-label="Company list pages">
      <button
        type="button"
        className="admin-btn admin-btn-outline admin-pagination-btn"
        disabled={busy || page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      <span className="admin-pagination-status">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        className="admin-btn admin-btn-outline admin-pagination-btn"
        disabled={busy || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}

export function AdminOutreachCompanies({ companies, busy, onSend, onDelete }: Props) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [countryKeys, setCountryKeys] = useState<Set<string> | null>(null);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const countryMenuRef = useRef<HTMLDivElement>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [companies]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, countryKeys]);

  useEffect(() => {
    if (!countryMenuOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (countryMenuRef.current && !countryMenuRef.current.contains(e.target as Node)) {
        setCountryMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCountryMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [countryMenuOpen]);

  const countryOptions = useMemo((): CountryOption[] => {
    const map = new Map<string, { pending: number; total: number; display: string }>();
    for (const c of companies) {
      const key = normalizeCountryKey(c.country);
      const display =
        c.country?.trim() ||
        (key === OUTREACH_NO_COUNTRY ? countryLabel(OUTREACH_NO_COUNTRY) : "");
      const row = map.get(key) ?? {
        pending: 0,
        total: 0,
        display: display || countryLabel(key),
      };
      row.total++;
      if (!c.sentAt) row.pending++;
      map.set(key, row);
    }
    return [...map.entries()]
      .map(([key, v]) => ({
        key,
        label: v.display,
        pendingCount: v.pending,
        totalCount: v.total,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      if (statusFilter === "pending" && c.sentAt) return false;
      if (statusFilter === "sent" && !c.sentAt) return false;
      if (countryKeys && countryKeys.size > 0) {
        const key = normalizeCountryKey(c.country);
        if (!countryKeys.has(key)) return false;
      }
      return true;
    });
  }, [companies, statusFilter, countryKeys]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStartIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedCompanies = filteredCompanies.slice(pageStartIndex, pageStartIndex + PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pendingInFilter = useMemo(
    () => filteredCompanies.filter((c) => !c.sentAt),
    [filteredCompanies],
  );

  const pendingOnPage = useMemo(
    () => paginatedCompanies.filter((c) => !c.sentAt),
    [paginatedCompanies],
  );

  const selectedPending = useMemo(
    () => pendingInFilter.filter((c) => selectedIds.has(c.id)),
    [pendingInFilter, selectedIds],
  );

  const sendPayload = useMemo((): OutreachSendPayload => {
    if (selectedPending.length > 0) {
      return { ids: selectedPending.map((c) => c.id) };
    }
    if (countryKeys && countryKeys.size > 0) {
      return { countries: [...countryKeys] };
    }
    return {};
  }, [selectedPending, countryKeys]);

  const sendCount =
    selectedPending.length > 0
      ? selectedPending.length
      : countryKeys && countryKeys.size > 0
        ? companies.filter((c) => !c.sentAt && countryKeys.has(normalizeCountryKey(c.country)))
            .length
        : companies.filter((c) => !c.sentAt).length;

  const sendLabel =
    selectedPending.length > 0
      ? `selected (${selectedPending.length})`
      : countryKeys && countryKeys.size > 0
        ? `filtered pending (${sendCount})`
        : `all pending (${sendCount})`;

  const countryTriggerLabel = useMemo(() => {
    if (!countryKeys || countryKeys.size === 0) return "All countries";
    const labels = countryOptions
      .filter((opt) => countryKeys.has(opt.key))
      .map((opt) => opt.label);
    if (labels.length <= 2) return labels.join(", ");
    return `${labels.slice(0, 2).join(", ")} +${labels.length - 2}`;
  }, [countryKeys, countryOptions]);

  const toggleCountryKey = (key: string) => {
    setCountryKeys((prev) => {
      const next = new Set(prev ?? []);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next.size > 0 ? next : null;
    });
    setSelectedIds(new Set());
  };

  const clearCountryFilter = () => {
    setCountryKeys(null);
    setSelectedIds(new Set());
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllPendingOnPage = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      for (const company of pendingOnPage) next.add(company.id);
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  return (
    <div className="admin-outreach">
      <section className="admin-outreach-section" aria-labelledby="outreach-filter-heading">
        <h4 id="outreach-filter-heading" className="admin-outreach-heading">
          Filter companies
        </h4>
        <p className="admin-outreach-lead">
          Narrow the list by status and country. Select one or more countries from the
          dropdown; pending counts are shown beside each option.
        </p>
        <div className="admin-outreach-filters">
          <label className="admin-filter-field">
            <span>Status</span>
            <select
              value={statusFilter}
              disabled={busy}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              <option value="all">All companies</option>
              <option value="pending">Pending only</option>
              <option value="sent">Sent only</option>
            </select>
          </label>
          <div className="admin-filter-field admin-filter-field--countries">
            <span id="outreach-country-filter-label">Countries</span>
            <div className="admin-country-multiselect" ref={countryMenuRef}>
              <button
                type="button"
                id="outreach-country-filter"
                className="admin-country-multiselect-trigger"
                disabled={busy}
                aria-labelledby="outreach-country-filter-label"
                aria-expanded={countryMenuOpen}
                aria-haspopup="listbox"
                onClick={() => setCountryMenuOpen((open) => !open)}
              >
                <span className="admin-country-multiselect-trigger-label">
                  {countryTriggerLabel}
                </span>
                <span className="admin-country-multiselect-chevron" aria-hidden="true">
                  ▾
                </span>
              </button>
              {countryMenuOpen ? (
                <div
                  className="admin-country-multiselect-menu"
                  role="listbox"
                  aria-multiselectable="true"
                  aria-labelledby="outreach-country-filter-label"
                >
                  <div className="admin-country-multiselect-menu-head">
                    <span className="admin-country-multiselect-menu-title">Select countries</span>
                    <button
                      type="button"
                      className="admin-country-multiselect-clear"
                      disabled={busy || !countryKeys || countryKeys.size === 0}
                      onClick={clearCountryFilter}
                    >
                      Clear
                    </button>
                  </div>
                  <ul className="admin-country-multiselect-list">
                    {countryOptions.map((opt) => {
                      const checked = countryKeys?.has(opt.key) ?? false;
                      return (
                        <li key={opt.key}>
                          <label className="admin-country-multiselect-option">
                            <input
                              type="checkbox"
                              disabled={busy}
                              checked={checked}
                              onChange={() => toggleCountryKey(opt.key)}
                            />
                            <span className="admin-country-multiselect-label">{opt.label}</span>
                            <span className="admin-country-multiselect-count">
                              {opt.pendingCount} pending
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section
        className="admin-outreach-section admin-outreach-send-panel"
        aria-labelledby="outreach-send-heading"
      >
        <h4 id="outreach-send-heading" className="admin-outreach-heading">
          Send outreach
        </h4>
        <p className="admin-outreach-send-target">
          Ready to email: <strong>{sendCount}</strong> pending
          {selectedPending.length > 0
            ? " (from your selection)"
            : countryKeys && countryKeys.size > 0
              ? " (matching country filter)"
              : " (all pending)"}
        </p>
        <ol className="admin-outreach-send-rules">
          <li>If you tick rows, only those companies are emailed.</li>
          <li>Otherwise, the selected country filters apply.</li>
          <li>With no selection and no country filter, all pending companies are emailed.</li>
        </ol>
        <div className="admin-outreach-selection-bar">
          <p className="admin-outreach-selection-summary">
            <span className="admin-outreach-stat">
              <span className="admin-outreach-stat-value">{filteredCompanies.length}</span>
              <span className="admin-outreach-stat-label">shown</span>
            </span>
            <span className="admin-outreach-stat-sep">/</span>
            <span className="admin-outreach-stat">
              <span className="admin-outreach-stat-value">{companies.length}</span>
              <span className="admin-outreach-stat-label">total</span>
            </span>
            {selectedIds.size > 0 ? (
              <>
                <span className="admin-outreach-stat-sep">·</span>
                <span className="admin-outreach-stat admin-outreach-stat--highlight">
                  <span className="admin-outreach-stat-value">{selectedIds.size}</span>
                  <span className="admin-outreach-stat-label">selected</span>
                </span>
              </>
            ) : null}
          </p>
          <div className="admin-actions admin-outreach-actions">
            <button
              type="button"
              className="admin-btn admin-btn-outline"
              disabled={busy || pendingOnPage.length === 0}
              onClick={selectAllPendingOnPage}
            >
              Select all on page
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              disabled={busy || selectedIds.size === 0}
              onClick={() => onDelete([...selectedIds])}
            >
              Delete selected ({selectedIds.size})
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-outline"
              disabled={busy || selectedIds.size === 0}
              onClick={clearSelection}
            >
              Clear selection
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-gold admin-outreach-send-btn"
              disabled={busy || sendCount === 0}
              onClick={() =>
                onSend(sendPayload, {
                  count: sendCount,
                  mode:
                    selectedPending.length > 0
                      ? "selected"
                      : countryKeys && countryKeys.size > 0
                        ? "filtered"
                        : "all",
                })
              }
            >
              Send email — {sendLabel}
            </button>
          </div>
        </div>
      </section>

      <section className="admin-outreach-section" aria-labelledby="outreach-list-heading">
        <h4 id="outreach-list-heading" className="admin-outreach-heading">
          Company list
        </h4>
        <div className="admin-outreach-table-block">
          <div className="admin-table-wrap admin-table-wrap--outreach">
            <table className="admin-table admin-table--selectable admin-table--outreach">
              <thead>
                <tr>
                  <th className="admin-table-check-col">
                    <span className="sr-only">Select</span>
                  </th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="admin-table-empty">
                      No companies match these filters.
                    </td>
                  </tr>
                ) : (
                  paginatedCompanies.map((c) => {
                    const checked = selectedIds.has(c.id);
                    return (
                      <tr
                        key={`${c.id}-${c.email}`}
                        className={
                          c.sentAt ? "admin-table-row-sent" : "admin-table-row-pending"
                        }
                      >
                        <td className="admin-table-check-col">
                          <input
                            type="checkbox"
                            disabled={busy}
                            checked={checked}
                            aria-label={`Select ${c.company_name}`}
                            onChange={() => toggleRow(c.id)}
                          />
                        </td>
                        <td className="admin-table-company">{c.company_name}</td>
                        <td className="admin-table-email">{c.email}</td>
                        <td className="admin-table-country">{c.country?.trim() || "—"}</td>
                        <td>
                          {c.sentAt ? (
                            <span className="admin-badge admin-badge-sent">Sent</span>
                          ) : (
                            <span className="admin-badge admin-badge-pending">Pending</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="admin-table-pagination-cell">
                    <PaginationBar
                      page={safePage}
                      totalPages={totalPages}
                      busy={busy}
                      onPageChange={setPage}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
