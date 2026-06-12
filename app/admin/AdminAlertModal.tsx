"use client";

import { useEffect } from "react";

export type AdminAlert = {
  type: "error" | "success";
  title: string;
  message: string;
};

type Props = {
  alert: AdminAlert | null;
  onClose: () => void;
};

export function AdminAlertModal({ alert, onClose }: Props) {
  useEffect(() => {
    if (!alert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [alert, onClose]);

  if (!alert) return null;

  return (
    <div className="admin-alert-backdrop" role="presentation" onClick={onClose}>
      <div
        className={`admin-alert-dialog admin-alert-dialog--${alert.type}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-alert-title"
        aria-describedby="admin-alert-message"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 id="admin-alert-title">{alert.title}</h4>
        <p id="admin-alert-message">{alert.message}</p>
        <button type="button" className="admin-btn admin-btn-primary" autoFocus onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
