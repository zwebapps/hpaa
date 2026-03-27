"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#home", hash: "#home", label: "Home" },
  { href: "/#why-us", hash: "#why-us", label: "Why Us" },
  { href: "/#aircraft", hash: "#aircraft", label: "Aircraft" },
  { href: "/#applications", hash: "#applications", label: "Applications" },
  { href: "/#partners", hash: "#partners", label: "Partners" },
] as const;

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
          <span className="nav-brand-name">KUM Services</span>
          <span className="nav-brand-sub">Aviation GmbH</span>
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

      <Link href="/#contact" scroll={false} className={`nav-cta ${onContact ? "active" : ""}`}>
        Enquire Now
      </Link>
    </nav>
  );
}
