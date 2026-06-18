import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import {
  appendToSentFolder,
  buildRawMessage,
  imapConfigured,
} from "@/lib/mailImap";
import { validEmail } from "@/lib/outreachNormalize";

const TEMPLATE_PATH = path.join(
  process.cwd(),
  "marketing",
  "email",
  "outreach-send.html",
);

function escapeHtml(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlToRoughText(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 14000);
}

export function smtpPassword(): string {
  const primary = process.env.SMTP_PASSWORD?.trim();
  const fallback = process.env.SMTP_PASS?.trim();
  return primary || fallback || "";
}

export function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      smtpPassword(),
  );
}

export async function loadOutreachTemplate(): Promise<string> {
  const raw = await readFile(TEMPLATE_PATH, "utf8");
  if (!raw.includes("{{Recipient_Name}}")) {
    throw new Error("Template missing {{Recipient_Name}}");
  }
  return raw;
}

export function fillOutreachTemplate(template: string, recipientName: string) {
  return template.replace(
    /\{\{Recipient_Name\}\}/g,
    escapeHtml(String(recipientName).trim()),
  );
}

function emailFromSenderField(s: string) {
  const trimmed = String(s || "").trim();
  const angle = /<([^>\s]+@[^>\s]+)>/.exec(trimmed);
  return angle ? angle[1].trim() : trimmed;
}

function createTransporter() {
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST!.trim(),
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER!.trim(),
      pass: smtpPassword(),
    },
  });
}

export function outreachFromAddress(): string {
  return (
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    `HPAA | Robot Aircraft Germany <${process.env.SMTP_USER!.trim()}>`
  );
}

export function outreachSubjectBase(): string {
  return (
    process.env.OUTREACH_SUBJECT?.trim() ||
    "High-Performance Autonomous Aircraft (HPAA) Solutions"
  );
}

export async function sendOutreachEmail(options: {
  to: string;
  recipientName: string;
  test?: boolean;
}) {
  if (!smtpConfigured()) {
    throw new Error("SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASSWORD).");
  }

  const template = await loadOutreachTemplate();
  const html = fillOutreachTemplate(template, options.recipientName);
  const subjectBase = outreachSubjectBase();
  const subject = options.test ? `[TEST] ${subjectBase}` : subjectBase;
  const from = outreachFromAddress();
  const to = options.to.trim();
  const mailOptions = {
    from,
    to,
    subject,
    text: `Outreach (plain text preview).\n\n${htmlToRoughText(html)}`,
    html,
  };

  const raw = await buildRawMessage(mailOptions);
  const fromEmail = emailFromSenderField(from);
  if (!validEmail(fromEmail)) {
    throw new Error("CONTACT_FROM_EMAIL or SMTP_USER must contain a valid From address.");
  }

  const transporter = createTransporter();
  const info = await transporter.sendMail({
    envelope: { from: fromEmail, to: [to] },
    raw,
  });

  if (imapConfigured()) {
    try {
      await appendToSentFolder(raw);
    } catch (err) {
      console.warn(
        "Outreach sent via SMTP but IMAP Sent append failed:",
        err instanceof Error ? err.message : err,
      );
    }
  }

  return { messageId: info.messageId || "", subject };
}

export async function delayMs(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}
