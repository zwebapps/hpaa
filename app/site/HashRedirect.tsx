"use client";

import { useEffect } from "react";

export function HashRedirect({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    window.location.replace(`/#${sectionId}`);
  }, [sectionId]);

  return (
    <main style={{ marginTop: 72, padding: "4rem 5vw", minHeight: "40vh" }}>
      <p style={{ color: "var(--slate)" }}>Loading…</p>
    </main>
  );
}
