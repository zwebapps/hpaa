export function ApplicationsSection() {
  return (
    <div id="applications">
      <div className="page-header">
        <div
          className="page-header-bg"
          style={{ backgroundImage: "url('/theme/hpaa3.jpg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content">
          <p className="section-eyebrow">What We Enable</p>
          <h2 className="section-heading">
            Operational <em>Applications</em>
          </h2>
        </div>
      </div>
      <section className="section">
        <p className="section-lead" style={{ marginBottom: "3rem" }}>
          Our customized platforms serve a broad spectrum of operational roles, each tailored to
          the precise requirements of the customer — from ISR to long-range cargo delivery.
        </p>
        <div className="usage-grid">
          <div className="usage-card reveal">
            <div className="usage-card-icon">📷</div>
            <h3>Surveillance & ISR</h3>
            <p>
              Integrated camera and multi-sensor systems for intelligence gathering, border
              monitoring, maritime patrol, and persistent area surveillance over extended missions.
            </p>
          </div>
          <div className="usage-card reveal reveal-delay-1">
            <div className="usage-card-icon">📦</div>
            <h3>Cargo & Delivery</h3>
            <p>
              Transportation and precision delivery of materials and equipment, including
              parachute-assisted airdrop for austere or inaccessible locations.
            </p>
          </div>
          <div className="usage-card reveal reveal-delay-2">
            <div className="usage-card-icon">🛡</div>
            <h3>Defensive Operations</h3>
            <p>
              Platform configuration for deploying countermeasures, electronic warfare payloads,
              and protective system packages for defensive mission sets.
            </p>
          </div>
          <div className="usage-card reveal">
            <div className="usage-card-icon">🚀</div>
            <h3>Range Extension</h3>
            <p>
              Configured as an airborne range extension and launch platform for cruise and
              standoff weapon systems, increasing effective strike radius significantly.
            </p>
          </div>
          <div className="usage-card reveal reveal-delay-1">
            <div className="usage-card-icon">⚡</div>
            <h3>Attritable Platforms</h3>
            <p>
              Low-cost, high-availability platforms configured for expendable missions where loss
              of the aircraft is an acceptable operational outcome.
            </p>
          </div>
          <div className="usage-card reveal reveal-delay-2">
            <div className="usage-card-icon">🎯</div>
            <h3>Counter-UAS</h3>
            <p>
              Detection, tracking, and neutralization of hostile unmanned aerial systems using
              on-board sensor and effector integration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
