import * as XLSX from "xlsx";

export const OUTREACH_EXCEL_COLUMNS = [
  "id",
  "company_name",
  "email",
  "phone",
  "website",
  "country",
  "city",
  "headquarters",
  "sent",
] as const;

export type OutreachExcelRow = Record<(typeof OUTREACH_EXCEL_COLUMNS)[number], string>;

export const OUTREACH_EXCEL_SAMPLE_ROWS: OutreachExcelRow[] = [
  {
    id: "example-aerospace-gmbh",
    company_name: "Example Aerospace GmbH",
    email: "contact@example-aerospace.de",
    phone: "+49 89 123456",
    website: "https://example-aerospace.de",
    country: "Germany",
    city: "Munich",
    headquarters: "Munich, Germany",
    sent: "no",
  },
  {
    id: "sample-uav-ltd",
    company_name: "Sample UAV Ltd",
    email: "info@sample-uav.com",
    phone: "",
    website: "",
    country: "UK",
    city: "London",
    headquarters: "London, UK",
    sent: "yes",
  },
];

export type OutreachExcelCompany = {
  id: string;
  company_name: string;
  email: string;
  phone?: string;
  website?: string;
  country?: string;
  city?: string;
  headquarters?: string;
  sentAt?: string | null;
};

export function companyToExcelRow(company: OutreachExcelCompany): OutreachExcelRow {
  return {
    id: company.id,
    company_name: company.company_name,
    email: company.email,
    phone: company.phone ?? "",
    website: company.website ?? "",
    country: company.country ?? "",
    city: company.city ?? "",
    headquarters: company.headquarters ?? "",
    sent: company.sentAt ? "yes" : "no",
  };
}

export function buildOutreachWorkbook(
  rows: OutreachExcelRow[],
  sheetName = "Companies",
): XLSX.WorkBook {
  const sheet = XLSX.utils.json_to_sheet(rows, { header: [...OUTREACH_EXCEL_COLUMNS] });
  sheet["!cols"] = [
    { wch: 28 },
    { wch: 36 },
    { wch: 32 },
    { wch: 18 },
    { wch: 40 },
    { wch: 14 },
    { wch: 18 },
    { wch: 28 },
    { wch: 8 },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, sheetName);
  return wb;
}

export function workbookToBuffer(wb: XLSX.WorkBook): Buffer {
  return Buffer.from(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
}
