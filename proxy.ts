import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Edge-safe: presence check only; APIs use full verify in requireAdmin(). */
const ADMIN_SESSION_COOKIE = "hpaa_admin_session";

function hasSessionCookie(request: NextRequest): boolean {
  const v = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(v && v.includes(".") && v.length > 24);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    if (hasSessionCookie(request)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!hasSessionCookie(request)) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("from", pathname);
      return NextResponse.redirect(login);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
