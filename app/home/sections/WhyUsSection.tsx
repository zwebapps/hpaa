export function WhyUsSection() {
  return (
    <div id="why-us">
      <div className="page-header">
        <div
          className="page-header-bg"
          style={{ backgroundImage: "url('/theme/hpaa1.jpg')" }}
          aria-hidden="true"
        />
        <div className="page-header-scrim" />
        <div className="page-header-content">
          <p className="section-eyebrow">The Case for Customization</p>
          <h2 className="section-heading">
            Why Choose
            <br />
            <em>KUM Services?</em>
          </h2>
        </div>
      </div>

      <section className="section" style={{ paddingBottom: "3rem" }}>
        <p className="section-lead" style={{ maxWidth: "100%" }}>
          Off-the-shelf solutions rarely satisfy demanding operational requirements. Bespoke
          platforms built on proven civil airframes deliver superior value, faster deployment, and
          genuine operational fit.
        </p>
        <div className="why-grid">
          <div className="why-card reveal">
            <div className="why-card-num">01</div>
            <h3>Established Reliability</h3>
            <p>
              Every platform we convert has accumulated thousands of verified flight hours. You
              inherit decades of engineering validation, approved designs, and a globally trusted
              maintenance ecosystem from day one.
            </p>
          </div>
          <div className="why-card reveal reveal-delay-1">
            <div className="why-card-num">02</div>
            <h3>Rapid Time-to-Operation</h3>
            <p>
              Aircraft retain civil registration and can be ferried directly to your location by
              pilots. The conversion process takes just one to two days on-site — no special
              permits, no lengthy approvals, no delays.
            </p>
          </div>
          <div className="why-card reveal reveal-delay-2">
            <div className="why-card-num">03</div>
            <h3>Significant Cost Savings</h3>
            <p>
              Eliminating ground-up design and development slashes program costs dramatically.
              Worldwide parts availability and accessible technical personnel ensure long-term
              operating costs remain competitive.
            </p>
          </div>
          <div className="why-card reveal reveal-delay-3">
            <div className="why-card-num">04</div>
            <h3>Operational Flexibility</h3>
            <p>
              Our approach is not limited to any single airframe or mission type. From light
              single-engine turboprops to heavy transports, we identify and configure the right
              platform for your precise requirements.
            </p>
          </div>
        </div>
      </section>

      <div className="callout-strip reveal">
        <div className="callout-img">
          <img src="/theme/hpaa6.jpg" alt="King Air 350" />
          <div className="callout-img-overlay" />
        </div>
        <div className="callout-text">
          <p className="section-eyebrow">Key Advantage</p>
          <h3 className="callout-heading">
            Not Identifiable.
            <br />
            <em>Fully Capable.</em>
          </h3>
          <p className="callout-body">
            Converted platforms maintain the external appearance of standard civil aircraft. They
            remain on civil registers, can be operated worldwide with standard flight procedures,
            and require no special authority clearance for ferry flights — providing significant
            operational advantage.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <a className="btn-gold" href="/#aircraft">
              View Platforms →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
