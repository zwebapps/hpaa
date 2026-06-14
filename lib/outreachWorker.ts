import { delayMs, sendOutreachEmail, smtpConfigured } from "@/lib/outreachMail";
import {
  getNextSendingOutreachCompany,
  markCompanyFailed,
  markCompanySent,
  recoverStaleSendingOutreach,
} from "@/lib/outreachStore";

let drainPromise: Promise<void> | null = null;

async function drainOutreachSendQueue() {
  if (!smtpConfigured()) return;

  const delay = Number(process.env.OUTREACH_DELAY_MS) || 1500;
  await recoverStaleSendingOutreach();

  while (true) {
    const company = await getNextSendingOutreachCompany();
    if (!company) break;

    try {
      const { messageId } = await sendOutreachEmail({
        to: company.email,
        recipientName: company.company_name,
      });
      await markCompanySent(company.id, messageId);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Send failed";
      await markCompanyFailed(company.id, message);
    }

    await delayMs(delay);
  }
}

export function startOutreachSendWorker() {
  if (!drainPromise) {
    drainPromise = drainOutreachSendQueue().finally(() => {
      drainPromise = null;
    });
  }
  return drainPromise;
}
