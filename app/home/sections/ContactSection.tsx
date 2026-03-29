"use client";

import { useState } from "react";
import { siteData } from "@/data/siteData";

function regValue(raw: string | undefined) {
  return raw?.trim() ? raw : "—";
}

function ContactInfoBlock({
  info,
}: {
  info: (typeof siteData.contact.companyInfo)[number];
}) {
  return (
    <div className="contact-info-block">
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
  );
}

type FormStatus = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactFields(input: {
  fullName: string;
  email: string;
  interest: string;
  requirements: string;
}): string | null {
  if (!input.fullName.trim()) {
    return "Please enter your full name.";
  }
  if (!input.email.trim()) {
    return "Please enter your email address.";
  }
  if (!EMAIL_RE.test(input.email.trim())) {
    return "Please enter a valid email address.";
  }
  if (!input.interest.trim()) {
    return "Please enter Aircraft Interest / General Inquiry.";
  }
  if (!input.requirements.trim()) {
    return "Please enter Mission Requirements.";
  }
  return null;
}

export function ContactSection() {
  const section = siteData.contact;
  const b = siteData.brand;

  const [fullName, setFullName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState("");
  const [requirements, setRequirements] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);
    const clientError = validateContactFields({
      fullName,
      email,
      interest,
      requirements,
    });
    if (clientError) {
      setStatus("error");
      setFeedback(clientError);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          org,
          email,
          country,
          interest,
          requirements,
          _hp: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setFeedback("Thank you — your enquiry was sent. We will respond as soon as we can.");
      setFullName("");
      setOrg("");
      setEmail("");
      setCountry("");
      setInterest("");
      setRequirements("");
    } catch {
      setStatus("error");
      setFeedback("Network error. Please check your connection and try again.");
    }
  }

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
          <div className="contact-info-grid">
            <div className="contact-info-col">
              {section.companyInfo.map((info) => (
                <ContactInfoBlock key={info.label} info={info} />
              ))}
            </div>
            <div className="contact-info-col">
              <div className="contact-reg-details" aria-label="Tax and VAT details">
                <div className="contact-info-block">
                  <span className="contact-info-label">Tax number</span>
                  <span className="contact-info-value">{regValue(b.taxNo)}</span>
                </div>
                <div className="contact-info-block">
                  <span className="contact-info-label">VAT ID</span>
                  <span className="contact-info-value">{regValue(b.vatNo)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-right-new">
          <div className="form-heading">{section.form.heading}</div>
          <p className="form-sub">{section.form.sub}</p>
          <form className="form-fields" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="form-honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name <span className="form-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  required
                  aria-required="true"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={status === "sending"}
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="org">
                  Organisation
                </label>
                <input
                  id="org"
                  name="org"
                  type="text"
                  className="form-input"
                  placeholder="Company / Agency"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  disabled={status === "sending"}
                  autoComplete="organization"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span className="form-required" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  required
                  aria-required="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "sending"}
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="country">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  className="form-input"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={status === "sending"}
                  autoComplete="country-name"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="interest">
                Aircraft Interest / General Inquiry
              </label>
              <input
                id="interest"
                name="interest"
                type="text"
                className="form-input"
                placeholder="e.g. Cessna Citation 525B, or open to recommendations"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                disabled={status === "sending"}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="requirements">
                Mission Requirements <span className="form-required" aria-hidden="true">*</span>
              </label>
              <textarea
                id="requirements"
                name="requirements"
                className="form-textarea"
                placeholder="Briefly describe your operational requirements, mission profile, and any specific performance parameters…"
                required
                aria-required="true"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                disabled={status === "sending"}
                rows={5}
              />
            </div>
            <div>
              <button
                className="form-submit"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : section.form.submitLabel}
              </button>
              {feedback ? (
                <p
                  className={`form-feedback ${status === "success" ? "form-feedback--ok" : "form-feedback--err"}`}
                  role="status"
                >
                  {feedback}
                </p>
              ) : null}
              <p className="form-note">{section.form.note}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
