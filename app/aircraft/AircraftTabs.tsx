"use client";

import Link from "next/link";
import { aircrafts } from "./aircraftData";
import { AircraftImageSlider } from "./AircraftImageSlider";

const postImages = ["/theme/hpaa4.jpg", "/theme/hpaa3.jpg", "/theme/hpaa2.jpg"] as const;

export function AircraftTabs() {
  // Render all aircraft panels stacked vertically (no tab buttons).
  return (
    <div className="aircraft-wrapper" aria-label="Aircraft platforms list">
      {aircrafts.map((aircraft) => (
        <div key={aircraft.slug} className="aircraft-panel active">
          <div className="aircraft-img-side">
            <AircraftImageSlider images={[...postImages]} altBase={aircraft.name} />
            <div className="aircraft-img-overlay">
              <span className="aircraft-badge-img">Platform Gallery</span>
            </div>
          </div>

          <div className="aircraft-info-side">
            <div className="aircraft-model">{aircraft.name}</div>
            <div className="aircraft-category">{aircraft.category}</div>

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

            <p className="aircraft-desc-text">{aircraft.description}</p>

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

