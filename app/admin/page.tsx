"use client";

import { useEffect, useMemo, useState } from "react";

type LoadState = "idle" | "loading" | "saving" | "seeding";

export default function AdminPage() {
  const [rawJson, setRawJson] = useState("");
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setState("loading");
      setError(null);
      setSuccess(null);

      try {
        const response = await fetch("/api/site-content", { cache: "no-store" });
        const payload = (await response.json()) as { ok: boolean; data?: unknown; error?: string };
        if (!response.ok || !payload.ok) {
          throw new Error(payload.error || "Failed to load content.");
        }
        if (cancelled) return;
        setRawJson(JSON.stringify(payload.data, null, 2));
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unable to load content.");
      } finally {
        if (!cancelled) setState("idle");
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const seedFromFile = async () => {
    setError(null);
    setSuccess(null);
    setState("seeding");
    try {
      const response = await fetch("/api/site-content/seed", { method: "POST" });
      const payload = (await response.json()) as { ok: boolean; data?: unknown; error?: string; message?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Seed failed.");
      }
      if (payload.data) {
        setRawJson(JSON.stringify(payload.data, null, 2));
      }
      setSuccess(payload.message || "Database updated from data/site-content.json.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Seed failed.");
    } finally {
      setState("idle");
    }
  };

  const save = async () => {
    setError(null);
    setSuccess(null);
    setState("saving");

    try {
      const parsed = JSON.parse(rawJson) as unknown;
      const response = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed }),
      });

      const payload = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Failed to save content.");
      }

      setSuccess("Saved to MongoDB. The live site still uses data/site-content.json until you copy this JSON into that file or switch the app to read from the API.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save content.");
    } finally {
      setState("idle");
    }
  };

  const busy = state !== "idle";
  const buttonLabel = useMemo(() => {
    if (state === "loading") return "Loading...";
    if (state === "saving") return "Saving...";
    if (state === "seeding") return "Seeding...";
    return "Save to database";
  }, [state]);

  return (
    <main style={{ marginTop: 72, padding: "2rem 5vw 4rem" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--navy)" }}>Content Admin</h1>
      <p style={{ color: "var(--slate)", marginBottom: "0.75rem", maxWidth: "52rem" }}>
        The public site reads from <code style={{ fontSize: "0.85em" }}>data/site-content.json</code> only. Use
        &quot;Seed DB from file&quot; to copy that file into MongoDB, or edit below and save to update the database
        for APIs and future DB-backed mode.
      </p>

      <textarea
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        spellCheck={false}
        style={{
          width: "100%",
          minHeight: "65vh",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: "0.84rem",
          lineHeight: 1.5,
          padding: "1rem",
          border: "1px solid var(--border)",
          background: "var(--warm-white)",
          color: "var(--navy)",
          resize: "vertical",
        }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center", marginTop: "1rem" }}>
        <button
          type="button"
          disabled={busy}
          onClick={seedFromFile}
          style={{
            border: "1px solid var(--border)",
            padding: "0.7rem 1.2rem",
            background: "var(--warm-white)",
            color: "var(--navy)",
            cursor: busy ? "not-allowed" : "pointer",
            opacity: busy ? 0.7 : 1,
          }}
        >
          {state === "seeding" ? "Seeding..." : "Seed DB from file"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={save}
          style={{
            border: "none",
            padding: "0.7rem 1.2rem",
            background: "var(--navy)",
            color: "var(--cream)",
            cursor: busy ? "not-allowed" : "pointer",
            opacity: busy ? 0.7 : 1,
          }}
        >
          {buttonLabel}
        </button>
        {success ? <span style={{ color: "#0c7a43" }}>{success}</span> : null}
        {error ? <span style={{ color: "#b00020" }}>{error}</span> : null}
      </div>
    </main>
  );
}
