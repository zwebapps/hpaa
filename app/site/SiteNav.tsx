"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteData } from "@/data/siteData";
import { useTheme } from "@/app/theme/ThemeProvider";

const links = siteData.navigation.links;

const HASH_SYNC_EVENT = "hpaa:hash-sync";
const SECTION_FOCUS_EVENT = "hpaa:section-focus";

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

  const handleSectionLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/" || !href.startsWith("/#")) return;
    const id = href.slice(2);
    if (!id) return;

    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `/#${id}`);
    window.dispatchEvent(new Event(HASH_SYNC_EVENT));
    window.dispatchEvent(new CustomEvent(SECTION_FOCUS_EVENT, { detail: { id } }));
  };

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
        onClick={(e) => handleSectionLinkClick(e, "/#home")}
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
              <Link
                href={l.href}
                scroll={false}
                className={active ? "active" : ""}
                onClick={(e) => handleSectionLinkClick(e, l.href)}
              >
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
        onClick={(e) => handleSectionLinkClick(e, siteData.navigation.cta.href)}
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
        <button
          type="button"
          className={`theme-chip ${theme === "ember" ? "active" : ""}`}
          onClick={() => setTheme("ember")}
          aria-label="Use ember theme"
        >
          Ember
        </button>
      </div>
    </nav>
  );
}
