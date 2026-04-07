import nodemailer from "nodemailer";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const LIMITS = {
  fullName: 200,
  org: 200,
  email: 320,
  country: 120,
  interest: 500,
  requirements: 8000,
} as const;

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const THEME = {
  navy: "#0b1120",
  cream: "#f8f5ef",
  gold: "#b8965a",
  goldPale: "#f0e4cc",
  slate: "#4a5568",
  slateLight: "#718096",
} as const;

type CustomerConfirmationInput = {
  fullName: string;
  org: string;
  email: string;
  country: string;
  interest: string;
  requirements: string;
};

function buildQuotedSubmission(p: CustomerConfirmationInput): string {
  const lines = [
    `Aircraft Interest / General Inquiry: ${p.interest}`,
    "",
    "Mission Requirements:",
    p.requirements,
  ];
  if (p.org.trim()) lines.push("", `Organisation: ${p.org}`);
  if (p.country.trim()) lines.push(`Country: ${p.country}`);
  return lines.join("\n").trim();
}

function buildCustomerConfirmation(p: CustomerConfirmationInput) {
  const subject = "We received your enquiry — HPAA";
  const submission = buildQuotedSubmission(p);
  const safeForQuotes = submission.replace(/"/g, "”");

  const text = [
    `Dear ${p.fullName},`,
    "",
    "This is an automatic reply to confirm we have received your message.",
    "",
    "Our team will get in contact with you shortly.",
    "",
    "Your message (as submitted):",
    "",
    `"${safeForQuotes}"`,
    "",
    "If you did not submit this request, you can ignore this email.",
    "",
    "Kind regards,",
    "KUM Services GmbH",
  ].join("\n");

  const submissionHtml = escapeHtml(submission).replace(/\n/g, "<br />");

  const html = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8e4dc;border-collapse:collapse;">
  <tr>
    <td align="center" style="padding:28px 16px;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;border-collapse:collapse;background-color:${THEME.cream};border:1px solid rgba(11,17,32,0.1);box-shadow:0 4px 24px rgba(11,17,32,0.06);">
        <tr>
          <td style="background-color:${THEME.navy};padding:22px 28px;border-bottom:3px solid ${THEME.gold};">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:400;letter-spacing:0.06em;color:${THEME.cream};">HPAA</p>
            <p style="margin:10px 0 0;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${THEME.gold};">High Performance Autonomous Aircraft</p>
            <p style="margin:14px 0 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(248,245,239,0.75);">KUM Services GmbH</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 28px 8px;font-size:15px;line-height:1.65;color:${THEME.slate};">
            <p style="margin:0 0 18px;">Dear ${escapeHtml(p.fullName)},</p>
            <p style="margin:0 0 14px;">This is an <strong style="color:${THEME.navy};font-weight:600;">automatic reply</strong> to confirm we have received your message.</p>
            <p style="margin:0 0 22px;">Our team will get in contact with you shortly.</p>
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${THEME.gold};">Your message</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="background-color:${THEME.goldPale};border-left:4px solid ${THEME.gold};padding:18px 20px;font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.6;color:${THEME.navy};">
                  <span style="color:${THEME.gold};font-size:26px;line-height:0;vertical-align:-3px;font-family:Georgia,serif;">&ldquo;</span><span style="font-family:Georgia,'Times New Roman',serif;">${submissionHtml}</span><span style="color:${THEME.gold};font-size:26px;line-height:0;vertical-align:-3px;font-family:Georgia,serif;">&rdquo;</span>
                </td>
              </tr>
            </table>
            <p style="margin:22px 0 0;font-size:13px;line-height:1.55;color:${THEME.slateLight};">If you did not submit this request, you can ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 28px;font-size:14px;line-height:1.6;color:${THEME.slate};">
            <p style="margin:0;">Kind regards,<br /><strong style="color:${THEME.navy};">KUM Services GmbH</strong></p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.trim();

  return { subject, text, html };
}

/** Prefer SMTP_PASSWORD; SMTP_PASS is a fallback when the shell sets SMTP_PASSWORD="" (Next.js will not override). */
function smtpPassword(): string {
  const primary = process.env.SMTP_PASSWORD?.trim();
  const fallback = process.env.SMTP_PASS?.trim();
  return primary || fallback || "";
}

function smtpConfigured(): boolean {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = smtpPassword();
  return Boolean(host && user && pass);
}

function logSmtpNotConfigured(): void {
  const missing: string[] = [];
  if (!process.env.SMTP_HOST?.trim()) missing.push("SMTP_HOST");
  if (!process.env.SMTP_USER?.trim()) missing.push("SMTP_USER");
  if (!smtpPassword()) missing.push("SMTP_PASSWORD or SMTP_PASS");
  if (process.env.SMTP_PASSWORD === "" && !smtpPassword()) {
    console.error(
      "contact: SMTP_PASSWORD is empty in process.env (often exported in the shell). Run `unset SMTP_PASSWORD` or set SMTP_PASS in .env instead.",
    );
  }
  console.error(
    "contact: set SMTP_* (host, user, password) or RESEND_API_KEY. Missing:",
    missing.join(", ") || "(unknown)",
  );
}

function resendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function POST(req: Request) {
  const to = process.env.CONTACT_TO_EMAIL?.trim();

  if (!to) {
    console.error("contact: set CONTACT_TO_EMAIL");
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  if (!smtpConfigured() && !resendConfigured()) {
    logSmtpNotConfigured();
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (trim(body._hp)) {
    return NextResponse.json({ ok: true });
  }

  const fullName = trim(body.fullName).slice(0, LIMITS.fullName);
  const org = trim(body.org).slice(0, LIMITS.org);
  const email = trim(body.email).slice(0, LIMITS.email);
  const country = trim(body.country).slice(0, LIMITS.country);
  const interest = trim(body.interest).slice(0, LIMITS.interest);
  const requirements = trim(body.requirements).slice(0, LIMITS.requirements);

  if (!fullName || !email || !interest || !requirements) {
    return NextResponse.json(
      {
        error:
          "Full name, email, Aircraft Interest / General Inquiry, and Mission Requirements are required.",
      },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const text = [
    "New enquiry from the HPAA website",
    "",
    `Name: ${fullName}`,
    `Organisation: ${org || "—"}`,
    `Email: ${email}`,
    `Country: ${country || "—"}`,
    `Aircraft Interest / General Inquiry: ${interest || "—"}`,
    "",
    "Mission requirements:",
    requirements || "—",
  ].join("\n");

  const html = `<pre style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;white-space:pre-wrap">${escapeHtml(text)}</pre>`;

  const subject = `[HPAA] Enquiry from ${fullName}`;
  const customerMail = buildCustomerConfirmation({
    fullName,
    org,
    email,
    country,
    interest,
    requirements,
  });

  try {
    if (smtpConfigured()) {
      const port = parseInt(process.env.SMTP_PORT || "587", 10);
      const secure =
        process.env.SMTP_SECURE === "true" || port === 465;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST!.trim(),
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER!.trim(),
          pass: smtpPassword(),
        },
      });

      const from =
        process.env.CONTACT_FROM_EMAIL?.trim() ||
        `High Performance Autonomous Aircraft KUM Services GmbH <${process.env.SMTP_USER!.trim()}>`;

      const info = await transporter.sendMail({
        from,
        to,
        replyTo: email,
        subject,
        text,
        html,
      });

      await transporter.sendMail({
        from,
        to: email,
        replyTo: to,
        subject: customerMail.subject,
        text: customerMail.text,
        html: customerMail.html,
      });

      return NextResponse.json({ ok: true, id: info.messageId });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email delivery is not configured." },
        { status: 503 },
      );
    }
    const from =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      "High Performance Autonomous Aircraft KUM Services GmbH <onboarding@resend.dev>";

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again later." },
        { status: 502 },
      );
    }

    const { error: customerErr } = await resend.emails.send({
      from,
      to: [email],
      replyTo: to,
      subject: customerMail.subject,
      text: customerMail.text,
      html: customerMail.html,
    });

    if (customerErr) {
      console.error("Resend (customer confirmation):", customerErr);
      return NextResponse.json(
        { error: "Could not send your message. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("contact send:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 },
    );
  }
}
