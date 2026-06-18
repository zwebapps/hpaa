/**
 * Sends outreach using the single template marketing/email/outreach-send.html
 * (only {{Recipient_Name}} is substituted per row).
 *
 * Test inbox (does not mail list addresses):
 *   npm run outreach:send-test
 *   → uses first JSON row for the salutation, delivers to OUTREACH_TEST_TO (default zdev1989@gmail.com)
 *
 * Production (each row.email — explicit flag only):
 *   npm run outreach:send-bulk
 *
 * Requires Node 20.6+ for --env-file=.env, or export SMTP_* / CONTACT_FROM_EMAIL manually.
 *
 * Sent archive (IMAP): After each SMTP send, appends the message to the mailbox Sent folder.
 *   Uses IMAP_HOST (defaults from SMTP_HOST: smtp.* → imap.*), IMAP_PORT (993), IMAP_USER, IMAP_PASSWORD.
 *   Falls back to SMTP_USER / SMTP_PASSWORD when IMAP credentials are omitted.
 *   IMAP_SENT_FOLDER — override Sent folder path (auto-detected when omitted).
 *   OUTREACH_IMAP_ARCHIVE=false — disable Sent-folder archiving.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import {
  appendToSentFolder,
  buildRawMessage,
  imapArchiveDisabled,
  imapConfigured,
} from "./lib/mail-imap.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TEMPLATE = path.join(root, "marketing", "email", "outreach-send.html");
const DATA = path.join(root, "marketing", "data", "outreach-recipients.json");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validEmail(s) {
  return EMAIL_RE.test(String(s || "").trim());
}

function smtpPassword() {
  const primary = process.env.SMTP_PASSWORD?.trim();
  const fallback = process.env.SMTP_PASS?.trim();
  return primary || fallback || "";
}

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      smtpPassword(),
  );
}

function htmlToRoughText(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 14000);
}

function fillTemplate(name) {
  const raw = fs.readFileSync(TEMPLATE, "utf8");
  if (!raw.includes("{{Recipient_Name}}")) {
    throw new Error("Template missing {{Recipient_Name}}");
  }
  return raw.replace(/\{\{Recipient_Name\}\}/g, escapeHtml(String(name).trim()));
}

/** Email inside angle brackets from a From-style string, else the trimmed string. */
function emailFromSenderField(s) {
  const trimmed = String(s || "").trim();
  const angle = /<([^>\s]+@[^>\s]+)>/.exec(trimmed);
  return angle ? angle[1].trim() : trimmed;
}

async function sendOne(transporter, from, to, subject, html) {
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

  const info = await transporter.sendMail({
    envelope: { from: fromEmail, to: [String(to).trim()] },
    raw,
  });

  if (imapConfigured()) {
    try {
      await appendToSentFolder(raw);
    } catch (err) {
      console.warn(
        "Sent via SMTP but IMAP Sent append failed:",
        err instanceof Error ? err.message : err,
      );
    }
  }

  return info;
}

async function main() {
  const bulk = process.argv.includes("--bulk");
  const testTo = (process.env.OUTREACH_TEST_TO || "zdev1989@gmail.com").trim();

  if (!smtpConfigured()) {
    console.error(
      "Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD (or SMTP_PASS), and CONTACT_FROM_EMAIL in .env",
    );
    process.exit(1);
  }

  if (!fs.existsSync(TEMPLATE) || !fs.existsSync(DATA)) {
    console.error("Missing:", TEMPLATE, "or", DATA);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const recipients = Array.isArray(raw.recipients) ? raw.recipients : [];
  const valid = recipients.filter(
    (r) => String(r.name || "").trim() && validEmail(r.email),
  );
  if (valid.length === 0) {
    console.error("No recipients with name + valid email in outreach-recipients.json");
    process.exit(1);
  }

  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST.trim(),
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass: smtpPassword(),
    },
  });

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    `HPAA | Robot Aircraft Germany <${process.env.SMTP_USER.trim()}>`;

  const subjectBase =
    process.env.OUTREACH_SUBJECT?.trim() || "High-Performance Autonomous Aircraft (HPAA) Solutions";

  if (imapConfigured()) {
    console.log("IMAP Sent archive enabled (", process.env.IMAP_HOST?.trim() || "derived from SMTP_HOST", ")");
  } else if (!imapArchiveDisabled()) {
    console.warn("IMAP Sent archive unavailable: set IMAP_HOST or SMTP_HOST plus mailbox credentials.");
  }

  if (!bulk) {
    if (!validEmail(testTo)) {
      console.error("Invalid OUTREACH_TEST_TO:", testTo);
      process.exit(1);
    }
    console.log("Valid:>>>>>", valid);
    const row = valid[0];
    const name =
      (process.env.OUTREACH_TEST_NAME || "").trim() || String(row.name).trim();
    const html = fillTemplate(name);
    const subject = `[TEST] ${subjectBase}`;
    const info = await sendOne(transporter, from, testTo, subject, html);
    console.log("Test sent to", testTo);
    console.log("Salutation name:", name, "(list row:", row.email, ")");
    console.log("MessageId:", info.messageId);
    return;
  }

  for (const row of valid) {
    const name = String(row.name).trim();
    const html = fillTemplate(name);
    const subject = subjectBase;
    const info = await sendOne(transporter, from, row.email.trim(), subject, html);
    console.log("Sent to", row.email, "—", name, info.messageId);
    await new Promise((r) => setTimeout(r, Number(process.env.OUTREACH_DELAY_MS) || 1500));
  }
  console.log("Bulk complete:", valid.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
