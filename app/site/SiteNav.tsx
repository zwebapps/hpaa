"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteData } from "@/data/siteData";
import { useTheme } from "@/app/theme/ThemeProvider";
import { navRouteHref } from "@/lib/navRoutes";

const links = siteData.navigation.links;

export function SiteNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const onHome = pathname === "/";
  const onWhyUs = pathname === "/why-us";
  const onApplications = pathname === "/applications";
  const onPartners = pathname === "/partners";
  const onContact = pathname === "/contact";
  const onAircraftList = pathname === "/aircraft";
  const onAircraftDetail = pathname.startsWith("/aircraft/") && pathname !== "/aircraft";

  const ctaHref = navRouteHref(siteData.navigation.cta.href);

  return (
    <nav id="main-nav">
      <Link
        href="/"
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
          const href = navRouteHref(l.href);
          const active =
            (l.hash === "#home" && onHome) ||
            (l.hash === "#why-us" && onWhyUs) ||
            (l.hash === "#applications" && onApplications) ||
            (l.hash === "#partners" && onPartners) ||
            (l.hash === "#aircraft" && (onAircraftList || onAircraftDetail));

          return (
            <li key={l.href}>
              <Link href={href} className={active ? "active" : ""}>
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link href={ctaHref} className={`nav-cta ${onContact ? "active" : ""}`}>
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
