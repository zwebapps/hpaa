"use client";

import { AircraftGallery } from "./AircraftGallery";
import { getAircraftBySlug } from "./aircraftData";

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

  return (
    <main>
      <div className="page-header">
        <div
          className="page-header-bg"
          style={{ backgroundImage: `url('${headerBg}')` }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content">
          <p className="section-eyebrow">Aircraft Platform</p>
          <h2 className="section-heading">
            {aircraft.name.split(" ").slice(0, 1).join(" ")}{" "}
            <em>{aircraft.name.replace(/^[^ ]+ /, "") || aircraft.name}</em>
          </h2>
        </div>
      </div>

      <section className="section" style={{ paddingTop: "4rem" }}>
        {aircraft.description ? (
          <p className="section-lead" style={{ marginBottom: "3rem" }}>
            {aircraft.description}
          </p>
        ) : null}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          <div>
            <AircraftGallery images={aircraft.images} altBase={aircraft.name} />
          </div>

          <div>
            {aircraft.category ? (
              <div className="section-eyebrow" style={{ marginBottom: "1rem" }}>
                {aircraft.category}
              </div>
            ) : null}

            {aircraft.specs.length > 0 ? (
              <table className="spec-table">
                <tbody>
                  {aircraft.specs.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {aircraft.details.length > 0 ? (
              <div className="aircraft-desc-text" style={{ borderTop: "none", paddingTop: 0 }}>
                {aircraft.details.map((t, idx) => (
                  <p key={idx} style={{ marginTop: idx === 0 ? 0 : "1rem" }}>
                    {t}
                  </p>
                ))}
              </div>
            ) : null}

            <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn-gold" href="/#contact">
                Enquire About This Aircraft
              </a>
              <a
                className="btn-ghost"
                href="/#aircraft"
                style={{ color: "var(--navy)", borderColor: "rgba(11,17,32,0.25)" }}
              >
                Back to Platforms
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

