import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/high-performance-combat-drones-germany";
const OG_IMAGE = "/theme/hpaa3.png";

export const metadata: Metadata = {
  title: "High-Performance Combat Drones Germany | HPAA Strike Platforms — KUM Services GmbH",
  description:
    "High-performance combat drones Germany: KUM Services GmbH, Konstanz converts proven civil aircraft into high-performance combat drone platforms for strike, ISR, and special missions. EASA Part-145 certified. Faster and lower cost than purpose-built combat UAS.",
  keywords: [
    "high-performance combat drones Germany",
    "combat drones Germany",
    "combat drone Germany",
    "high performance combat drone Germany",
    "strike drone Germany",
    "combat UAV Germany",
    "UCAV Germany",
    "unmanned combat aerial vehicle Germany",
    "armed drone Germany",
    "combat aircraft conversion Germany",
    "strike UAV Germany",
    "KUM Services GmbH",
    "HPAA Germany",
  ],
  alternates: {
    canonical: absoluteUrl(CANONICAL),
    languages: {
      en: absoluteUrl(CANONICAL),
      "en-x-default": absoluteUrl(CANONICAL),
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl(CANONICAL),
    title: "High-Performance Combat Drones Germany | KUM Services GmbH Konstanz",
    description:
      "KUM Services GmbH, Konstanz — high-performance combat drone specialist. Civil aircraft converted to combat-capable autonomous platforms for defence and government customers.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "High-Performance Combat Drones Germany — KUM Services GmbH Konstanz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Performance Combat Drones Germany | KUM Services GmbH",
    description: "Civil aircraft to high-performance combat drone conversion, Konstanz Germany.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export default function HighPerformanceCombatDronesGermanyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "High-Performance Combat Drones Germany — KUM Services GmbH Konstanz",
        description:
          "KUM Services GmbH converts proven civil aircraft into high-performance combat drone platforms for strike, ISR, and special missions in Germany and worldwide.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "high-performance combat drones Germany, combat drone Germany, UCAV Germany, strike UAV Germany, armed drone Germany",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "High-Performance Combat Drones Germany", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What are high-performance combat drones in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "High-performance combat drones in Germany are civil-registered aircraft converted to combat-capable autonomous platforms by KUM Services GmbH, Konstanz. These platforms are configured for precision strike, ISR, loitering munitions, counter-UAS, and attritable attack missions. The HPAA (High Performance Autonomous Aircraft) conversion approach delivers combat drone capability significantly faster and at lower cost than purpose-built UCAV programmes.",
            },
          },
          {
            "@type": "Question",
            name: "How do German combat drones compare to purpose-built UCAV?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "HPAA combat drones from KUM Services GmbH offer decisive advantages over purpose-built UCAV systems: faster fielding (on-site conversion vs years of development), lower cost (civil market airframe vs bespoke manufacture), operational discretion (retain civil appearance — not identifiable as armed platforms), and global support networks (no proprietary supply chain dependency).",
            },
          },
          {
            "@type": "Question",
            name: "What strike capabilities do high-performance combat drones have?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services HPAA combat drone platforms can be configured for: precision guided munitions (PGM) delivery, loitering munitions carriage and deployment, one-way attritable attack missions, airborne launch of standoff weapons for range extension, and kinetic counter-UAS operations. Mission system integration is performed by EASA Part-145 certified engineers.",
            },
          },
          {
            "@type": "Question",
            name: "Which aircraft are used as high-performance combat drones in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH converts the following civil airframes into high-performance combat drone platforms: Cessna 208 Caravan (light attritable strike), Beechcraft King Air 350 (medium multi-role combat), Pilatus PC-12 (versatile combat ISR), Cessna Citation 525B (high-speed strike), and C-130J Super Hercules (heavy combat platform). Aircraft are selected based on payload, range, and mission profile requirements.",
            },
          },
        ],
      },
      {
        "@type": "Service",
        name: "High-Performance Combat Drone Conversion Germany",
        description:
          "KUM Services GmbH converts civil-registered turboprop and turbofan aircraft into high-performance combat drone platforms (HPAA) for strike, ISR, and special-mission customers worldwide. EASA Part-145 certified.",
        serviceType: "Combat Drone Conversion",
        provider: { "@id": `${base}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Germany" },
          { "@type": "Text", name: "Worldwide" },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="page-header" style={{ minHeight: 420 }}>
        <div
          className="page-header-bg"
          style={{ backgroundImage: "url('/theme/hpaa3.png')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">KUM Services GmbH · Konstanz, Germany</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            High-Performance Combat Drones Germany —{" "}
            <em>Civil Aircraft Converted for Combat</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">Civil Aircraft to Combat Drone</p>
        <h2 className="section-heading">
          Germany&apos;s High-Performance Combat Drone <em>Conversion Specialist</em>
        </h2>
        <p className="section-lead">
          KUM Services GmbH, based in Konstanz, Germany, converts proven civil-registered turboprop
          and turbofan aircraft into high-performance combat drone platforms — delivering combat
          capability for strike, ISR, payload delivery, and special missions at a fraction of the
          time and cost of any purpose-built combat UAS programme. The HPAA (High Performance
          Autonomous Aircraft) approach provides defence ministries, government agencies, and
          special operations commands with scalable, affordable, and rapidly deployable combat drone
          capability.
        </p>
      </section>

      {/* Callout */}
      <div className="callout-strip reveal">
        <div className="callout-img">
          <Image
            fill
            src="/theme/hpaa5.jpg"
            alt="High-performance combat drone platform — KUM Services GmbH Konstanz Germany"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
        <div className="callout-text">
          <p className="section-eyebrow">Combat Capability Without the Cost</p>
          <h2 className="callout-heading">
            Civil Airframes. <em>Combat Mission.</em>
          </h2>
          <p className="callout-body">
            High-performance combat drones from KUM Services GmbH use proven civil airframes —
            Cessna 208, Beechcraft King Air 350, Pilatus PC-12, Cessna Citation 525B, and C-130J —
            sourced from the open civil aviation market at known prices. Each platform is converted
            on-site at the customer&apos;s location by EASA Part-145 certified technicians and
            equipped with precision strike capability, autonomous flight control, BVLOS datalinks,
            and mission-specific weapons integration. The resulting combat drone retains civil
            registration — providing operational discretion and unrestricted ferry flight capability
            that no purpose-built UCAV can match.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/#aircraft">View Platforms</Link>
          </div>
        </div>
      </div>

      {/* Combat capabilities */}
      <section className="section">
        <p className="section-eyebrow">Combat Capabilities</p>
        <h2 className="section-heading">High-Performance <em>Mission Profiles</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "STK", t: "Precision Strike", d: "Precision guided munitions (PGM) delivery. Configurable for gravity weapons, guided bombs, and standoff munitions. Autonomous targeting with AI-assisted fire control." },
            { n: "LOI", t: "Loitering Munitions", d: "Carriage and deployment of loitering munitions and one-way attack systems. HPAA platforms significantly extend the effective range of loitering munitions beyond ground-launched capability." },
            { n: "ATT", t: "Attritable Strike", d: "Selected HPAA platforms are configured for one-way attack missions. Civil-sourced airframes at known market prices make attritable operations significantly more cost-effective than any purpose-built system." },
            { n: "ISR", t: "Combat ISR", d: "Persistent EO/IR, SAR, and SIGINT coverage in support of strike operations. High-altitude endurance platforms deliver actionable intelligence before, during, and after kinetic missions." },
            { n: "C-UAS", t: "Airborne Counter-UAS", d: "Kinetic and electronic defeat of hostile drone swarms and individual UAS threats at altitude and extended range. Faster, higher, and further than ground-based counter-drone systems." },
            { n: "RNG", t: "Range Extension", d: "HPAA combat drone platforms operating as airborne launch points for standoff weapons, significantly extending effective strike range." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal">
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why HPAA over purpose-built */}
      <section className="section" style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Combat Drone Advantage</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)" }}>
          Why HPAA Over <em>Purpose-Built Combat UAS?</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "01", t: "Speed of Fielding", d: "High-performance combat drone conversion is completed on-site in a very short period. Purpose-built UCAV programmes take years. HPAA delivers combat capability when it is needed." },
            { n: "02", t: "Cost Efficiency", d: "Civil market airframe sourcing eliminates non-recurring engineering costs. Fixed-price conversion proposals. Significantly lower acquisition and lifecycle cost than purpose-built combat UAS." },
            { n: "03", t: "Operational Discretion", d: "Converted combat drones retain the external appearance of the civil base aircraft. Not identifiable as armed or military systems — a decisive advantage in grey-zone and covert operations." },
            { n: "04", t: "Global Support", d: "Base airframes such as the Cessna 208 and King Air 350 are supported by service centres and spare parts networks on every inhabited continent — no proprietary supply chain dependency." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal" style={{ borderColor: "rgba(184,150,90,0.15)" }}>
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p style={{ color: "rgba(248,245,239,0.65)" }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related pages */}
      <section className="section">
        <p className="section-eyebrow">Related Services</p>
        <h2 className="section-heading">Explore <em>HPAA Capabilities</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { href: "/hpaa-germany", t: "HPAA Germany", d: "High Performance Autonomous Aircraft — the complete HPAA programme." },
            { href: "/drone-aircraft-conversion-germany", t: "Drone Aircraft Conversion Germany", d: "Full civil-to-drone conversion process and platform options." },
            { href: "/autonomous-platform-aircraft-germany", t: "Autonomous Platform Aircraft Germany", d: "Autonomous aircraft platforms for multi-role defence and government missions." },
            { href: "/robot-aircraft-germany", t: "Robot Aircraft Germany", d: "Robot aircraft conversion for defence and special mission operators." },
          ].map((c) => (
            <div key={c.href} className="why-card reveal">
              <h3><Link href={c.href} style={{ color: "inherit", textDecoration: "none" }}>{c.t}</Link></h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: "center" }}>
        <p className="section-eyebrow">Contact</p>
        <h2 className="section-heading">Start Your <em>Combat Drone Programme</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH, Konstanz, Germany — high-performance combat drone conversion
          programmes for defence ministries, government agencies, and special operations commands
          worldwide.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
          <Link className="btn-ghost" href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
