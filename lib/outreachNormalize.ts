const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

export function validEmail(s: string): boolean {
  return EMAIL_RE.test(String(s || "").trim());
}

export function slugifyCompanyId(s: string): string {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function firstEmail(contactInfo: string): string {
  const m = EMAIL_RE.exec(String(contactInfo || ""));
  return m ? m[0] : "";
}

function phoneFromContactInfo(contactInfo: string): string {
  const s = String(contactInfo || "");
  const pipe = s.split("|").map((p) => p.trim());
  for (const part of pipe) {
    if (part && !EMAIL_RE.test(part)) return part;
  }
  const tel = /\+?[\d][\d\s().-]{6,}/.exec(s);
  return tel ? tel[0].trim() : "";
}

export type OutreachSentStatus = "yes" | "no" | "unset";

export function parseSentStatus(row: Record<string, unknown>): OutreachSentStatus {
  const raw = row.sent ?? row.status ?? row.sent_status;
  if (raw === undefined || raw === null || String(raw).trim() === "") {
    if (row.sent_at || row.sentAt) return "yes";
    return "unset";
  }
  const sent = String(raw).trim().toLowerCase();
  if (["yes", "y", "true", "1", "sent", "done"].includes(sent)) return "yes";
  if (["no", "n", "false", "0", "pending", "unsent"].includes(sent)) return "no";
  return "unset";
}

export type OutreachCompanyRecord = {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  city: string;
  headquarters: string;
  sentAt: Date | null;
  lastMessageId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type NormalizedExcelRow = Omit<OutreachCompanyRecord, "createdAt" | "updatedAt"> & {
  sentStatus: OutreachSentStatus;
};

export function normalizeExcelRow(
  row: Record<string, unknown>,
  index: number,
): NormalizedExcelRow | null {
  const companyName = String(
    row.company_name ?? row.company ?? row.name ?? row.Name ?? "",
  ).trim();
  const email =
    String(row.email ?? row.Email ?? "").trim() ||
    firstEmail(String(row.contact_info ?? ""));

  if (!companyName || !validEmail(email)) return null;

  const country = String(row.country ?? row.Country ?? "").trim();
  const city = String(row.city ?? row.City ?? "").trim();
  const headquarters =
    String(row.headquarters ?? row.Headquarters ?? "").trim() ||
    [city, country].filter(Boolean).join(", ") ||
    String(row.address ?? row.Address ?? "").trim();

  const id =
    String(row.id ?? "").trim() || slugifyCompanyId(companyName) || `row-${index + 1}`;

  const sentStatus = parseSentStatus(row);
  let sentAt: Date | null = null;
  if (sentStatus === "yes") {
    const raw = row.sent_at ?? row.sentAt;
    sentAt = raw ? new Date(String(raw)) : new Date();
    if (Number.isNaN(sentAt.getTime())) sentAt = new Date();
  }

  return {
    id,
    company_name: companyName,
    email: email.toLowerCase(),
    phone:
      String(row.phone ?? row.Phone ?? "").trim() ||
      phoneFromContactInfo(String(row.contact_info ?? "")),
    website: String(row.website ?? row.Website ?? "").trim(),
    country,
    city,
    headquarters,
    sentAt,
    sentStatus,
    lastMessageId: null,
  };
}
