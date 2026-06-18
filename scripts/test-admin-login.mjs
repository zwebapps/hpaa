/**
 * Login + authenticated admin flow (requires dev server + PostgreSQL).
 *   npm run test:admin-login
 */

const BASE = process.env.TEST_BASE_URL || "http://localhost:3000";
const jar = "/tmp/hpaa-admin-login-test.txt";
const { execSync } = await import("node:child_process");
const fs = await import("node:fs");

const CURL_TIMEOUT = process.env.CURL_TIMEOUT_SEC || "60";

function curl(args) {
  return execSync(`curl -s -m ${CURL_TIMEOUT} ${args}`, { encoding: "utf8" });
}

function curlI(args) {
  return execSync(`curl -sI -m ${CURL_TIMEOUT} ${args}`, { encoding: "utf8" });
}

function pass(msg) {
  console.log(`✓ ${msg}`);
}

function fail(msg, detail = "") {
  console.error(`✗ ${msg}${detail ? `: ${detail}` : ""}`);
  process.exit(1);
}

try {
  fs.unlinkSync(jar);
} catch {
  /* */
}

const password = process.env.ADMIN_PASSWORD || process.env.APP_SECRET;
if (!password) fail("Missing ADMIN_PASSWORD or APP_SECRET in .env");

console.log("=== Login & authenticated admin test ===\n");

// 1. Login page loads
const loginHtml = curl(`${BASE}/admin/login`);
if (!loginHtml.includes("HPAA Admin") || !loginHtml.includes("password")) {
  fail("Login page", "missing expected content");
}
pass("Login page loads");

// 2. Wrong password
const badLogin = JSON.parse(
  curl(
    `-c ${jar} -b ${jar} -X POST ${BASE}/api/admin/login -H 'Content-Type: application/json' -d ${JSON.stringify(JSON.stringify({ password: "wrong-password-xyz" }))}`,
  ),
);
if (badLogin.ok) fail("Bad password should be rejected");
pass("Wrong password returns 401");

// 3. Good login
const goodLogin = JSON.parse(
  curl(
    `-c ${jar} -b ${jar} -X POST ${BASE}/api/admin/login -H 'Content-Type: application/json' -d ${JSON.stringify(JSON.stringify({ password }))}`,
  ),
);
if (!goodLogin.ok) fail("Login", JSON.stringify(goodLogin));
pass("Login succeeds");

// 4. Dashboard reachable with cookie
const adminHeaders = curlI(`-b ${jar} ${BASE}/admin`);
if (adminHeaders.includes("/admin/login")) {
  fail("Dashboard", "still redirecting to login after auth");
}
pass("Dashboard accessible after login");

// 5. Authenticated PUT site-content (should NOT be 401)
const putRes = execSync(
  `curl -s -w "\\n%{http_code}" -b ${jar} -X PUT ${BASE}/api/site-content -H 'Content-Type: application/json' -d '{"data":{"_test":true}}'`,
  { encoding: "utf8" },
);
const putLines = putRes.trim().split("\n");
const putCode = putLines.pop();
const putBody = putLines.join("\n");
if (putCode !== "200") fail("Authenticated save", `HTTP ${putCode} ${putBody.slice(0, 120)}`);
const putJson = JSON.parse(putBody);
if (!putJson.ok) fail("Authenticated save body", putBody);
pass("Authenticated site-content save (200)");

// 6. Seed with auth
const seed = JSON.parse(
  curl(`-b ${jar} -X POST ${BASE}/api/site-content/seed`),
);
if (!seed.ok) fail("Seed", JSON.stringify(seed));
pass("Authenticated seed from file");

// 7. Outreach + analytics while logged in
const analytics = JSON.parse(curl(`-b ${jar} ${BASE}/api/admin/analytics`));
if (!analytics.ok) fail("Analytics", JSON.stringify(analytics));
pass(`Analytics (${analytics.data.total} total views)`);

const companies = JSON.parse(curl(`-b ${jar} ${BASE}/api/admin/outreach/companies`));
if (!companies.ok) fail("Companies", JSON.stringify(companies));
pass(`Outreach list (${companies.stats.total} companies, ${companies.stats.pending} pending)`);

// 8. Logout
const logout = JSON.parse(curl(`-b ${jar} -c ${jar} -X POST ${BASE}/api/admin/logout`));
if (!logout.ok) fail("Logout", JSON.stringify(logout));
pass("Logout");

// 9. After logout, admin API denied
const afterLogout = JSON.parse(curl(`-b ${jar} ${BASE}/api/admin/analytics`));
if (afterLogout.ok) fail("After logout", "should be unauthorized");
pass("After logout, admin API returns 401");

console.log("\n=== All login & authenticated tests passed ===");
console.log(`Open in browser: ${BASE}/admin/login`);
