import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/autonomous-platform-aircraft-germany";
const OG_IMAGE = "/theme/hpaa9.jpeg";

export const metadata: Metadata = {
  title: "Autonomous Platform Aircraft Germany | Civil Aircraft Conversion — KUM Services GmbH",
  description:
    "Autonomous platform aircraft Germany: KUM Services GmbH, Konstanz converts proven civil turboprop and turbofan aircraft into autonomous platform aircraft for ISR, cargo, strike and special missions. EASA Part-145 certified. Fast, affordable, globally supported.",
  keywords: [
    "autonomous platform aircraft Germany",
    "autonomous aircraft platform Germany",
    "civil aircraft to autonomous platform Germany",
    "autonomous platform Germany",
    "HPAA platform Germany",
    "autonomous aircraft Germany",
    "civil to autonomous platform Germany",
    "optionally piloted aircraft platform Germany",
    "OPA Germany",
    "autonomous systems Germany",
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
    title: "Autonomous Platform Aircraft Germany | KUM Services GmbH Konstanz",
    description:
      "KUM Services GmbH, Konstanz — autonomous platform aircraft specialist. Civil turboprop and turbofan aircraft converted to autonomous platforms for defence and government.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Autonomous Platform Aircraft Germany — KUM Services GmbH Konstanz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomous Platform Aircraft Germany | KUM Services GmbH",
    description: "Civil aircraft to autonomous platform conversion, Konstanz Germany.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export default function AutonomousPlatformAircraftGermanyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "Autonomous Platform Aircraft Germany — KUM Services GmbH Konstanz",
        description:
          "KUM Services GmbH converts proven civil aircraft into autonomous platform aircraft for ISR, cargo, strike and special missions in Germany and worldwide.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "autonomous platform aircraft Germany, civil aircraft to autonomous platform Germany, HPAA platform Germany, autonomous aircraft Germany",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Autonomous Platform Aircraft Germany", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is an autonomous platform aircraft in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An autonomous platform aircraft in Germany is a proven civil-registered turboprop or turbofan aircraft converted into a fully autonomous multi-role platform by KUM Services GmbH, Konstanz. The HPAA (High Performance Autonomous Aircraft) conversion programme delivers autonomous platform capability for ISR, cargo, strike, counter-UAS, and range extension missions — faster and at lower cost than any purpose-built autonomous aircraft programme.",
            },
          },
          {
            "@type": "Question",
            name: "What autonomous aircraft platforms does KUM Services offer in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH offers autonomous platform aircraft based on five civil airframes: Cessna 208 Caravan (light multi-role autonomous platform), Beechcraft King Air 350 (medium autonomous ISR and strike platform), Pilatus PC-12 (single-turboprop autonomous platform), Cessna Citation 525B (high-speed autonomous jet platform), and C-130J Super Hercules (heavy autonomous platform for large payload and long-range missions).",
            },
          },
          {
            "@type": "Question",
            name: "What missions can autonomous platform aircraft perform?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services autonomous platform aircraft can perform: ISR (EO/IR, SAR, SIGINT, border surveillance, maritime patrol), cargo and aerial resupply (GPS-guided parachute and direct-landing delivery), strike operations (precision guided munitions, loitering munitions, attritable attack), counter-UAS (kinetic and electronic defeat of hostile drones), and range extension (airborne launch platform for weapons and sensors).",
            },
          },
          {
            "@type": "Question",
            name: "How does civil aircraft to autonomous platform conversion work in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH converts civil aircraft to autonomous platforms in Germany by: sourcing a proven civil airframe from the open aviation market; installing autonomous flight control systems (developed with the University of Stuttgart), BVLOS datalinks, and mission-specific payload systems; providing a ground control station; and completing on-site validation. All work is performed by EASA Part-145 certified technicians (Part One-Forty Five GmbH, Neuhausen ob Eck).",
            },
          },
        ],
      },
      {
        "@type": "Service",
        name: "Autonomous Platform Aircraft Conversion Germany",
        description:
          "KUM Services GmbH converts civil-registered turboprop and turbofan aircraft into autonomous platform aircraft (HPAA) for defence, government, and special-mission customers worldwide. EASA Part-145 certified.",
        serviceType: "Autonomous Platform Aircraft Conversion",
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
          style={{ backgroundImage: "url('/theme/hpaa9.jpeg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">KUM Services GmbH · Konstanz, Germany</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            Autonomous Platform Aircraft Germany —{" "}
            <em>Civil Aircraft Conversion Specialist</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">Civil Aircraft to Autonomous Platform</p>
        <h2 className="section-heading">
          Germany&apos;s Autonomous Platform Aircraft <em>Specialist</em>
        </h2>
        <p className="section-lead">
          KUM Services GmbH, headquartered in Konstanz, Germany, delivers autonomous platform
          aircraft conversion programmes that transform proven civil-registered turboprop and
          turbofan airframes into fully autonomous multi-role platforms for military, government,
          and special-mission operations. The HPAA (High Performance Autonomous Aircraft)
          conversion approach is the fastest and most cost-effective path to operational autonomous
          platform capability — significantly faster than any purpose-built autonomous aircraft
          development programme, and at a fraction of the cost.
        </p>
      </section>

      {/* Callout */}
      <div className="callout-strip reveal">
        <div className="callout-text" style={{ order: 1 }}>
          <p className="section-eyebrow">Platform Architecture</p>
          <h2 className="callout-heading">
            Multi-Role. <em>Autonomous. Proven.</em>
          </h2>
          <p className="callout-body">
            The KUM Services autonomous platform aircraft concept is built on proven civil
            airframes — Cessna 208, Beechcraft King Air 350, Pilatus PC-12, Cessna Citation 525B,
            and C-130J. Each base aircraft carries an established reliability record and benefits
            from a global maintenance and spare-parts network. The autonomous platform layer adds
            advanced flight control systems, AI-assisted mission planning, BVLOS datalinks, and
            modular payload interfaces — enabling rapid reconfiguration between ISR, cargo, strike,
            counter-UAS, and range extension missions. All conversion work is completed on-site by
            EASA Part-145 certified technicians.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/#contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/#aircraft">View Platforms</Link>
          </div>
        </div>
        <div className="callout-img" style={{ order: 2 }}>
          <Image
            fill
            src="/theme/hpaa11.jpeg"
            alt="Autonomous platform aircraft — KUM Services GmbH Konstanz Germany"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
      </div>

      {/* Platform options */}
      <section className="section">
        <p className="section-eyebrow">Autonomous Platform Aircraft — Germany</p>
        <h2 className="section-heading">Platform <em>Options</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "208", t: "Cessna 208 Caravan", d: "The definitive light autonomous platform aircraft. Proven in thousands of commercial operating hours worldwide. Ideal for ISR, cargo delivery, and attritable strike missions requiring minimal logistical footprint." },
            { n: "350", t: "Beechcraft King Air 350", d: "The benchmark medium autonomous platform aircraft. Twin-turboprop reliability with high-altitude endurance. Suited for persistent ISR, SIGINT, SAR, and multi-sensor special mission configurations." },
            { n: "PC12", t: "Pilatus PC-12", d: "Single-turboprop performance with exceptional range and payload capacity. A proven special mission autonomous platform for ISR, cargo, and personnel missions in austere environments." },
            { n: "525B", t: "Cessna Citation 525B", d: "High-speed business jet performance converted to an autonomous strike or ISR platform. Jet performance provides rapid transit to target areas and extended standoff capability." },
            { n: "C130", t: "C-130J Super Hercules", d: "The heavy autonomous platform aircraft option for maximum payload, range, and endurance. Suited to large-area ISR, heavy cargo resupply, and strategic-level autonomous platform missions." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal">
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission roles */}
      <section className="section" style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Mission Roles</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)" }}>
          Autonomous Platform Aircraft — <em>Operational Roles</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "ISR", t: "Intelligence & Surveillance", d: "Persistent EO/IR, SAR, and SIGINT coverage. High-altitude endurance autonomous platforms deliver sustained intelligence collection, border monitoring, and maritime patrol." },
            { n: "CGO", t: "Cargo & Resupply", d: "Autonomous aerial delivery of critical supplies. GPS-guided parachute and direct-landing delivery systems for forward operating locations in contested environments." },
            { n: "STK", t: "Strike Operations", d: "Precision guided munitions delivery, loitering munition carriage, and kinetic effects. Autonomous platform aircraft configured for precision strike or attritable attack missions." },
            { n: "C-UAS", t: "Counter-UAS", d: "Airborne kinetic and electronic defeat of hostile unmanned aerial systems at altitude and extended range — beyond the capability of ground-based counter-UAS." },
            { n: "EXT", t: "Range Extension", d: "Autonomous platform aircraft operating as airborne launch points, extending effective weapon and sensor range well beyond ground or sea-based capability." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal" style={{ borderColor: "rgba(184,150,90,0.15)" }}>
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p style={{ color: "rgba(248,245,239,0.65)" }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="section">
        <p className="section-eyebrow">Certified Partners</p>
        <h2 className="section-heading">EASA Part-145 &amp; <em>University of Stuttgart</em></h2>
        <p className="section-lead" style={{ marginBottom: "2rem" }}>
          All KUM Services autonomous platform aircraft conversion programmes are conducted with
          Part One-Forty Five GmbH (EASA Part-145 certified, Neuhausen ob Eck Airfield) and the
          Institute of Flight Mechanics and Flight Control (iFR) at the University of Stuttgart —
          ensuring every platform meets the highest standards of airworthiness and autonomous
          flight control.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", height: 80, width: 142 }}>
            <Image fill src="/theme/part-one-forty-five.png" alt="Part One-Forty Five GmbH — EASA Part-145 certified maintenance partner" style={{ objectFit: "contain", filter: "brightness(0.9)" }} sizes="142px" />
          </div>
          <div style={{ position: "relative", height: 80, width: 142 }}>
            <Image fill src="/theme/university-of-stuttgart.png" alt="University of Stuttgart — autonomous flight control research partner" style={{ objectFit: "contain", filter: "brightness(0.9)" }} sizes="142px" />
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-eyebrow">Related Services</p>
        <h2 className="section-heading">Explore <em>HPAA Capabilities</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { href: "/hpaa-germany", t: "HPAA Germany", d: "High Performance Autonomous Aircraft — the complete HPAA conversion programme." },
            { href: "/autonomous-aircraft-germany", t: "Autonomous Aircraft Germany", d: "Autonomous aircraft conversion for defence and government operators." },
            { href: "/unmanned-aircraft-germany", t: "Unmanned Aircraft Germany", d: "Manned-to-unmanned conversion programmes for defence and government." },
            { href: "/high-performance-combat-drones-germany", t: "High-Performance Combat Drones Germany", d: "Combat drone platforms for strike, ISR and special missions." },
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
        <h2 className="section-heading">Start Your <em>Autonomous Platform Programme</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH, Konstanz, Germany — autonomous platform aircraft conversion
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
