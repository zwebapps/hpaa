"use client";

import Link from "next/link";
import { aircrafts } from "./aircraftData";
import { AircraftImageSlider } from "./AircraftImageSlider";

export function AircraftTabs() {
  // Render all aircraft panels stacked vertically (no tab buttons).
  return (
    <div className="aircraft-wrapper" aria-label="Aircraft platforms list">
      {aircrafts.map((aircraft) => (
        <div key={aircraft.slug} className="aircraft-panel active">
          <div className="aircraft-img-side">
            <AircraftImageSlider images={[...aircraft.images]} altBase={aircraft.name} />
            <div className="aircraft-img-overlay">
              <span className="aircraft-badge-img">Platform Gallery</span>
            </div>
          </div>

          <div className="aircraft-info-side">
            <div className="aircraft-model">{aircraft.name}</div>
            {aircraft.category ? <div className="aircraft-category">{aircraft.category}</div> : null}

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

            {aircraft.description ? <p className="aircraft-desc-text">{aircraft.description}</p> : null}

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link className="btn-gold" href={`/aircraft/${aircraft.slug}`}>
                View Details
              </Link>
              <Link
                className="btn-ghost"
                href="/#contact"
                style={{ color: "var(--navy)", borderColor: "rgba(11,17,32,0.25)" }}
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

