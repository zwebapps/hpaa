export function PartnersSection() {
  return (
    <div id="partners">
      <div className="page-header">
        <div
          className="page-header-bg"
          style={{ backgroundImage: "url('/theme/hpaa4.jpg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content">
          <p className="section-eyebrow">Our Network</p>
          <h2 className="section-heading">
            Partners &amp; <em>Expertise</em>
          </h2>
        </div>
      </div>
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <p className="section-lead" style={{ maxWidth: "100%" }}>
          Our strength lies in a carefully assembled network of certified technical partners,
          academic institutions, and aviation specialists — ensuring every platform meets the
          highest engineering and regulatory standards.
        </p>
      </section>
      <div className="partner-strip" style={{ marginBottom: "5rem" }}>
        <div className="partner-card-new partner-row reveal">
          <img
            src="/theme/hpaa1.jpg"
            alt="Part One-Forty Five GmbH"
            className="partner-card-img"
          />
          <div className="partner-card-body">
            <div className="partner-label">Certified Maintenance & Repair Organisation</div>
            <div className="partner-title">Part One-Forty Five GmbH</div>
            <div className="partner-role">
              EASA Part-145 Certified · Neuhausen ob Eck Airfield · Patrick Köpfer
            </div>
            <p className="partner-text">
              An authorized EASA PART-145 maintenance and repair organisation specializing in
              turbine-powered turboprops and jets. Provides the certified technical backbone for
              all conversion, maintenance, and airworthiness activities across the programme.
            </p>
          </div>
        </div>
        <div className="partner-card-new partner-row reverse reveal reveal-delay-1">
          <div className="partner-card-body">
            <div className="partner-label">Academic Partner</div>
            <div className="partner-title">University of Stuttgart</div>
            <div className="partner-role">
              Institute of Flight Mechanics &amp; Control (iFR) · Prof. Dr. Walter Fichter
            </div>
            <p className="partner-text">
              The iFR specializes in guidance, control, and navigation of aerospace vehicles. Their
              Cirrus SR22 (D-EXPT) serves as the autonomous flight demonstration platform, bridging
              academic research with real-world application.
            </p>
          </div>
          <img src="/theme/hpaa7.jpg" alt="University of Stuttgart" className="partner-card-img" />
        </div>
        <div className="partner-card-new partner-row reveal">
          <img src="/theme/hpaa6.jpg" alt="KUM Services GmbH" className="partner-card-img" />
          <div className="partner-card-body">
            <div className="partner-label">Lead Integrator</div>
            <div className="partner-title">KUM Services GmbH</div>
            <div className="partner-role">Konstanz, Germany · Programme Management & Delivery</div>
            <p className="partner-text">
              Prime contractor responsible for end-to-end project management, system integration,
              and customer delivery. Located at Haltnauer Weg 17, D-78464 Konstanz. Direct contact:
              +49 172 387 5262 · info@kum-trading.consulting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
