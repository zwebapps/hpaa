import { NextResponse } from "next/server";

function getAdminUser() {
  return process.env.ADMIN_USERNAME?.trim() || "";
}

function getAdminPass() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export function isAdminRequest(request: Request): boolean {
  const user = getAdminUser();
  const pass = getAdminPass();
  if (!user || !pass) return false;

  const header = request.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme !== "Basic" || !encoded) return false;

  let decoded = "";
  try {
    decoded = Buffer.from(encoded, "base64").toString("utf8");
  } catch {
    return false;
  }

  const idx = decoded.indexOf(":");
  if (idx < 0) return false;
  const u = decoded.slice(0, idx);
  const p = decoded.slice(idx + 1);

  return u === user && p === pass;
}

/** Use inside API route handlers. */
export function requireAdmin(request: Request) {
  if (!isAdminRequest(request)) return unauthorized();
  return null;
}

