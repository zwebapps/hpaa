/**
 * Normalizes older_companies.json (mixed schemas), sorts A→Z by company name,
 * writes sorted JSON + marketing/data/older_companies.xlsx
 *
 *   npm run outreach:export-companies
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const JSON_PATH = path.join(root, "marketing", "data", "older_companies.json");
const XLSX_PATH = path.join(root, "marketing", "data", "older_companies.xlsx");

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function firstEmail(contactInfo) {
  const m = EMAIL_RE.exec(String(contactInfo || ""));
  return m ? m[0] : "";
}

function phoneFromContactInfo(contactInfo) {
  const s = String(contactInfo || "");
  const pipe = s.split("|").map((p) => p.trim());
  for (const part of pipe) {
    if (part && !EMAIL_RE.test(part)) return part;
  }
  const tel = /\+?[\d][\d\s().-]{6,}/.exec(s);
  return tel ? tel[0].trim() : "";
}

function normalizeRow(row, index) {
  const companyName = String(row.company_name || row.name || "").trim();
  const country = String(row.country || "").trim();
  const city = String(row.city || "").trim();
  const headquarters =
    String(row.headquarters || "").trim() ||
    [city, country].filter(Boolean).join(", ") ||
    String(row.address || "").trim();

  const email = String(row.email || "").trim() || firstEmail(row.contact_info);
  const phone =
    String(row.phone || "").trim() || phoneFromContactInfo(row.contact_info);

  return {
    id: String(row.id || slugify(companyName) || `row-${index + 1}`).trim(),
    company_name: companyName,
    email,
    phone,
    website: String(row.website || "").trim(),
    country,
    city,
    address: String(row.address || "").trim(),
    headquarters,
    category: String(row.category || "").trim(),
    primary_contact_role: String(row.primary_contact_role || "").trim(),
    contact_info: String(row.contact_info || "").trim(),
    lead_reason: String(row.lead_reason || row.why || "").trim(),
  };
}

function sortKey(row) {
  return row.company_name.toLocaleLowerCase("en");
}

function main() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error("Missing:", JSON_PATH);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
  if (!Array.isArray(raw)) {
    console.error("Expected a JSON array in older_companies.json");
    process.exit(1);
  }

  const normalized = raw.map(normalizeRow).sort((a, b) => sortKey(a).localeCompare(sortKey(b), "en"));

  fs.writeFileSync(JSON_PATH, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");

  const sheet = XLSX.utils.json_to_sheet(normalized, {
    header: [
      "id",
      "company_name",
      "email",
      "phone",
      "website",
      "country",
      "city",
      "address",
      "headquarters",
      "category",
      "primary_contact_role",
      "contact_info",
      "lead_reason",
    ],
  });

  const colWidths = [
    { wch: 28 },
    { wch: 36 },
    { wch: 32 },
    { wch: 18 },
    { wch: 40 },
    { wch: 14 },
    { wch: 18 },
    { wch: 36 },
    { wch: 28 },
    { wch: 32 },
    { wch: 28 },
    { wch: 40 },
    { wch: 72 },
  ];
  sheet["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, "Companies");
  XLSX.writeFile(wb, XLSX_PATH);

  console.log("Normalized & sorted:", normalized.length, "rows");
  console.log("Updated JSON:", JSON_PATH);
  console.log("Excel file:", XLSX_PATH);
}

main();
