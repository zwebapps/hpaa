"use client";

import { useEffect } from "react";

export type AdminConfirm = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: "primary" | "gold" | "danger";
};

type Props = {
  confirm: AdminConfirm | null;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AdminConfirmModal({ confirm, busy = false, onConfirm, onCancel }: Props) {
  useEffect(() => {
    if (!confirm) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirm, busy, onCancel]);

  if (!confirm) return null;

  const confirmClass =
    confirm.variant === "danger"
      ? "admin-btn admin-btn-danger"
      : confirm.variant === "gold"
        ? "admin-btn admin-btn-gold"
        : "admin-btn admin-btn-primary";

  return (
    <div className="admin-alert-backdrop" role="presentation" onClick={busy ? undefined : onCancel}>
      <div
        className="admin-alert-dialog admin-confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        aria-describedby="admin-confirm-message"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 id="admin-confirm-title">{confirm.title}</h4>
        <p id="admin-confirm-message">{confirm.message}</p>
        <div className="admin-confirm-actions">
          <button
            type="button"
            className="admin-btn admin-btn-outline"
            disabled={busy}
            onClick={onCancel}
          >
            {confirm.cancelLabel ?? "Cancel"}
          </button>
          <button
            type="button"
            className={confirmClass}
            disabled={busy}
            autoFocus
            onClick={onConfirm}
          >
            {busy ? "Please wait…" : confirm.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
