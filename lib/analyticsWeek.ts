const DAY_MS = 24 * 60 * 60 * 1000;

export type DailyCount = { date: string; count: number };

export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** Monday 00:00 local time, `weekOffset` 0 = week containing `anchor`. */
export function weekStartMonday(anchor: Date, weekOffset: number): Date {
  const d = startOfDay(anchor);
  const dow = d.getDay();
  const mondayDelta = dow === 0 ? -6 : 1 - dow;
  d.setDate(d.getDate() + mondayDelta - weekOffset * 7);
  return d;
}

export function dayAtOffset(anchor: Date, dayOffset: number): Date {
  const d = startOfDay(anchor);
  d.setDate(d.getDate() - dayOffset);
  return d;
}

export function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * DAY_MS);
}

export type WeekDayCell = {
  date: string;
  dow: string;
  dom: number;
  count: number;
  isToday: boolean;
  isFuture: boolean;
};

const DOW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function buildWeekDays(
  weekStart: Date,
  countByDate: Map<string, number>,
  today = new Date(),
): WeekDayCell[] {
  const todayKey = toDateKey(today);
  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);
  return DOW_LABELS.map((dow, i) => {
    const date = addDays(weekStart, i);
    const key = toDateKey(date);
    return {
      date: key,
      dow,
      dom: date.getDate(),
      count: countByDate.get(key) ?? 0,
      isToday: key === todayKey,
      isFuture: date.getTime() > endOfToday.getTime(),
    };
  });
}

export function formatWeekRange(weekStart: Date, weekEnd: Date): string {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const y = weekStart.getFullYear();
  const start = weekStart.toLocaleDateString("en-GB", opts);
  const end = weekEnd.toLocaleDateString("en-GB", {
    ...opts,
    year: weekEnd.getFullYear() !== y ? "numeric" : undefined,
  });
  return `${start} – ${end}, ${y}`;
}

export function formatDayLabel(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function maxWeekOffset(earliestDateKey: string | null, anchor = new Date()): number {
  if (!earliestDateKey) return 12;
  const earliest = new Date(`${earliestDateKey}T00:00:00`);
  const currentStart = weekStartMonday(anchor, 0);
  const diffWeeks = Math.floor((currentStart.getTime() - earliest.getTime()) / (7 * DAY_MS));
  return Math.max(0, Math.min(52, diffWeeks));
}

export function maxDayOffset(earliestDateKey: string | null, anchor = new Date()): number {
  if (!earliestDateKey) return 90;
  const earliest = startOfDay(new Date(`${earliestDateKey}T00:00:00`));
  const diffDays = Math.floor((startOfDay(anchor).getTime() - earliest.getTime()) / DAY_MS);
  return Math.max(0, Math.min(90, diffDays));
}
