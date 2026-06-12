"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function AnalyticsBeacon() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    if (last.current === pathname) return;
    last.current = pathname;

    void fetch("/api/analytics/hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        referrer: typeof document !== "undefined" ? document.referrer : "",
      }),
      keepalive: true,
    });
  }, [pathname]);

  return null;
}
