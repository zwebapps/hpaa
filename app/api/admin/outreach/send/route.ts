import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbErrorPayload } from "@/lib/dbError";
import {
  delayMs,
  sendOutreachEmail,
  smtpConfigured,
} from "@/lib/outreachMail";
import type { OutreachSendFilter } from "@/lib/outreachFilters";
import { getPendingOutreachCompanies, markCompanySent } from "@/lib/outreachStore";

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  if (!smtpConfigured()) {
    return Response.json(
      { ok: false, error: "SMTP is not configured in environment variables." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as {
      test?: boolean;
      testTo?: string;
      ids?: string[];
      countries?: string[];
    };
    const delay = Number(process.env.OUTREACH_DELAY_MS) || 1500;

    if (body.test) {
      const testTo = (process.env.OUTREACH_TEST_TO || process.env.CONTACT_TO_EMAIL || "").trim();
      if (!testTo) {
        return Response.json(
          { ok: false, error: "Set OUTREACH_TEST_TO or CONTACT_TO_EMAIL for test sends." },
          { status: 400 },
        );
      }
      const pending = await getPendingOutreachCompanies();
      const sample = pending[0];
      const name = sample?.company_name || "Sample Company";
      const { messageId, subject } = await sendOutreachEmail({
        to: body.testTo?.trim() || testTo,
        recipientName: name,
        test: true,
      });
      return Response.json({
        ok: true,
        mode: "test",
        to: body.testTo?.trim() || testTo,
        salutation: name,
        messageId,
        subject,
      });
    }

    const sendFilter: OutreachSendFilter = {};
    if (Array.isArray(body.ids) && body.ids.length > 0) {
      sendFilter.ids = body.ids.map((id) => String(id).trim()).filter(Boolean);
    }
    if (Array.isArray(body.countries) && body.countries.length > 0) {
      sendFilter.countries = body.countries.map((c) => String(c).trim()).filter(Boolean);
    }

    const pending = await getPendingOutreachCompanies(
      sendFilter.ids?.length || sendFilter.countries?.length ? sendFilter : undefined,
    );
    if (pending.length === 0) {
      return Response.json({
        ok: true,
        sent: 0,
        failed: 0,
        results: [],
        message: "No pending companies match this filter.",
      });
    }

    const results: { id: string; email: string; ok: boolean; messageId?: string; error?: string }[] = [];

    for (const company of pending) {
      try {
        const { messageId } = await sendOutreachEmail({
          to: company.email,
          recipientName: company.company_name,
        });
        await markCompanySent(company.id, messageId);
        results.push({ id: company.id, email: company.email, ok: true, messageId });
        await delayMs(delay);
      } catch (err) {
        results.push({
          id: company.id,
          email: company.email,
          ok: false,
          error: err instanceof Error ? err.message : "Send failed",
        });
      }
    }

    const sent = results.filter((r) => r.ok).length;
    const failed = results.filter((r) => !r.ok).length;

    return Response.json({ ok: true, sent, failed, results });
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}
