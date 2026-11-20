import Image from "next/image";
import Link from "next/link";
import { HALF_COLUMN_SIZES } from "@/lib/imageSizes";
import { AircraftGallery } from "./AircraftGallery";
import { TrackedLink } from "./TrackedLink";
import { enquiryHref, getAircraftBySlug, type Aircraft } from "./aircraftData";

/**
 * Aircraft detail page body (server component). The base layout (header, gallery,
 * spec table, details) is shared by every aircraft; the rich sections below it
 * render only when the aircraft entry provides the optional fields.
 */
export function AircraftDetailsClient({ slug }: { slug: string }) {
  const aircraft = getAircraftBySlug(slug);
  if (!aircraft) {
    return (
      <main style={{ padding: "6rem 5vw" }}>
        <h1>Aircraft details not found</h1>
        <p>
          Requested slug: <code>{slug}</code>
        </p>
      </main>
    );
  }

  const headerBg = aircraft.images[0] ?? "";
  const isRich = Boolean(aircraft.summary);
  const specHref = enquiryHref(aircraft, "specification sheet & price");
  const conversionHref = enquiryHref(aircraft, "autonomous / optionally piloted conversion");

  return (
    <main className={isRich ? "ac-rich" : undefined}>
      <div className="page-header">
        <div
          className="page-header-bg"
          style={{ backgroundImage: `url('${headerBg}')` }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content">
          <p className="section-eyebrow">{aircraft.subtitle ? aircraft.category : "Aircraft Platform"}</p>
          <h1 className="section-heading">
            {aircraft.subtitle ? (
              <>
                {aircraft.name}{" "}
                <span className="ac-h1-sub">{aircraft.subtitle}</span>
              </>
            ) : (
              <>
                {aircraft.name.split(" ").slice(0, 1).join(" ")}{" "}
                <em>{aircraft.name.replace(/^[^ ]+ /, "") || aircraft.name}</em>
              </>
            )}
          </h1>
        </div>
      </div>

      {aircraft.keyStats?.length ? (
        <dl className="ac-stats" aria-label={`${aircraft.name} key figures`}>
          {aircraft.keyStats.map((s) => (
            <div key={s.label} className="ac-stat">
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <section className="section" style={{ paddingTop: "4rem" }}>
        {aircraft.summary ? (
          <div className="ac-summary">
            <p className="section-lead">{aircraft.summary}</p>
            <div className="ac-cta-row">
              <TrackedLink
                className="btn-gold"
                href={specHref}
                ctaId="spec_sheet"
                ctaPlacement="summary"
                aircraftSlug={aircraft.slug}
              >
                Request spec sheet &amp; price
              </TrackedLink>
              <TrackedLink
                className="btn-ghost ac-btn-ghost-dark"
                href={conversionHref}
                ctaId="autonomous_conversion"
                ctaPlacement="summary"
                aircraftSlug={aircraft.slug}
              >
                Discuss autonomous conversion
              </TrackedLink>
            </div>
          </div>
        ) : aircraft.description ? (
          <p className="section-lead" style={{ marginBottom: "3rem" }}>
            {aircraft.description}
          </p>
        ) : null}

        <div className="ac-detail-grid">
          <div>
            <AircraftGallery images={aircraft.images} altBase={aircraft.name} alts={aircraft.imageAlts} />
          </div>

          <div>
            {aircraft.category && !aircraft.subtitle ? (
              <div className="section-eyebrow" style={{ marginBottom: "1rem" }}>
                {aircraft.category}
              </div>
            ) : null}

            {isRich ? <h2 className="ac-side-heading">At a glance</h2> : null}

            {aircraft.specs.length > 0 ? (
              <table className="spec-table">
                {isRich ? <caption className="sr-only">{aircraft.name} key specifications</caption> : null}
                <tbody>
                  {aircraft.specs.map((row) => (
                    <tr key={row.label}>
                      {isRich ? <th scope="row">{row.label}</th> : <td>{row.label}</td>}
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {aircraft.details.length > 0 ? (
              isRich ? (
                <ul className="ac-highlights">
                  {aircraft.details.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : (
                <div className="aircraft-desc-text" style={{ borderTop: "none", paddingTop: 0 }}>
                  {aircraft.details.map((t, idx) => (
                    <p key={idx} style={{ marginTop: idx === 0 ? 0 : "1rem" }}>
                      {t}
                    </p>
                  ))}
                </div>
              )
            ) : null}

            {!isRich ? (
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
                <Link className="btn-gold" href={enquiryHref(aircraft)}>
                  Enquire About This Aircraft
                </Link>
                <Link className="btn-ghost ac-btn-ghost-dark" href="/aircraft">
                  Back to Platforms
                </Link>
                <Link className="btn-ghost ac-btn-ghost-dark" href="/hpaa-germany">
                  HPAA Germany
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {isRich ? <RichSections aircraft={aircraft} specHref={specHref} conversionHref={conversionHref} /> : null}
    </main>
  );
}

function RichSections({
  aircraft,
  specHref,
  conversionHref,
}: {
  aircraft: Aircraft;
  specHref: string;
  conversionHref: string;
}) {
  return (
    <>
      {aircraft.features?.length ? (
        <section className="section ac-band" aria-labelledby="ac-features-heading">
          <p className="section-eyebrow">Engineering</p>
          <h2 id="ac-features-heading" className="section-heading">
            {aircraft.featuresHeading ?? "Key features"}
          </h2>
          <div className="why-grid ac-grid-3">
            {aircraft.features.map((f, idx) => (
              <div key={f.title} className="why-card">
                <div className="why-card-num" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {aircraft.mediaSections?.map((m, idx) => (
        <section
          key={m.id}
          id={m.id}
          className={`section ac-media${idx % 2 === 1 ? " ac-media--flip" : ""}`}
          aria-labelledby={`${m.id}-heading`}
        >
          <div className="ac-media-text">
            <p className="section-eyebrow">{m.eyebrow}</p>
            <h2 id={`${m.id}-heading`} className="section-heading ac-media-heading">
              {m.title}
            </h2>
            {m.paragraphs.map((p) => (
              <p key={p} className="section-lead">
                {p}
              </p>
            ))}
          </div>
          <div className={`ac-media-images ac-media-images--${Math.min(m.images.length, 3)}`}>
            {m.images.map((img) => (
              <figure key={img.src} className="ac-media-figure">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes={m.images.length > 1 ? "(max-width: 900px) 45vw, 25vw" : HALF_COLUMN_SIZES}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>
      ))}

      {aircraft.specGroups?.length ? (
        <section id="technical-data" className="section ac-band" aria-labelledby="ac-specs-heading">
          <p className="section-eyebrow">Technical data</p>
          <h2 id="ac-specs-heading" className="section-heading">
            {aircraft.name} specifications
          </h2>
          <div className="ac-spec-groups">
            {aircraft.specGroups.map((g) => (
              <table key={g.title} className="spec-table ac-spec-group">
                <caption>{g.title}</caption>
                <tbody>
                  {g.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        </section>
      ) : null}

      {aircraft.useCases?.length ? (
        <section className="section" aria-labelledby="ac-usecases-heading">
          <p className="section-eyebrow">Applications</p>
          <h2 id="ac-usecases-heading" className="section-heading">
            {aircraft.useCasesHeading ?? "Mission roles"}
          </h2>
          <div className="why-grid ac-grid-3">
            {aircraft.useCases.map((u) => (
              <div key={u.title} className="why-card">
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </div>
            ))}
          </div>
          <p className="hpaa-related-links ac-related">
            Related: <Link href="/applications">mission applications</Link> ·{" "}
            <Link href="/unmanned-aircraft-germany">unmanned aircraft Germany</Link> ·{" "}
            <Link href="/drone-aircraft-conversion-germany">drone aircraft conversion</Link> ·{" "}
            <Link href="/hpaa-germany">high-performance autonomous aircraft</Link> ·{" "}
            <Link href="/easa-part-145-mro-germany">EASA Part-145 maintenance</Link>
          </p>
        </section>
      ) : null}

      {aircraft.faq?.length ? (
        <section id="faq" className="section ac-band" aria-labelledby="ac-faq-heading">
          <p className="section-eyebrow">FAQ</p>
          <h2 id="ac-faq-heading" className="section-heading">
            {aircraft.name}: frequently asked <em>questions</em>
          </h2>
          <div className="ac-faq">
            {aircraft.faq.map((item, idx) => (
              <details key={item.question} className="ac-faq-item" open={idx === 0}>
                <summary>
                  <h3>{item.question}</h3>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="hpaa-cta-panel">
          <p className="section-eyebrow" style={{ justifyContent: "center" }}>
            Next step
          </p>
          <h2 className="section-heading">
            Fly it, or fly it <em>autonomously</em>
          </h2>
          <p className="section-lead" style={{ maxWidth: 640, margin: "1.2rem auto 2rem" }}>
            Tell us how you plan to use the {aircraft.name}. We will send you the full specification sheet,
            configuration options and pricing, and arrange a demonstration or a call with our engineers.
          </p>
          <div className="ac-cta-row" style={{ justifyContent: "center" }}>
            <TrackedLink
              className="btn-gold"
              href={specHref}
              ctaId="spec_sheet"
              ctaPlacement="footer_panel"
              aircraftSlug={aircraft.slug}
            >
              Request spec sheet &amp; price
            </TrackedLink>
            <TrackedLink
              className="btn-ghost"
              href={conversionHref}
              ctaId="autonomous_conversion"
              ctaPlacement="footer_panel"
              aircraftSlug={aircraft.slug}
            >
              Discuss autonomous conversion
            </TrackedLink>
            <Link className="btn-ghost" href="/aircraft">
              All platforms
            </Link>
          </div>
        </div>
      </section>

      <div className="ac-sticky-cta">
        <span className="ac-sticky-cta-name">{aircraft.name}</span>
        <TrackedLink
          className="btn-gold"
          href={specHref}
          ctaId="spec_sheet"
          ctaPlacement="sticky_bar"
          aircraftSlug={aircraft.slug}
        >
          Get price
        </TrackedLink>
      </div>
    </>
  );
}
