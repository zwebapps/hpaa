import { ImapFlow } from "imapflow";
import MailComposer from "nodemailer/lib/mail-composer";

function imapHost(): string {
  const explicit = process.env.IMAP_HOST?.trim();
  if (explicit) return explicit;

  const smtp = process.env.SMTP_HOST?.trim();
  if (smtp?.startsWith("smtp.")) return smtp.replace(/^smtp\./, "imap.");
  return smtp || "";
}

function imapPassword(): string {
  return (
    process.env.IMAP_PASSWORD?.trim() ||
    process.env.IMAP_PASS?.trim() ||
    process.env.SMTP_PASSWORD?.trim() ||
    process.env.SMTP_PASS?.trim() ||
    ""
  );
}

function imapUser(): string {
  return process.env.IMAP_USER?.trim() || process.env.SMTP_USER?.trim() || "";
}

export function imapArchiveDisabled(): boolean {
  const v = process.env.OUTREACH_IMAP_ARCHIVE?.trim().toLowerCase();
  return v === "false" || v === "0" || v === "off" || v === "no";
}

export function imapConfigured(): boolean {
  if (imapArchiveDisabled()) return false;
  return Boolean(imapHost() && imapUser() && imapPassword());
}

function imapClientOptions() {
  const port = parseInt(process.env.IMAP_PORT || "993", 10);
  const secure =
    process.env.IMAP_SECURE?.trim().toLowerCase() !== "false" && port === 993;

  return {
    host: imapHost(),
    port,
    secure,
    auth: {
      user: imapUser(),
      pass: imapPassword(),
    },
    logger: false as const,
  };
}

export function buildRawMessage(
  mailOptions: Record<string, unknown>,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const composer = new MailComposer(mailOptions);
    const node = composer.compile();
    const stream = node.createReadStream();
    const chunks: Buffer[] = [];

    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

async function resolveSentMailbox(client: ImapFlow): Promise<string> {
  const configured = process.env.IMAP_SENT_FOLDER?.trim();
  if (configured) return configured;

  const boxes = await client.list();
  for (const box of boxes) {
    if (box.specialUse?.toLowerCase().includes("\\sent")) {
      return box.path;
    }
    const lower = box.path.toLowerCase();
    if (
      lower === "sent" ||
      lower.endsWith("/sent") ||
      lower.endsWith(".sent") ||
      lower.includes("gesendet")
    ) {
      return box.path;
    }
  }

  return "Sent";
}

export async function appendToSentFolder(raw: Buffer): Promise<void> {
  if (!imapConfigured()) return;

  const client = new ImapFlow(imapClientOptions());
  try {
    await client.connect();
    const mailbox = await resolveSentMailbox(client);
    await client.append(mailbox, raw, ["\\Seen"], new Date());
  } finally {
    try {
      await client.logout();
    } catch {
      client.close();
    }
  }
}
