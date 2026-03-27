"use client";

import { siteData } from "@/data/siteData";

export function ContactSection() {
  const section = siteData.contact;

  return (
    <div id="contact">
      <div className="contact-wrapper">
        <div
          className="contact-left-new"
          style={{
            backgroundImage:
              `linear-gradient(180deg, rgba(11,17,32,0.88), rgba(11,17,32,0.88)), url('${section.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="section-eyebrow">{section.eyebrow}</p>
          <h2 className="section-heading">
            {section.title.pre}
            <br />
            <em>{section.title.emphasis}</em>
          </h2>
          <p className="section-lead">{section.lead}</p>
          <div className="contact-info-blocks">
            {section.companyInfo.map((info) => (
              <div key={info.label} className="contact-info-block">
                <span className="contact-info-label">{info.label}</span>
                <span className="contact-info-value">
                  {"valueLines" in info && info.valueLines
                    ? info.valueLines.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))
                    : info.href && info.value
                      ? <a href={info.href}>{info.value}</a>
                      : info.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="contact-right-new">
          <div className="form-heading">{section.form.heading}</div>
          <p className="form-sub">{section.form.sub}</p>
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
                {section.form.submitLabel}
              </button>
              <p className="form-note">{section.form.note}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
