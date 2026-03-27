"use client";

export function ContactSection() {
  return (
    <div id="contact">
      <div className="contact-wrapper">
        <div
          className="contact-left-new"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(11,17,32,0.88), rgba(11,17,32,0.88)), url('/theme/hpaa5.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="section-eyebrow">Start a Conversation</p>
          <h2 className="section-heading">
            Request a<br />
            <em>Proposal</em>
          </h2>
          <p className="section-lead">
            Describe your operational needs and we will prepare a tailored aircraft recommendation
            with full technical specification and commercial terms.
          </p>
          <div className="contact-info-blocks">
            <div className="contact-info-block">
              <span className="contact-info-label">Company</span>
              <span className="contact-info-value">KUM Services GmbH</span>
            </div>
            <div className="contact-info-block">
              <span className="contact-info-label">Address</span>
              <span className="contact-info-value">
                Haltnauer Weg 17
                <br />
                D-78464 Konstanz, Germany
              </span>
            </div>
            <div className="contact-info-block">
              <span className="contact-info-label">Phone</span>
              <span className="contact-info-value">
                <a href="tel:+491723875262">+49 172 387 5262</a>
              </span>
            </div>
            <div className="contact-info-block">
              <span className="contact-info-label">Email</span>
              <span className="contact-info-value">
                <a href="mailto:info@kum-trading.consulting">info@kum-trading.consulting</a>
              </span>
            </div>
          </div>
        </div>
        <div className="contact-right-new">
          <div className="form-heading">Send an Enquiry</div>
          <p className="form-sub">
            All enquiries are handled with strict confidentiality. We typically respond within one
            business day.
          </p>
          <form className="form-fields" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name
                </label>
                <input id="fullName" type="text" className="form-input" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="org">
                  Organisation
                </label>
                <input
                  id="org"
                  type="text"
                  className="form-input"
                  placeholder="Company / Agency"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="country">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  className="form-input"
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="interest">
                Aircraft Interest
              </label>
              <input
                id="interest"
                type="text"
                className="form-input"
                placeholder="e.g. Cessna Citation 525B, or open to recommendations"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="requirements">
                Mission Requirements
              </label>
              <textarea
                id="requirements"
                className="form-textarea"
                placeholder="Briefly describe your operational requirements, mission profile, and any specific performance parameters…"
              />
            </div>
            <div>
              <button className="form-submit" type="submit">
                Submit Enquiry →
              </button>
              <p className="form-note">
                Your information is treated with complete confidentiality and will not be shared
                with third parties.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
