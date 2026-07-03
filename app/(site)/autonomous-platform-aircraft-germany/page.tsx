import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/autonomous-platform-aircraft-germany";
const OG_IMAGE = "/theme/hpaa9.jpeg";

export const metadata: Metadata = {
  title: "Autonomous Platform Aircraft: Airframes & Payload Integration — KUM Services GmbH",
  description:
    "Which airframe fits your autonomous mission? Compare the Cessna 208 Caravan, Pilatus PC-12, King Air 350, Citation 525B and C-130J — and the payloads they carry: EO/IR, SAR, comms relay, cargo systems. Platform selection and payload integration from Germany, serving customers worldwide.",
  keywords: [
    "autonomous platform aircraft",
    "autonomous aircraft platform selection",
    "autonomous aircraft payload integration",
    "EO/IR sensor integration autonomous aircraft",
    "SAR payload autonomous platform",
    "communications relay aircraft autonomous",
    "autonomous cargo aircraft platform",
    "Cessna 208 autonomous platform",
    "Pilatus PC-12 autonomous platform",
    "King Air 350 autonomous ISR platform",
    "C-130J autonomous heavy lift",
    "multi-role autonomous aircraft Germany",
    "KUM Services GmbH",
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
    title: "Autonomous Platform Aircraft: Airframes & Payload Integration | KUM Services GmbH",
    description:
      "Match the airframe to the mission: five proven civil platforms, from light utility to heavy lift, with modular EO/IR, SAR, comms relay and cargo payload integration. Engineered in Germany, delivered worldwide.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Autonomous Platform Aircraft — Airframes and Payload Integration — KUM Services GmbH" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomous Platform Aircraft: Airframes & Payload Integration | KUM Services GmbH",
    description: "Platform selection and payload integration for autonomous aircraft — from Germany, worldwide.",
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
        name: "Autonomous Platform Aircraft: Airframes & Payload Integration — KUM Services GmbH",
        description:
          "Guide to selecting the right airframe for an autonomous mission — Cessna 208 Caravan, Pilatus PC-12, King Air 350, Citation 525B, C-130J — and integrating EO/IR, SAR, communications relay and cargo payloads. From KUM Services GmbH in Germany, for customers worldwide.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "autonomous platform aircraft, airframe selection, payload integration, EO/IR sensors, SAR, communications relay, autonomous cargo aircraft, multi-role reconfiguration, KUM Services GmbH Germany",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Autonomous Platform Aircraft — Airframes & Payload Integration", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Which airframe is best for autonomous ISR missions?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For persistent, multi-sensor ISR the Beechcraft King Air 350 is the benchmark choice: its twin-turboprop configuration, high-altitude endurance, and generous cabin volume support EO/IR turrets, SAR, and SIGINT equipment operating together. Where a smaller logistical footprint matters, the Cessna 208 Caravan or Pilatus PC-12 carry a single primary sensor efficiently, while the Cessna Citation 525B adds jet speed for rapid transit to distant surveillance areas.",
            },
          },
          {
            "@type": "Question",
            name: "What payloads can be integrated on an autonomous platform aircraft?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH integrates mission payloads through modular mechanical, power, and data interfaces on each converted airframe. Typical payloads include stabilised EO/IR sensor turrets, synthetic aperture radar (SAR), signals collection equipment, airborne communications relay packages, cargo handling and aerial delivery systems, and mission computers that fuse sensor data onboard. Payload fit is engineered per airframe and validated during the conversion programme.",
            },
          },
          {
            "@type": "Question",
            name: "Can one platform be reconfigured for multiple missions?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The HPAA conversion architecture uses standardised payload interfaces so a single autonomous platform aircraft can move between roles — for example an ISR sensor fit one week and a cargo or communications relay configuration the next. Reconfiguration is a maintenance-level task performed with EASA Part-145 certified procedures rather than a new engineering programme, which keeps a small fleet operationally flexible.",
            },
          },
          {
            "@type": "Question",
            name: "What is the heaviest platform available for autonomous conversion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The C-130J Super Hercules is the heaviest airframe in the KUM Services autonomous conversion portfolio. It is selected when missions demand maximum payload mass and volume — heavy cargo resupply, large-area ISR with multiple simultaneous sensor systems, or long-endurance communications relay. Its rear ramp and cargo handling system also support autonomous aerial delivery of palletised loads.",
            },
          },
        ],
      },
      {
        "@type": "Service",
        name: "Autonomous Platform Selection & Payload Integration",
        description:
          "KUM Services GmbH advises on airframe selection and integrates EO/IR, SAR, communications relay, cargo and mission-computer payloads on autonomous platform aircraft. Engineered in Germany with EASA Part-145 certified partners, delivered to customers worldwide.",
        serviceType: "Autonomous Aircraft Platform Selection and Payload Integration",
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
          <p className="section-eyebrow">KUM Services GmbH · Germany · Worldwide Delivery</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            Autonomous Platform Aircraft —{" "}
            <em>Airframes &amp; Payload Integration</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">Match the Airframe to the Mission</p>
        <h2 className="section-heading">
          Which Platform Fits <em>Your Mission?</em>
        </h2>
        <p className="section-lead">
          Every successful autonomous aircraft programme starts with two engineering decisions:
          the right airframe and the right payload fit. KUM Services GmbH converts five proven
          civil airframes — from the light-utility Cessna 208 Caravan to the heavy-lift C-130J —
          into autonomous platforms, then integrates the sensors, communications, and cargo
          systems the mission demands. This page explains how the platforms differ, how payload
          integration works, and how a single aircraft can be reconfigured across ISR, cargo,
          communications relay, and special-mission roles. Engineered in Germany; delivered to
          operators worldwide.
        </p>
      </section>

      {/* Callout with image */}
      <div className="callout-strip reveal">
        <div className="callout-text" style={{ order: 1 }}>
          <p className="section-eyebrow">Platform Selection Logic</p>
          <h2 className="callout-heading">
            Endurance. Altitude. <em>Payload.</em>
          </h2>
          <p className="callout-body">
            Airframe choice is a trade-off. Lighter turboprops such as the Cessna 208 and Pilatus
            PC-12 offer long loiter times, austere-field access, and a small logistical footprint —
            at the cost of payload volume. The King Air 350 balances altitude, endurance, and cabin
            space for multi-sensor ISR fits. The Citation 525B trades loiter time for jet speed and
            higher operating altitude, reaching distant mission areas quickly. The C-130J stands
            apart as the heavy option where payload mass and internal volume dominate the
            requirement. KUM Services assesses the mission profile first — station time, sensor
            suite, cargo load, transit distance — then recommends the airframe, rather than the
            other way around.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/contact">Discuss Your Mission Profile</Link>
            <Link className="btn-ghost" href="/aircraft">View All Platforms</Link>
          </div>
        </div>
        <div className="callout-img" style={{ order: 2 }}>
          <Image
            fill
            src="/theme/hpaa11.jpeg"
            alt="Autonomous platform aircraft payload integration — KUM Services GmbH Germany"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 90vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
      </div>

      {/* Platform comparison */}
      <section className="section">
        <p className="section-eyebrow">The Airframe Portfolio</p>
        <h2 className="section-heading">Five Platforms, <em>Five Mission Classes</em></h2>
        <p className="section-lead" style={{ marginBottom: "2rem" }}>
          Each airframe in the KUM Services portfolio occupies a distinct point on the
          endurance–altitude–payload envelope. All are sourced from the open civil market with
          verified reliability records and global spares support.
        </p>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "208", t: "Cessna 208 Caravan — Light Utility", d: "The entry point to autonomous operations. Long loiter at low operating cost, short and unpaved field capability, and a cabin suited to a single primary sensor or light cargo. Best for single-sensor ISR and light resupply missions with minimal ground infrastructure." },
            { n: "PC12", t: "Pilatus PC-12 — Versatile Single Turboprop", d: "A step up in speed, range, and cabin volume while retaining single-engine economy and austere-field access. Its large cargo door supports flexible payload installation — a proven special-mission platform for ISR, light cargo, and communications relay in remote environments." },
            { n: "350", t: "Beechcraft King Air 350 — Medium ISR", d: "The benchmark medium ISR airframe worldwide. Twin-turboprop redundancy, high-altitude endurance, and cabin space for EO/IR, SAR, and signals payloads operating simultaneously. The default recommendation for persistent multi-sensor surveillance." },
            { n: "525B", t: "Cessna Citation 525B — High-Speed Jet", d: "Jet transit speed and higher operating altitude for missions where reaching the area quickly matters more than loiter time — wide-area maritime patrol, rapid-response ISR, and high-altitude communications relay over extended distances." },
            { n: "C130", t: "C-130J Super Hercules — Heavy Lift", d: "The heavy end of the portfolio. Maximum payload mass and internal volume, a rear cargo ramp for palletised aerial delivery, and the endurance for strategic-scale autonomous cargo, large-area ISR, and long-duration relay missions." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal">
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform image grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            { src: "/theme/cessna-208-3.png", alt: "Cessna 208 Caravan — light utility autonomous platform aircraft", label: "Cessna 208 Caravan" },
            { src: "/theme/pilatus-pc-12-3.png", alt: "Pilatus PC-12 — versatile single-turboprop autonomous platform", label: "Pilatus PC-12" },
            { src: "/theme/beech-king-air-3500-3.png", alt: "Beechcraft King Air 350 — medium autonomous ISR platform", label: "King Air 350" },
          ].map((img) => (
            <div key={img.src} style={{ position: "relative", overflow: "hidden", height: 200 }}>
              <Image
                fill
                src={img.src}
                alt={img.alt}
                style={{ objectFit: "cover", filter: "saturate(0.8)" }}
                sizes="(max-width: 768px) 45vw, 25vw"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "0.6rem 1rem",
                  background: "rgba(11,17,32,0.75)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                }}
              >
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payload integration */}
      <section className="section" style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Payload Integration</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)" }}>
          What the Platforms <em>Carry</em>
        </h2>
        <p className="section-lead" style={{ color: "rgba(248,245,239,0.75)" }}>
          Payloads mount through standardised mechanical, power, and data interfaces engineered
          into each conversion. Integration is validated on the ground and in flight before
          handover.
        </p>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "EO/IR", t: "EO/IR & SAR Sensors", d: "Stabilised electro-optical and infrared turrets for day/night imaging, paired with synthetic aperture radar for all-weather, wide-area mapping. Sensor selection is matched to the airframe's power and volume budget." },
            { n: "COM", t: "Communications Relay", d: "Airborne relay packages that extend line-of-sight datalinks and radio networks across terrain and distance — turning the autonomous platform into a persistent node above the operating area." },
            { n: "CGO", t: "Cargo & Airdrop Systems", d: "Internal cargo restraint, GPS-guided parachute delivery, and direct-landing resupply configurations. On the C-130J, ramp-based palletised airdrop supports autonomous delivery at scale." },
            { n: "MSN", t: "Mission Computers", d: "Onboard processing that fuses sensor feeds, manages payload tasking, and pushes actionable products over the BVLOS datalink to the ground control station — reducing bandwidth demand and operator workload." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal" style={{ borderColor: "rgba(184,150,90,0.15)" }}>
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p style={{ color: "rgba(248,245,239,0.65)" }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-role reconfiguration */}
      <section className="section">
        <p className="section-eyebrow">Multi-Role by Design</p>
        <h2 className="section-heading">One Airframe, <em>Many Missions</em></h2>
        <p className="section-lead" style={{ marginBottom: "2rem" }}>
          Because payloads attach through common interfaces, a converted platform is never locked
          into a single role. An ISR-configured King Air 350 can be refitted as a communications
          relay; a Caravan can swap its sensor turret for a cargo delivery fit. Reconfiguration is
          performed as a maintenance-level task under EASA Part-145 certified procedures by our
          partner Part One-Forty Five GmbH — supported by autonomous flight control expertise from
          the Institute of Flight Mechanics and Flight Control (iFR) at the University of
          Stuttgart. For operators, this means a small fleet covers a broad mission set, and
          payload roadmaps can evolve without new airframe programmes.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/contact">Request a Payload Study</Link>
          <Link className="btn-ghost" href="/aircraft">Compare Platforms</Link>
        </div>
      </section>

      {/* Related pages */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-eyebrow">Related Services</p>
        <h2 className="section-heading">Explore <em>HPAA Capabilities</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { href: "/autonomous-aircraft-germany", t: "Autonomous Aircraft Germany", d: "The programme overview — why civil-to-autonomous conversion beats purpose-built development." },
            { href: "/robot-aircraft-germany", t: "Robot Aircraft Germany", d: "The technology stack — flight control systems, autonomy software, and BVLOS datalinks." },
            { href: "/unmanned-aircraft-germany", t: "Unmanned Aircraft Germany", d: "Certification and airspace — how converted aircraft are approved and operated." },
            { href: "/drone-aircraft-conversion-germany", t: "Drone Aircraft Conversion Germany", d: "The conversion process — from airframe sourcing to on-site handover, step by step." },
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
        <h2 className="section-heading">Find the Right <em>Platform and Payload</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          Tell us your mission profile — station time, sensors, cargo, transit distance — and
          KUM Services GmbH will recommend the airframe and payload fit. Serving defence
          ministries, government agencies, and special-mission operators worldwide from Germany.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/contact">Request a Proposal</Link>
          <Link className="btn-ghost" href="/aircraft">View Platforms</Link>
        </div>
      </section>
    </>
  );
}
