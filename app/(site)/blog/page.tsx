import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";

export const metadata: Metadata = {
  title: "HPAA Blog | Robot-Aircraft",
  description:
    "Technical notes on EASA Part-145 MRO, aircraft modification, avionics integration, HPAA conversion, and civil aircraft platforms in Germany.",
  alternates: {
    canonical: absoluteUrl("/blog"),
    languages: { en: absoluteUrl("/blog"), "en-x-default": absoluteUrl("/blog") },
  },
};

export default function BlogIndexPage() {
  return (
    <main className="section">
      <p className="section-eyebrow">Knowledge Hub</p>
      <h1 className="section-heading">
        HPAA Blog — <em>High Performance Autonomous Aircraft</em>
      </h1>
      <p className="section-lead" style={{ maxWidth: 880 }}>
        Practical overviews and mission-focused explanations for HPAA conversion, robot aircraft, and
        autonomous aircraft platforms.
      </p>

      <div className="why-grid" style={{ marginTop: "2rem" }}>
        <article className="why-card reveal">
          <h2 style={{ marginTop: 0 }}>
            <Link href="/blog/easa-part-145-aircraft-mro-germany" style={{ color: "inherit", textDecoration: "none" }}>
              EASA Part-145 and Aircraft MRO in Germany
            </Link>
          </h2>
          <p>
            What operators should know about EASA Part-145 maintenance organisations and how certified
            MRO supports modification and special mission programmes.
          </p>
        </article>
        <article className="why-card reveal">
          <h2 style={{ marginTop: 0 }}>
            <Link href="/blog/what-is-hpaa" style={{ color: "inherit", textDecoration: "none" }}>
              What is HPAA? High Performance Autonomous Aircraft Explained
            </Link>
          </h2>
          <p>
            A clear definition of HPAA, what it enables, and why civil aircraft conversion can field
            autonomous capability faster than purpose-built programmes.
          </p>
        </article>
      </div>
    </main>
  );
}

