import { NextResponse, type NextRequest } from "next/server";

function getAdminUser() {
  return process.env.ADMIN_USERNAME?.trim() || "";
}

function getAdminPass() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

function isAuthed(req: NextRequest) {
  const user = getAdminUser();
  const pass = getAdminPass();
  if (!user || !pass) return false;

  const header = req.headers.get("authorization") || "";
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
  return decoded.slice(0, idx) === user && decoded.slice(idx + 1) === pass;
}

export function middleware(req: NextRequest) {
  // If credentials aren't configured, lock admin down by default.
  if (!isAuthed(req)) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/site-content/:path*"],
};

