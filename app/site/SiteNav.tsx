"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteData } from "@/data/siteData";
import { useTheme } from "@/app/theme/ThemeProvider";

const links = siteData.navigation.links;

const HASH_SYNC_EVENT = "hpaa:hash-sync";

function useHash(pathname: string) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(typeof window !== "undefined" ? window.location.hash : "");
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    window.addEventListener(HASH_SYNC_EVENT, sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
      window.removeEventListener(HASH_SYNC_EVENT, sync);
    };
  }, [pathname]);

  return hash;
}

export function SiteNav() {
  const pathname = usePathname();
  const hash = useHash(pathname);
  const { theme, setTheme } = useTheme();

  const onHome =
    pathname === "/" && (!hash || hash === "" || hash === "#" || hash === "#home" || hash === "#approach");
  const onWhyUs = pathname === "/" && hash === "#why-us";
  const onApplications = pathname === "/" && hash === "#applications";
  const onPartners = pathname === "/" && hash === "#partners";
  const onContact = pathname === "/" && hash === "#contact";
  const onAircraftList = pathname === "/" && hash === "#aircraft";
  const onAircraftDetail = pathname.startsWith("/aircraft/") && pathname !== "/aircraft";

  return (
    <nav id="main-nav">
      <Link
        href="/#home"
        scroll={false}
        className="nav-brand"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="nav-brand-mark">
          <span>K</span>
        </div>
        <div className="nav-brand-text">
          <span className="nav-brand-name">{siteData.brand.shortName}</span>
          <span className="nav-brand-sub">{siteData.brand.subName}</span>
        </div>
      </Link>

      <ul className="nav-links">
        {links.map((l) => {
          const active =
            (l.hash === "#home" && onHome) ||
            (l.hash === "#why-us" && onWhyUs) ||
            (l.hash === "#applications" && onApplications) ||
            (l.hash === "#partners" && onPartners) ||
            (l.hash === "#aircraft" && (onAircraftList || onAircraftDetail));

          return (
            <li key={l.href}>
              <Link href={l.href} scroll={false} className={active ? "active" : ""}>
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href={siteData.navigation.cta.href}
        scroll={false}
        className={`nav-cta ${onContact ? "active" : ""}`}
      >
        {siteData.navigation.cta.label}
      </Link>

      <div className="theme-switcher" aria-label="Theme switcher">
        <button
          type="button"
          className={`theme-chip ${theme === "royal" ? "active" : ""}`}
          onClick={() => setTheme("royal")}
          aria-label="Use royal theme"
        >
          Royal
        </button>
        <button
          type="button"
          className={`theme-chip ${theme === "ocean" ? "active" : ""}`}
          onClick={() => setTheme("ocean")}
          aria-label="Use ocean theme"
        >
          Ocean
        </button>
        <button
          type="button"
          className={`theme-chip ${theme === "sunset" ? "active" : ""}`}
          onClick={() => setTheme("sunset")}
          aria-label="Use sunset theme"
        >
          Sunset
        </button>
      </div>
    </nav>
  );
}
