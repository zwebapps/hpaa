import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "hpaa_admin_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

type SessionPayload = { exp: number; v: 1 };

function adminSecret(): string {
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (password) return password;
  const appSecret = process.env.APP_SECRET?.trim();
  if (appSecret) return appSecret;
  throw new Error("Set ADMIN_PASSWORD or APP_SECRET for admin access.");
}

export function getAdminPassword(): string {
  return adminSecret();
}

function signPayload(payloadB64: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

export function createSessionToken(): string {
  const secret = adminSecret();
  const payload: SessionPayload = {
    exp: Date.now() + SESSION_MAX_AGE_SEC * 1000,
    v: 1,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${payloadB64}.${signPayload(payloadB64, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let secret: string;
  try {
    secret = adminSecret();
  } catch {
    return false;
  }
  const expected = signPayload(payloadB64, secret);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    ) as SessionPayload;
    return data.v === 1 && typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyAdminPassword(candidate: string): boolean {
  const expected = getAdminPassword();
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  };
}

export function isAdminRequest(request: NextRequest): boolean {
  return verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export function requireAdmin(request: NextRequest): Response | null {
  if (isAdminRequest(request)) return null;
  return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}
