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

function smtpConfigured(): boolean {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();
  return Boolean(host && user && pass);
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
    console.error("contact: set SMTP_* (host, user, password) or RESEND_API_KEY");
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

  if (!fullName || !email) {
    return NextResponse.json(
      { error: "Full name and email are required." },
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
    `Aircraft interest: ${interest || "—"}`,
    "",
    "Mission requirements:",
    requirements || "—",
  ].join("\n");

  const html = `<pre style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;white-space:pre-wrap">${escapeHtml(text)}</pre>`;

  const subject = `[HPAA] Enquiry from ${fullName}`;

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
          pass: process.env.SMTP_PASSWORD!.trim(),
        },
      });

      const from =
        process.env.CONTACT_FROM_EMAIL?.trim() ||
        `HPAA Website <${process.env.SMTP_USER!.trim()}>`;

      const info = await transporter.sendMail({
        from,
        to,
        replyTo: email,
        subject,
        text,
        html,
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
      "HPAA Website <onboarding@resend.dev>";

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

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("contact send:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 },
    );
  }
}
