import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/absoluteUrl";
import { HPAA_GERMANY_PATH, HPAA_VIDEO_PATH } from "@/lib/aiDiscovery";
import { getSiteUrl } from "@/lib/siteUrl";

const CANONICAL = HPAA_GERMANY_PATH;
const VIDEO_PATH = HPAA_VIDEO_PATH;
const VIDEO_POSTER = "/theme/hpaa-video-poster.jpg";
const OG_IMAGE = VIDEO_POSTER;

export const metadata: Metadata = {
  title: "High-Performance Autonomous Aircraft | Robot Aircraft",
  description:
    "A proven full-size aircraft platform, now pilotless. See our high-performance autonomous aircraft for cargo, surveillance and payload missions under supervised mission control.",
  keywords: [
    "high-performance autonomous aircraft",
    "autonomous cargo aircraft",
    "pilotless aircraft",
    "unmanned aircraft system",
    "UAS",
    "supervised autonomy",
    "HPAA Germany",
    "KUM Services GmbH",
    "high performance autonomous aircraft Germany",
    "robot aircraft Germany",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: absoluteUrl(CANONICAL),
    languages: {
      en: absoluteUrl(CANONICAL),
      "en-x-default": absoluteUrl(CANONICAL),
    },
    types: {
      "text/plain": absoluteUrl("/llms.txt"),
    },
  },
  openGraph: {
    type: "video.other",
    url: absoluteUrl(CANONICAL),
    title: "High-Performance Autonomous Aircraft | Robot Aircraft",
    description:
      "A proven full-size aircraft platform, now pilotless. High-performance autonomous aircraft for cargo, surveillance and payload missions under supervised mission control.",
    images: [
      {
        url: absoluteUrl(OG_IMAGE),
        width: 1200,
        height: 630,
        alt: "High-performance autonomous aircraft on the runway",
      },
    ],
    videos: [
      {
        url: absoluteUrl(VIDEO_PATH),
        width: 832,
        height: 464,
        type: "video/mp4",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Performance Autonomous Aircraft | Robot Aircraft",
    description:
      "Proven civilian platform, now pilotless — supervised mission control for cargo, surveillance and payload missions.",
    images: [absoluteUrl(OG_IMAGE)],
  },
};

const VIDEO_FAQ = [
  {
    q: "What is a high-performance autonomous aircraft?",
    a: "It is a full-size, capable aircraft that flies without an onboard pilot, built on a proven airframe so it can carry substantial payloads over long distances — distinct from small consumer or commercial drones.",
  },
  {
    q: "Is the aircraft fully autonomous or remotely piloted?",
    a: "It flies autonomously but operates under supervised mission control. Ground-based operators monitor every system in real time and retain authority over the mission.",
  },
  {
    q: "What payloads can it carry?",
    a: "Because it is based on a proven civilian platform rather than a small drone airframe, it supports meaningful cargo, sensor, and equipment payloads. Specific capacity depends on configuration — contact us for figures.",
  },
  {
    q: "What can it be used for?",
    a: "Unmanned cargo and logistics, long-endurance surveillance and monitoring, and heavy or specialised payload missions.",
  },
] as const;

const MISSION_USES = [
  {
    icon: "📦",
    title: "Unmanned cargo and logistics",
    text: "Moving payloads between sites, to remote or hard-to-reach locations, or along routes where a crewed flight is costly or risky — without putting a pilot in the seat.",
  },
  {
    icon: "👁",
    title: "Long-endurance surveillance",
    text: "Wide-area patrol, infrastructure inspection, border and maritime monitoring, and persistent observation where time on station is the whole point.",
  },
  {
    icon: "⚙",
    title: "Heavy-payload sensor missions",
    text: "When the payload is large, power-hungry, or specialised, you need an aircraft with real lift and real electrical capacity — not a consumer airframe stretched past its limits.",
  },
] as const;

export default function HpaaGermanyPage() {
  const base = getSiteUrl().replace(/\/$/, "");
  const pageUrl = `${base}${CANONICAL}`;
  const videoSchemaId = `${pageUrl}#video`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: "High-Performance Autonomous Aircraft — Proven Platform, Now Pilotless",
        description:
          "A proven full-size civilian aircraft platform converted into a high-performance autonomous aircraft: payload-capable, long-endurance, pilotless, and operated under supervised mission control.",
        inLanguage: "en",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": `${base}/#hpaa` },
        publisher: { "@id": `${base}/#organization` },
        video: { "@id": videoSchemaId },
        primaryImageOfPage: absoluteUrl(VIDEO_POSTER),
        mainEntity: { "@id": videoSchemaId },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".page-header-content--video", "#faq"],
        },
        keywords:
          "high-performance autonomous aircraft, autonomous cargo aircraft, pilotless aircraft, unmanned aircraft system, supervised autonomy, HPAA Germany, KUM Services GmbH",
      },
      {
        "@type": "VideoObject",
        "@id": videoSchemaId,
        name: "High-Performance Autonomous Aircraft — Proven Platform, Now Pilotless",
        description:
          "A proven full-size civilian aircraft platform converted into a high-performance autonomous aircraft: payload-capable, long-endurance, pilotless, and operated under supervised mission control.",
        thumbnailUrl: absoluteUrl(VIDEO_POSTER),
        uploadDate: "2026-06-30",
        duration: "PT36S",
        contentUrl: absoluteUrl(VIDEO_PATH),
        embedUrl: pageUrl,
        inLanguage: "en",
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "HPAA Germany", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          ...VIDEO_FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
          {
            "@type": "Question",
            name: "What is HPAA Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "HPAA (High Performance Autonomous Aircraft) Germany refers to the civil aircraft to autonomous platform conversion service provided by KUM Services GmbH (Germany). KUM Services converts proven civil turboprop and turbofan aircraft into fully autonomous or optionally piloted platforms for ISR, cargo, strike, and special missions.",
            },
          },
          {
            "@type": "Question",
            name: "How long does HPAA conversion take in Germany?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "HPAA conversion by KUM Services GmbH is completed on-site in a very short period — significantly faster than any purpose-built UAV programme. Civil registration of the base aircraft allows ferry flights to the customer's location without special permits.",
            },
          },
          {
            "@type": "Question",
            name: "Is HPAA conversion EASA certified?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. All HPAA conversion work by KUM Services GmbH is conducted with Part One-Forty Five GmbH, an EASA Part-145 certified maintenance organisation based at Neuhausen ob Eck Airfield, Germany.",
            },
          },
          {
            "@type": "Question",
            name: "Can HPAA platforms retain civil registration?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. HPAA platforms retain civil registration and external appearance throughout conversion — no special ferry permits required, and the platform is not visually identifiable as an autonomous system.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="hpaa-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page-header" style={{ minHeight: 420 }}>
        <div
          className="page-header-bg"
          style={{ backgroundImage: `url('${VIDEO_POSTER}')` }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content" style={{ padding: "6rem 2rem 4rem" }}>
          <p className="section-eyebrow">KUM Services GmbH · Germany</p>
          <h1 className="section-heading" style={{ maxWidth: 780 }}>
            <span style={{ whiteSpace: "nowrap" }}>High-Performance Autonomous Aircraft</span>
            <br />
            <em style={{ whiteSpace: "nowrap" }}>A Proven Platform, Now Pilotless</em>
          </h1>
        </div>
      </div>

      <section className="hpaa-video-stage" aria-label="HPAA flight video">
        <div className="hpaa-featured-inner">
          <div className="hpaa-video-wrap">
            <video
              controls
              preload="metadata"
              playsInline
              poster={VIDEO_POSTER}
              title="Proven civilian aircraft platform → autonomy integration → pilotless flight → supervised mission control"
              className="hpaa-video-player"
            >
              <source src={VIDEO_PATH} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="hpaa-video-meta">
              <p className="hpaa-video-caption">
                Proven civilian platform → autonomy integration → pilotless flight → supervised
                mission control
              </p>
              <p className="hpaa-video-duration">0:36</p>
            </div>
          </div>
        </div>
      </section>

      <div className="hpaa-landscape-block">
        <div className="callout-strip reveal">
          <div className="callout-img">
            <Image
              fill
              src="/theme/hpaa8.jpg"
              alt="High-performance autonomous aircraft in flight — HPAA demonstration"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            <div className="callout-img-overlay" />
          </div>
          <div className="callout-text">
            <p className="section-eyebrow">Flight demonstration</p>
            <h2 className="callout-heading">
              A proven platform, <em>now pilotless</em>
            </h2>
            <p className="callout-body">
              Most unmanned aircraft start small. We started with a proven, full-size civilian
              aircraft — and made it fly itself. The result is a high-performance autonomous
              aircraft that carries real payloads over real distances, without a pilot on board,
              under continuous supervised mission control from the ground.
            </p>
            <p className="callout-body" style={{ marginTop: "1rem" }}>
              This is what separates a high-performance autonomous aircraft from a hobby-class
              drone: certified-grade airframe heritage, true payload capacity, long endurance, and
              an autonomy stack mature enough to be trusted with demanding missions.
            </p>
          </div>
        </div>
      </div>

      <div className="hpaa-landscape-block">
        <div className="callout-strip callout-strip--text-start reveal">
          <div className="callout-text">
            <p className="section-eyebrow">Proven platform</p>
            <h2 className="callout-heading">
              Why build autonomy on a <em>proven aircraft</em>
            </h2>
            <p className="callout-body">
              The fastest way to an unreliable unmanned aircraft is to design a brand-new airframe
              and bolt autonomy onto it. We took the opposite route — inheriting decades of
              aerodynamic, structural, and systems maturity from an established civilian platform.
              That foundation means meaningful payloads, endurance and range beyond multirotor
              drones, and predictable behaviour before the pilot is removed.
            </p>
          </div>
          <div className="callout-img">
            <Image
              fill
              src="/theme/hpaa6.jpg"
              alt="Proven civilian aircraft platform — HPAA conversion base airframe"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            <div className="callout-img-overlay" />
          </div>
        </div>
      </div>

      <div className="hpaa-landscape-block">
        <div className="callout-strip reveal">
          <div className="callout-img">
            <Image
              fill
              src="/theme/hpaa11.jpeg"
              alt="Supervised mission control for high-performance autonomous aircraft"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            <div className="callout-img-overlay" />
          </div>
          <div className="callout-text">
            <p className="section-eyebrow">Supervised autonomy</p>
            <h2 className="callout-heading">
              Pilotless, but never <em>unsupervised</em>
            </h2>
            <p className="callout-body">
              Every mission runs under supervised mission control. Operators see flight systems,
              navigation, power, and payload status in real time — and can intervene at any point.
              The cockpit may be empty; the mission is watched second by second.
            </p>
          </div>
        </div>
      </div>

      <section className="section">
        <p className="section-eyebrow">Mission applications</p>
        <h2 className="section-heading">
          What a high-performance autonomous aircraft <em>is used for</em>
        </h2>
        <p className="section-lead" style={{ marginBottom: "2rem", maxWidth: 920 }}>
          A large autonomous aircraft built on a proven platform opens missions that small drones
          cannot serve — with the cost and risk profile of an{" "}
          <strong>unmanned aircraft system (UAS)</strong>.
        </p>
        <div className="usage-grid">
          {MISSION_USES.map((item) => (
            <div key={item.title} className="usage-card reveal">
              <div className="usage-card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="hpaa-landscape-block">
        <div className="callout-strip callout-strip--text-start reveal">
          <div className="callout-text">
            <p className="section-eyebrow">Integration</p>
            <h2 className="callout-heading">
              How the autonomy is <em>integrated</em>
            </h2>
            <p className="callout-body">
              Turning a proven airframe into a high-performance autonomous aircraft is an engineering
              discipline, not a kit. Flight control, redundant navigation, secure command-and-control
              links, health monitoring, and mission control software are integrated so the aircraft
              flies reliably and reports honestly to supervisors on the ground.
            </p>
          </div>
          <div className="callout-img">
            <Image
              fill
              src="/theme/hpaa7.jpg"
              alt="Autonomy integration on proven civilian aircraft — HPAA Germany"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            <div className="callout-img-overlay" />
          </div>
        </div>
      </div>

      <section className="section" id="faq">
        <p className="section-eyebrow">FAQ</p>
        <h2 className="section-heading">Frequently asked <em>questions</em></h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {VIDEO_FAQ.map((item) => (
            <div key={item.q} className="why-card reveal">
              <h3>{item.q}</h3>
              <p>
                {item.q === "What payloads can it carry?" ? (
                  <>
                    {item.a.replace("contact us for figures.", "")}
                    <Link href="/contact">contact us</Link> for figures.
                  </>
                ) : (
                  item.a
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="hpaa-cta-panel reveal">
          <p className="section-eyebrow">See the platform in action</p>
          <h2 className="section-heading">
            Evaluate <em>autonomous aircraft</em> for your mission
          </h2>
          <p className="section-lead" style={{ margin: "1rem auto 2rem", maxWidth: 560 }}>
            From proven airframe to pilotless flight under supervised mission control — if you are
            evaluating autonomous aircraft for cargo, surveillance, or payload missions, we would
            welcome the conversation.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn-gold" href="/contact">
              Request a briefing
            </Link>
            <Link className="btn-ghost" href="/aircraft">
              View platforms
            </Link>
          </div>
          <p className="hpaa-related-links">
            Related:{" "}
            <Link href="/autonomous-aircraft-germany">autonomous aircraft Germany</Link>
            {" · "}
            <Link href="/unmanned-aircraft-germany">unmanned aircraft Germany</Link>
            {" · "}
            <Link href="/aircraft">aircraft catalogue</Link>
          </p>
        </div>
      </section>

      <div className="hpaa-landscape-block">
        <div className="callout-strip reveal">
          <div className="callout-img">
            <Image
              fill
              src="/theme/beech-king-air-350-5.png"
              alt="Beech King Air 350 — HPAA conversion platform, KUM Services GmbH Germany"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            <div className="callout-img-overlay" />
          </div>
          <div className="callout-text">
            <p className="section-eyebrow">Germany&apos;s HPAA Specialist</p>
            <h2 className="callout-heading">
              KUM Services GmbH
              <br />
              <em>Germany</em>
            </h2>
            <p className="callout-body">
              HPAA conversion programmes utilise proven civil turboprop and turbofan airframes —
              Cessna 208, Beechcraft King Air 350, Pilatus PC-12, Citation 525B, and C-130J — with
              on-site conversion under EASA Part-145 certified maintenance procedures.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link className="btn-gold" href="/contact">
                Request a Proposal
              </Link>
              <Link className="btn-ghost" href="/aircraft">
                View Platforms
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <p className="section-eyebrow">Key Advantages</p>
        <h2 className="section-heading">
          Why Choose <em>HPAA Conversion?</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            {
              n: "01",
              t: "Speed of Fielding",
              d: "On-site conversion in a very short period. Civil registration allows ferry flights under standard aviation rules.",
            },
            {
              n: "02",
              t: "Cost Efficiency",
              d: "Base airframes sourced on the open civil market at known prices. Fixed, transparent programme pricing.",
            },
            {
              n: "03",
              t: "Operational Discretion",
              d: "Platforms retain the external appearance of the base civil aircraft.",
            },
            {
              n: "04",
              t: "Global Support",
              d: "Cessna 208 and King Air 350 types supported by service centres on every inhabited continent.",
            },
          ].map((c) => (
            <div key={c.n} className="why-card reveal">
              <div className="why-card-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-eyebrow">Related Services</p>
        <h2 className="section-heading">
          Explore <em>HPAA Capabilities</em>
        </h2>
        <div className="why-grid" style={{ marginTop: "2rem" }}>
          {[
            {
              href: "/autonomous-aircraft-germany",
              t: "Autonomous Aircraft Germany",
              d: "Civil aircraft converted to fully autonomous platforms.",
            },
            {
              href: "/unmanned-aircraft-germany",
              t: "Unmanned Aircraft Germany",
              d: "Civil aircraft converted to fully unmanned aerial systems (UAS).",
            },
            {
              href: "/robot-aircraft-germany",
              t: "Robot Aircraft Germany",
              d: "Robot aircraft conversion for defence and special mission operators.",
            },
            {
              href: "/aircraft",
              t: "Aircraft Catalogue",
              d: "Platform specifications and conversion options.",
            },
          ].map((c) => (
            <div key={c.href} className="why-card reveal">
              <h3>
                <Link href={c.href} style={{ color: "inherit", textDecoration: "none" }}>
                  {c.t}
                </Link>
              </h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
