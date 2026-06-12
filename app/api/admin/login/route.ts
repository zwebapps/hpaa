import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = String(body.password ?? "");
    if (!verifyAdminPassword(password)) {
      return Response.json({ ok: false, error: "Invalid password" }, { status: 401 });
    }

    const token = createSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, token, sessionCookieOptions());

    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
