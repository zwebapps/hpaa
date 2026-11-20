"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/trackEvent";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  /** Short, non-personal label for the CTA, e.g. "spec_sheet". */
  ctaId: string;
  /** Where the CTA sits on the page, e.g. "summary" or "sticky_bar". */
  ctaPlacement: string;
  aircraftSlug: string;
};

/** A next/link that records a CTA click (`select_content`) before navigating. */
export function TrackedLink({ ctaId, ctaPlacement, aircraftSlug, onClick, ...rest }: TrackedLinkProps) {
  return (
    <Link
      {...rest}
      onClick={(event) => {
        trackEvent("select_content", {
          content_type: "cta",
          item_id: ctaId,
          placement: ctaPlacement,
          aircraft: aircraftSlug,
        });
        onClick?.(event);
      }}
    />
  );
}
