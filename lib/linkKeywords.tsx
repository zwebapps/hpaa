import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Ordered list — longer/more specific phrases must come first to avoid
 * partial matches (e.g. "autonomous aircraft" before bare "HPAA").
 * Only the FIRST occurrence of each phrase is linked.
 */
const KEYWORD_LINKS: Array<{ phrase: string; href: string }> = [
  { phrase: "robot aircraft",       href: "/robot-aircraft-germany" },
  { phrase: "autonomous aircraft",  href: "/autonomous-aircraft-germany" },
  { phrase: "HPAA",                 href: "/hpaa-germany" },
];

const LINK_STYLE: React.CSSProperties = {
  color: "inherit",
  textDecoration: "none",
};

/**
 * Splits `text` on the first case-insensitive occurrence of `phrase`
 * and returns [before, match, after] or null if not found.
 */
function splitOnFirst(
  text: string,
  phrase: string,
): [string, string, string] | null {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(phrase.toLowerCase());
  if (idx === -1) return null;
  return [
    text.slice(0, idx),
    text.slice(idx, idx + phrase.length),
    text.slice(idx + phrase.length),
  ];
}

/**
 * Returns React nodes with the first occurrence of each registered keyword
 * phrase wrapped in an internal <Link>. All other text is left unchanged.
 */
export function linkKeywords(text: string): ReactNode {
  // Start with the full text as a single string segment
  let segments: Array<string | ReactNode> = [text];

  for (const { phrase, href } of KEYWORD_LINKS) {
    const next: Array<string | ReactNode> = [];
    let linked = false;

    for (const seg of segments) {
      if (linked || typeof seg !== "string") {
        next.push(seg);
        continue;
      }
      const result = splitOnFirst(seg, phrase);
      if (!result) {
        next.push(seg);
        continue;
      }
      const [before, match, after] = result;
      if (before) next.push(before);
      next.push(
        <Link key={`${phrase}`} href={href} style={LINK_STYLE}>
          {match}
        </Link>,
      );
      if (after) next.push(after);
      linked = true;
    }

    segments = next;
  }

  return <>{segments}</>;
}
