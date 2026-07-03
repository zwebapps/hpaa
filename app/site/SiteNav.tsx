"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteData } from "@/data/siteData";
import { NavHashLink } from "./NavHashLink";
import { SCROLL_SECTION_EVENT } from "./ScrollSpy";

const links = siteData.navigation.links;

export function SiteNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on route change (state adjustment during render)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  const onHome = pathname === "/";
  const onWhyUs = pathname === "/why-us";
  const onApplications = pathname === "/applications";
  const onPartners = pathname === "/partners";
  const onContact = pathname === "/contact";
  const onAircraftList = pathname === "/aircraft";
  const onAircraftDetail = pathname.startsWith("/aircraft/") && pathname !== "/aircraft";

  useEffect(() => {
    if (!onHome) return;

    const onSection = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      if (id) setActiveSection(id);
    };

    window.addEventListener(SCROLL_SECTION_EVENT, onSection as EventListener);
    return () => window.removeEventListener(SCROLL_SECTION_EVENT, onSection as EventListener);
  }, [onHome]);

  const ctaActive = onHome ? activeSection === "contact" : onContact;

  return (
    <nav id="main-nav">
      <Link
        href="/"
        className="nav-brand"
        style={{ textDecoration: "none", color: "inherit" }}
        aria-label="Robot Aircraft — Home"
      >
        <Image
          src="/robot-aircraft-icon.svg"
          alt=""
          width={64}
          height={64}
          className="nav-brand-icon"
          priority
          aria-hidden
        />
        <div className="nav-brand-text">
          <span className="nav-brand-name">Robot</span>
          <span className="nav-brand-sub">Aircraft</span>
        </div>
        <span className="sr-only">{siteData.brand.name}</span>
      </Link>

      <ul className="nav-links">
        {links.map((l) => {
          const sectionId = l.hash.slice(1);
          const active = onHome
            ? activeSection === sectionId
            : (l.hash === "#home" && onHome) ||
              (l.hash === "#why-us" && onWhyUs) ||
              (l.hash === "#applications" && onApplications) ||
              (l.hash === "#partners" && onPartners) ||
              (l.hash === "#aircraft" && (onAircraftList || onAircraftDetail));

          return (
            <li key={l.href}>
              <NavHashLink href={l.href} className={active ? "active" : ""}>
                {l.label}
              </NavHashLink>
            </li>
          );
        })}
      </ul>

      <NavHashLink href={siteData.navigation.cta.href} className={`nav-cta ${ctaActive ? "active" : ""}`}>
        {siteData.navigation.cta.label}
      </NavHashLink>

      <button
        type="button"
        className="nav-menu-toggle"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
      </button>

      <div id="mobile-nav-panel" className={`nav-mobile-panel ${menuOpen ? "open" : ""}`}>
        <ul className="nav-mobile-links">
          {links.map((l) => (
            <li key={l.href}>
              <NavHashLink href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </NavHashLink>
            </li>
          ))}
          <li>
            <NavHashLink href={siteData.navigation.cta.href} onClick={() => setMenuOpen(false)}>
              {siteData.navigation.cta.label}
            </NavHashLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
