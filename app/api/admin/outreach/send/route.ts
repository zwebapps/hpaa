import { after } from "next/server";
import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbErrorPayload } from "@/lib/dbError";
import { sendOutreachEmail, smtpConfigured } from "@/lib/outreachMail";
import type { OutreachSendFilter } from "@/lib/outreachFilters";
import {
  getPendingOutreachCompanies,
  markCompaniesSending,
} from "@/lib/outreachStore";
import { startOutreachSendWorker } from "@/lib/outreachWorker";

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
        queued: 0,
        ids: [],
        message: "No pending companies match this filter.",
      });
    }

    const { queued, ids } = await markCompaniesSending(pending.map((company) => company.id));
    if (queued === 0) {
      return Response.json({
        ok: true,
        queued: 0,
        ids: [],
        message: "No pending companies were queued. They may already be sending or sent.",
      });
    }

    after(() => {
      void startOutreachSendWorker();
    });

    return Response.json(
      {
        ok: true,
        queued,
        ids,
        message:
          "Email sending is in progress. Records will update automatically as each email is sent.",
      },
      { status: 202 },
    );
  } catch (error) {
    return Response.json(dbErrorPayload(error), { status: 503 });
  }
}
