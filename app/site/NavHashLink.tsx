"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { navRouteHref, sectionIdFromNavHref } from "@/lib/navRoutes";
import { scrollToHomeSection } from "@/lib/scrollHomeSection";

type NavHashLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  children: React.ReactNode;
};

/** On `/`, scroll to a homepage section without changing the URL. Else route to the standalone page. */
export function NavHashLink({ href, onClick, children, ...rest }: NavHashLinkProps) {
  const pathname = usePathname();
  const sectionId = sectionIdFromNavHref(href);
  const onHome = pathname === "/";

  if (onHome && sectionId) {
    return (
      <a
        {...rest}
        href="/"
        onClick={(event) => {
          event.preventDefault();
          scrollToHomeSection(sectionId);
          onClick?.(event);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link {...rest} href={navRouteHref(href)} onClick={onClick}>
      {children}
    </Link>
  );
}
