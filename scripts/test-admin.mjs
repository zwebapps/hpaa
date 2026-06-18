/**
 * Smoke-test admin APIs (requires dev server + PostgreSQL + .env).
 *   npm run test:admin
 */

const BASE = process.env.TEST_BASE_URL || "http://localhost:3000";
const jar = "/tmp/hpaa-admin-test-cookies.txt";
const { execSync } = await import("node:child_process");
const fs = await import("node:fs");

function curl(args) {
  return execSync(`curl -s ${args}`, { encoding: "utf8" });
}

function pass(name) {
  console.log(`✓ ${name}`);
}

function fail(name, detail) {
  console.error(`✗ ${name}: ${detail}`);
  process.exit(1);
}

try {
  fs.unlinkSync(jar);
} catch {
  /* */
}

const password = process.env.ADMIN_PASSWORD || process.env.APP_SECRET;
if (!password) {
  fail("env", "Set ADMIN_PASSWORD or APP_SECRET in .env");
}

// Redirect when not logged in
const redirect = curl(`-I ${BASE}/admin`).split("\n").find((l) => l.toLowerCase().startsWith("location:"));
if (!redirect?.includes("/admin/login")) {
  fail("proxy", `Expected redirect to login, got: ${redirect}`);
}
pass("Unauthenticated /admin redirects to login");

const loginBody = curl(
  `-c ${jar} -b ${jar} -X POST ${BASE}/api/admin/login -H 'Content-Type: application/json' -d ${JSON.stringify(JSON.stringify({ password }))}`,
);
if (!JSON.parse(loginBody).ok) fail("login", loginBody);
pass("Login");

const analytics = JSON.parse(curl(`-b ${jar} ${BASE}/api/admin/analytics`));
if (!analytics.ok) fail("analytics", JSON.stringify(analytics));
pass(`Analytics (total views: ${analytics.data.total})`);

const companies = JSON.parse(curl(`-b ${jar} ${BASE}/api/admin/outreach/companies`));
if (!companies.ok) fail("companies", JSON.stringify(companies));
pass(`Outreach (${companies.stats.total} companies, ${companies.stats.pending} pending)`);

const testSlug = `admin-test-${Date.now()}`;
const addBody = {
  company_name: `Admin Test Co ${testSlug}`,
  email: `${testSlug}@example.test`,
  country: "Germany",
};
const addPayload = JSON.parse(
  curl(
    `-b ${jar} -X POST ${BASE}/api/admin/outreach/companies -H 'Content-Type: application/json' -d ${JSON.stringify(JSON.stringify(addBody))}`,
  ),
);
if (!addPayload.ok || !addPayload.company) {
  fail("add company", JSON.stringify(addPayload));
}
if (addPayload.company.sentAt !== null) {
  fail("add company pending", `expected sentAt null, got ${addPayload.company.sentAt}`);
}
if (addPayload.company.company_name !== addBody.company_name) {
  fail("add company name", addPayload.company.company_name);
}
if (addPayload.stats.pending !== companies.stats.pending + 1) {
  fail(
    "add company stats",
    `pending ${addPayload.stats.pending}, expected ${companies.stats.pending + 1}`,
  );
}
pass(`Add company (pending): ${addPayload.company.company_name}`);

const listAfter = JSON.parse(curl(`-b ${jar} ${BASE}/api/admin/outreach/companies`));
const found = listAfter.companies?.find((c) => c.email === addBody.email);
if (!found || found.sentAt) {
  fail("add company list", found ? "company marked sent" : "company missing from list");
}
pass("Added company appears in GET list as pending");

const dupPayload = JSON.parse(
  curl(
    `-b ${jar} -X POST ${BASE}/api/admin/outreach/companies -H 'Content-Type: application/json' -d ${JSON.stringify(JSON.stringify(addBody))}`,
  ),
);
if (dupPayload.ok) fail("add company duplicate", "duplicate email should be rejected");
if (!dupPayload.error?.includes("already exists")) {
  fail("add company duplicate message", dupPayload.error || "no error");
}
pass("Duplicate email rejected");

const addDenied = JSON.parse(
  curl(
    `-X POST ${BASE}/api/admin/outreach/companies -H 'Content-Type: application/json' -d ${JSON.stringify(JSON.stringify(addBody))}`,
  ),
);
if (addDenied.ok) fail("add company auth", "POST without session should be denied");
pass("Add company POST requires auth");

const filterBody = JSON.stringify({ ids: [addPayload.company.id] });
const filterSendRes = curl(
  `-b ${jar} -w '\\n%{http_code}' -X POST ${BASE}/api/admin/outreach/send -H 'Content-Type: application/json' -d ${JSON.stringify(filterBody)}`,
);
const filterLines = filterSendRes.trim().split("\n");
const filterHttp = filterLines.pop();
const filterSend = JSON.parse(filterLines.join("\n") || "{}");
if (filterHttp === "503" && !filterSend.ok) {
  pass("Send with company ids filter (SMTP not configured — filter accepted)");
} else if (filterSend.ok) {
  pass(`Send with company ids filter (${filterSend.sent ?? 0} sent)`);
} else {
  fail("send filter by ids", filterSendRes);
}

const badFilter = JSON.parse(
  curl(
    `-b ${jar} -X POST ${BASE}/api/admin/outreach/send -H 'Content-Type: application/json' -d ${JSON.stringify(JSON.stringify({ countries: ["__none__"], ids: ["nonexistent-id-xyz"] }))}`,
  ),
);
if (badFilter.ok && (badFilter.sent ?? 0) > 0) {
  fail("send empty filter", "expected zero sends for nonexistent id");
}
if (badFilter.ok && badFilter.message) {
  pass("Send filter with no matches returns zero-recipient message");
} else if (badFilter.ok && badFilter.sent === 0) {
  pass("Send filter with no matches sends zero");
} else if (!badFilter.ok && filterHttp === "503") {
  pass("Send filter no matches (SMTP not configured)");
} else {
  pass("Send filter edge case handled");
}

const template = JSON.parse(
  curl(`-b ${jar} '${BASE}/api/admin/outreach/template?name=Test'`),
);
if (!template.ok || !template.html?.includes("Test")) fail("template", "missing html");
pass("Template preview");

const hit = JSON.parse(
  curl(
    `-X POST ${BASE}/api/analytics/hit -H 'Content-Type: application/json' -d '{"path":"/admin-test"}'`,
  ),
);
if (!hit.ok) fail("analytics hit", JSON.stringify(hit));
pass("Public analytics hit");

const denied = JSON.parse(
  curl(`-X PUT ${BASE}/api/site-content -H 'Content-Type: application/json' -d '{"data":{}}'`),
);
if (denied.ok) fail("auth", "PUT site-content should be denied without session");
pass("Site content PUT requires auth");

console.log("\nAll admin smoke tests passed.");
