import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = "/robot-aircraft-germany";
const OG_IMAGE = "/theme/hpaa5.jpg";

export const metadata: Metadata = {
  title: "Robot Aircraft Technology | Autonomous Flight Control Systems — KUM Services GmbH",
  description:
    "Discover Robot Aircraft Germany's advanced unmanned aerial systems, designed for precision and reliability in diverse applications and industries.",
  keywords: [
    "robot aircraft technology",
    "autonomous flight control system",
    "robot aircraft Germany",
    "BVLOS datalink aircraft",
    "ground control station aircraft",
    "sensor fusion autonomous aircraft",
    "redundant actuation flight control",
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
    title: "Robot Aircraft Technology | KUM Services GmbH",
    description:
      "The autonomy stack behind robot aircraft: flight control computers, redundant actuation, sensor fusion, BVLOS datalinks, and ground control stations — engineered in Germany, deployed worldwide.",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: "Robot Aircraft Technology — KUM Services GmbH" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robot Aircraft Technology | KUM Services GmbH",
    description: "Autonomous flight control, BVLOS datalinks, and ground control station technology for robot aircraft.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export default function RobotAircraftGermanyPage() {
  const base = getSiteUrl().replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${base}${CANONICAL}`,
        url: `${base}${CANONICAL}`,
        name: "Robot Aircraft Technology — Autonomous Flight Control Systems | KUM Services GmbH",
        description:
          "The technology that turns a civil aircraft into a robot aircraft: autonomous flight control computers, redundant actuation, sensor fusion, BVLOS datalinks, and ground control stations — engineered in Germany by KUM Services GmbH and deployed worldwide.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        keywords: "robot aircraft technology, autonomous flight control system, BVLOS datalink, ground control station, sensor fusion, redundant actuation, robot aircraft Germany, KUM Services GmbH",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Robot Aircraft Technology", item: `${base}${CANONICAL}` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}${CANONICAL}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What flight control system do robot aircraft use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services robot aircraft are fitted with an autonomous flight control system built around a flight control computer that commands redundant actuators on the aircraft's existing flight controls, engine, and systems. The system executes the full mission profile — taxi, take-off, en-route flight, and landing — autonomously, while a ground control station supervises the mission and can intervene at any time.",
            },
          },
          {
            "@type": "Question",
            name: "How are robot aircraft controlled beyond visual line of sight?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Robot aircraft operate beyond visual line of sight (BVLOS) using redundant datalinks that connect the aircraft to its ground control station. Command, telemetry, and payload data are exchanged over these links throughout the mission. Operators at the ground control station supervise the flight and issue mission-level commands rather than flying the aircraft manually.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the datalink to a robot aircraft is lost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The autonomy stack is designed so the aircraft does not depend on a continuous datalink to fly safely. If the connection to the ground control station is interrupted, the flight control system continues to execute the pre-planned mission and follows defined lost-link procedures, such as continuing to a planned waypoint or returning to a recovery location, until the link is re-established.",
            },
          },
          {
            "@type": "Question",
            name: "What role does the University of Stuttgart play in robot aircraft technology?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "KUM Services GmbH develops its autonomous flight control technology in collaboration with the Institute of Flight Mechanics and Flight Control (iFR) at the University of Stuttgart. This academic partnership provides the flight mechanics and flight control expertise behind the autonomy stack, complementing the EASA Part-145 certified maintenance procedures used during physical conversion.",
            },
          },
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
          style={{ backgroundImage: "url('/theme/hpaa5.jpg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">KUM Services GmbH · Engineered in Germany, Deployed Worldwide</p>
          <h1 className="section-heading" style={{ maxWidth: 720 }}>
            Robot Aircraft Technology —{" "}
            <em>The Autonomy Stack</em>
          </h1>
        </div>
      </div>

      {/* Introduction */}
      <section className="section">
        <p className="section-eyebrow">What Turns an Aircraft into a Robot Aircraft?</p>
        <h2 className="section-heading">
          Autonomous Flight Control. <em>Engineered, Not Improvised.</em>
        </h2>
        <p className="section-lead">
          A robot aircraft is a proven civil airframe fitted with a complete autonomy stack: an
          autonomous flight control system commanding redundant actuation on the existing flight
          controls, sensor fusion for navigation and situational awareness, BVLOS datalinks, and a
          ground control station for supervised mission control. KUM Services GmbH engineers and
          integrates this technology in Germany — in collaboration with the Institute of Flight
          Mechanics and Flight Control (iFR) at the University of Stuttgart — and deploys it on
          customer aircraft worldwide. This page explains each layer of that stack.
        </p>
      </section>

      {/* Image + content strip */}
      <div className="callout-strip reveal">
        <div className="callout-img">
          <Image
            fill
            src="/theme/hpaa7.jpg"
            alt="Robot aircraft autonomy stack — autonomous flight control integration by KUM Services GmbH"
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 90vw, 50vw"
          />
          <div className="callout-img-overlay" />
        </div>
        <div className="callout-text">
          <p className="section-eyebrow">Supervised Autonomy</p>
          <h2 className="callout-heading">
            The Aircraft Flies. <em>The Operator Supervises.</em>
          </h2>
          <p className="callout-body">
            KUM Services robot aircraft are not remotely piloted in the traditional sense. The
            autonomous flight control system executes the full mission profile — taxi, take-off,
            en-route flight, payload operation, and landing — while operators at the ground
            control station supervise the mission and issue mission-level commands over redundant
            BVLOS datalinks. Redundant actuators on the flight controls and engine, combined with
            fused navigation sensors, allow the aircraft to continue flying safely through
            individual component or datalink interruptions. The result is a robot aircraft that
            behaves predictably, follows defined procedures, and keeps the human in supervisory
            control at all times.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/contact">Request a Proposal</Link>
            <Link className="btn-ghost" href="/aircraft">View Platforms</Link>
          </div>
        </div>
      </div>

      {/* Technology stack */}
      <section className="section" style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Technology Stack</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)" }}>
          Inside the <em>Autonomy Stack</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { n: "FCC", t: "Flight Control Computer", d: "The core of the robot aircraft: an autonomous flight control computer that plans and executes the full mission profile — taxi, take-off, en-route flight, and landing — developed with flight control expertise from the University of Stuttgart." },
            { n: "ACT", t: "Redundant Actuation", d: "Redundant actuators installed on the aircraft's existing flight controls, engine, and systems translate flight control commands into physical control inputs, with redundancy to tolerate individual component faults." },
            { n: "SNS", t: "Sensor Fusion", d: "Navigation and air-data sensors are fused into a single consistent picture of aircraft state, giving the flight control system reliable position, attitude, and speed information throughout the mission." },
            { n: "COM", t: "Datalink & Comms", d: "Redundant BVLOS datalinks carry command, telemetry, and payload data between aircraft and ground control station. Defined lost-link procedures keep the aircraft on a safe, predictable flight path if a link is interrupted." },
            { n: "GCS", t: "Ground Control Station", d: "The ground control station is the operator's interface for supervised mission control: mission planning, real-time monitoring, mission-level commands, and payload management — without manually flying the aircraft." },
            { n: "PAY", t: "Payload Interface", d: "A mission payload interface connects EO/IR sensors, communications equipment, and cargo systems to the autonomy stack, so ISR, cargo, special mission, and range or communications relay roles can be configured per customer." },
          ].map((c) => (
            <div key={c.n} className="why-card reveal" style={{ borderColor: "rgba(184,150,90,0.15)" }}>
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p style={{ color: "rgba(248,245,239,0.65)" }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* One stack, multiple airframes */}
      <section className="section">
        <p className="section-eyebrow">One Autonomy Stack — Multiple Airframes</p>
        <h2 className="section-heading">Integrated on <em>Proven Aircraft</em></h2>
        <p className="section-lead" style={{ marginBottom: "2rem" }}>
          The same autonomy stack is adapted to each supported airframe — from the Cessna 208 to
          the King Air 350 and Pilatus PC-12 — so operators gain a common ground control station
          and supervised mission workflow across their robot aircraft fleet.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            { src: "/theme/cessna-208-2.png", alt: "Cessna 208 fitted with autonomous flight control technology — KUM Services GmbH", label: "Cessna 208" },
            { src: "/theme/beech-king-air-3500-2.png", alt: "King Air 350 with robot aircraft autonomy stack — KUM Services GmbH", label: "King Air 350" },
            { src: "/theme/pilatus-pc-12-2.png", alt: "Pilatus PC-12 autonomous flight control integration — KUM Services GmbH", label: "Pilatus PC-12" },
            { src: "/theme/hpaa6.jpg", alt: "Robot aircraft technology — autonomy stack integration on civil airframe", label: "HPAA Platform" },
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

      {/* Partners strip */}
      <section className="section" style={{ background: "var(--navy)", paddingTop: "3rem", paddingBottom: "3rem" }}>
        <p className="section-eyebrow" style={{ color: "var(--gold-light)" }}>Engineering Partners</p>
        <h2 className="section-heading" style={{ color: "var(--warm-white)", marginBottom: "1.5rem" }}>
          University of Stuttgart & <em>EASA Part-145</em>
        </h2>
        <p className="section-lead">
          The autonomous flight control technology behind every KUM Services robot aircraft is
          developed in collaboration with the Institute of Flight Mechanics and Flight Control
          (iFR) at the University of Stuttgart. Physical integration of the autonomy stack is
          carried out with Part One-Forty Five GmbH (EASA Part-145 certified, Neuhausen ob Eck
          Airfield) — combining academic flight control research with certified maintenance
          engineering.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", height: 80, width: 142 }}>
            <Image fill src="/theme/university-of-stuttgart.png" alt="University of Stuttgart — autonomous flight control research partner" style={{ objectFit: "contain", filter: "brightness(0.9)" }} sizes="142px" />
          </div>
          <div style={{ position: "relative", height: 80, width: 142 }}>
            <Image fill src="/theme/part-one-forty-five.png" alt="Part One-Forty Five GmbH — EASA Part-145 certified maintenance partner" style={{ objectFit: "contain", filter: "brightness(0.9)" }} sizes="142px" />
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="section">
        <p className="section-eyebrow">Related Services</p>
        <h2 className="section-heading">Explore <em>HPAA Capabilities</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            { href: "/autonomous-aircraft-germany", t: "Autonomous Aircraft Germany", d: "Programme overview — civil aircraft converted into autonomous platforms." },
            { href: "/unmanned-aircraft-germany", t: "Unmanned Aircraft Germany", d: "Certification and airspace — how unmanned conversions are approved and operated." },
            { href: "/drone-aircraft-conversion-germany", t: "Drone Aircraft Conversion Germany", d: "The conversion process — from airframe sourcing to on-site completion." },
            { href: "/autonomous-platform-aircraft-germany", t: "Autonomous Platform Aircraft Germany", d: "Platforms and payloads — airframe options and mission equipment." },
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
        <h2 className="section-heading">Discuss the <em>Technology for Your Mission</em></h2>
        <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
          KUM Services GmbH — autonomous flight control and robot aircraft technology, engineered
          in Germany and deployed for government and special-mission operators worldwide.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn-gold" href="/contact">Request a Proposal</Link>
          <Link className="btn-ghost" href="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
