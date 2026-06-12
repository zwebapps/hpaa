"use client";

import { useMemo, useState } from "react";
import type { DailyCount } from "@/lib/analyticsWeek";
import {
  addDays,
  buildWeekDays,
  dayAtOffset,
  formatDayLabel,
  formatWeekRange,
  maxDayOffset,
  maxWeekOffset,
  toDateKey,
  weekStartMonday,
} from "@/lib/analyticsWeek";

type Props = {
  daily: DailyCount[];
};

type PeriodMode = "week" | "day";
type ChartType = "bar" | "line" | "pie";

const CHART_COLORS = [
  "#b8965a",
  "#0b1120",
  "#d4b07a",
  "#132040",
  "#8fa3bf",
  "#c9a55a",
  "#4a5568",
];

export function AdminVisitsChart({ daily }: Props) {
  const [periodMode, setPeriodMode] = useState<PeriodMode>("week");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [weekOffset, setWeekOffset] = useState(0);
  const [dayOffset, setDayOffset] = useState(0);

  const countByDate = useMemo(() => new Map(daily.map((d) => [d.date, d.count])), [daily]);
  const earliestKey = daily.length > 0 ? daily[0]!.date : null;
  const maxWeek = useMemo(() => maxWeekOffset(earliestKey), [earliestKey]);
  const maxDay = useMemo(() => maxDayOffset(earliestKey), [earliestKey]);

  const weekStart = useMemo(() => weekStartMonday(new Date(), weekOffset), [weekOffset]);
  const weekEnd = useMemo(() => addDays(weekStart, 6), [weekStart]);
  const weekDays = useMemo(() => buildWeekDays(weekStart, countByDate), [weekStart, countByDate]);

  const selectedDay = useMemo(() => dayAtOffset(new Date(), dayOffset), [dayOffset]);
  const dayCount = countByDate.get(toDateKey(selectedDay)) ?? 0;

  const chartPoints = useMemo(() => {
    if (periodMode === "week") {
      return weekDays.map((d) => ({
        label: d.dow,
        sub: String(d.dom),
        count: d.count,
        isToday: d.isToday,
        isFuture: d.isFuture,
      }));
    }
    return [
      {
        label: selectedDay.toLocaleDateString("en-GB", { weekday: "short" }),
        sub: selectedDay.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        count: dayCount,
        isToday: dayOffset === 0,
        isFuture: false,
      },
    ];
  }, [periodMode, weekDays, selectedDay, dayCount, dayOffset]);

  const total = chartPoints.reduce((s, p) => s + p.count, 0);
  const maxCount = Math.max(1, ...chartPoints.map((p) => p.count));

  const canGoOlder = periodMode === "week" ? weekOffset < maxWeek : dayOffset < maxDay;
  const canGoNewer = periodMode === "week" ? weekOffset > 0 : dayOffset > 0;

  const navLabel =
    periodMode === "week" ? formatWeekRange(weekStart, weekEnd) : formatDayLabel(selectedDay);
  const navKind = periodMode === "week" ? "Week" : "Day";

  const goOlder = () => {
    if (periodMode === "week") setWeekOffset((w) => Math.min(maxWeek, w + 1));
    else setDayOffset((d) => Math.min(maxDay, d + 1));
  };

  const goNewer = () => {
    if (periodMode === "week") setWeekOffset((w) => Math.max(0, w - 1));
    else setDayOffset((d) => Math.max(0, d - 1));
  };

  if (daily.length === 0) {
    return <p className="admin-analytics-empty">No visit data yet.</p>;
  }

  return (
    <div className="admin-visits-chart">
      <div className="admin-visits-toolbar">
        <div className="admin-visits-toggle" role="group" aria-label="Period">
          <button
            type="button"
            className={periodMode === "week" ? "active" : ""}
            onClick={() => setPeriodMode("week")}
          >
            Week
          </button>
          <button
            type="button"
            className={periodMode === "day" ? "active" : ""}
            onClick={() => setPeriodMode("day")}
          >
            Day
          </button>
        </div>
        <div className="admin-visits-toggle" role="group" aria-label="Chart type">
          <button
            type="button"
            className={chartType === "bar" ? "active" : ""}
            onClick={() => setChartType("bar")}
          >
            Bar
          </button>
          <button
            type="button"
            className={chartType === "line" ? "active" : ""}
            onClick={() => setChartType("line")}
          >
            Line
          </button>
          <button
            type="button"
            className={chartType === "pie" ? "active" : ""}
            onClick={() => setChartType("pie")}
          >
            Pie
          </button>
        </div>
      </div>

      <div className="admin-visits-chart-area" aria-live="polite">
        {chartType === "bar" ? (
          <BarChart points={chartPoints} maxCount={maxCount} />
        ) : null}
        {chartType === "line" ? (
          <LineChart points={chartPoints} maxCount={maxCount} />
        ) : null}
        {chartType === "pie" ? <PieChart points={chartPoints} total={total} /> : null}
      </div>

      <div className="admin-visits-nav">
        <button
          type="button"
          className="admin-week-nav-btn"
          disabled={!canGoOlder}
          onClick={goOlder}
          aria-label={periodMode === "week" ? "Previous week" : "Previous day"}
        >
          ‹
        </button>
        <div className="admin-visits-nav__center">
          <span className="admin-week-visits__label">{navKind}</span>
          <span className="admin-week-visits__dates">{navLabel}</span>
        </div>
        <button
          type="button"
          className="admin-week-nav-btn"
          disabled={!canGoNewer}
          onClick={goNewer}
          aria-label={periodMode === "week" ? "Next week" : "Next day"}
        >
          ›
        </button>
      </div>

      <p className="admin-visits-summary">
        {periodMode === "week" ? "Week" : "Day"} total: <strong>{total}</strong> visits
        {(periodMode === "week" && weekOffset === 0) || (periodMode === "day" && dayOffset === 0)
          ? " · current"
          : null}
      </p>
    </div>
  );
}

type Point = {
  label: string;
  sub: string;
  count: number;
  isToday: boolean;
  isFuture: boolean;
};

function BarChart({ points, maxCount }: { points: Point[]; maxCount: number }) {
  return (
    <div className={`admin-visits-bars ${points.length === 1 ? "admin-visits-bars--single" : ""}`}>
      {points.map((p) => (
        <div
          key={`${p.label}-${p.sub}`}
          className={[
            "admin-visits-bar-col",
            p.isToday ? "is-today" : "",
            p.isFuture ? "is-future" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="admin-visits-bar-val">{p.count}</span>
          <div className="admin-visits-bar-track">
            <div
              className="admin-visits-bar-fill"
              style={{ height: `${Math.round((p.count / maxCount) * 100)}%` }}
            />
          </div>
          <span className="admin-visits-bar-label">{p.label}</span>
          <span className="admin-visits-bar-sub">{p.sub}</span>
        </div>
      ))}
    </div>
  );
}

function buildSmoothLinePath(coords: { x: number; y: number }[]): string {
  if (coords.length === 0) return "";
  if (coords.length === 1) return `M ${coords[0]!.x} ${coords[0]!.y}`;
  let d = `M ${coords[0]!.x} ${coords[0]!.y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i]!;
    const p1 = coords[i + 1]!;
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

function buildAreaPath(coords: { x: number; y: number }[], baseline: number): string {
  if (coords.length === 0) return "";
  const line = buildSmoothLinePath(coords);
  const last = coords[coords.length - 1]!;
  const first = coords[0]!;
  return `${line} L ${last.x} ${baseline} L ${first.x} ${baseline} Z`;
}

function LineChart({ points, maxCount }: { points: Point[]; maxCount: number }) {
  const w = 400;
  const h = 200;
  const padX = 28;
  const padTop = 28;
  const padBottom = 36;
  const chartH = h - padTop - padBottom;
  const n = points.length;

  const coords = points.map((p, i) => {
    const x = n === 1 ? w / 2 : padX + (i / (n - 1)) * (w - padX * 2);
    const y = padTop + chartH - (p.count / maxCount) * chartH;
    return { x, y, p };
  });

  const linePath = buildSmoothLinePath(coords);
  const areaPath = buildAreaPath(coords, h - padBottom);
  const gridSteps = 4;
  const yTicks = Array.from({ length: gridSteps + 1 }, (_, i) => {
    const value = Math.round(maxCount - (i / gridSteps) * maxCount);
    const y = padTop + (i / gridSteps) * chartH;
    return { value, y };
  });

  return (
    <div className="admin-visits-line-wrap">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="admin-visits-line-svg"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Visits line chart"
      >
        <defs>
          <linearGradient id="adminLineArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8965a" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#b8965a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#132040" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="adminLineStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4b07a" />
            <stop offset="50%" stopColor="#b8965a" />
            <stop offset="100%" stopColor="#0b1120" />
          </linearGradient>
          <filter id="adminLineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {yTicks.map((tick) => (
          <g key={tick.value}>
            <line
              x1={padX}
              y1={tick.y}
              x2={w - padX}
              y2={tick.y}
              className="admin-visits-line-grid"
            />
            <text
              x={padX - 8}
              y={tick.y + 4}
              textAnchor="end"
              className="admin-visits-line-y-label"
            >
              {tick.value}
            </text>
          </g>
        ))}

        <path d={areaPath} className="admin-visits-line-area" fill="url(#adminLineArea)" />
        <path
          d={linePath}
          className="admin-visits-line-path"
          fill="none"
          stroke="url(#adminLineStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#adminLineGlow)"
        />

        {coords.map((c) => (
          <g key={`${c.p.label}-${c.p.sub}`} className={c.p.isFuture ? "is-future" : ""}>
            <circle
              cx={c.x}
              cy={c.y}
              r={c.p.isToday ? 7 : 5}
              className={c.p.isToday ? "admin-visits-line-dot-halo" : "admin-visits-line-dot-halo"}
            />
            <circle
              cx={c.x}
              cy={c.y}
              r={c.p.isToday ? 5 : 4}
              className={[
                "admin-visits-line-dot",
                c.p.isToday ? "is-today" : "",
                c.p.isFuture ? "is-future" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
            <text
              x={c.x}
              y={c.y - 12}
              textAnchor="middle"
              className={[
                "admin-visits-line-value",
                c.p.isToday ? "is-today" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {c.p.count}
            </text>
            <title>
              {c.p.label} {c.p.sub}: {c.p.count} visits
            </title>
          </g>
        ))}

        {coords.map((c) => (
          <text
            key={`lbl-${c.p.label}`}
            x={c.x}
            y={h - 10}
            textAnchor="middle"
            className={[
              "admin-visits-line-x-label",
              c.p.isToday ? "is-today" : "",
              c.p.isFuture ? "is-future" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {c.p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function PieChart({ points, total }: { points: Point[]; total: number }) {
  const slices = points.filter((p) => p.count > 0);
  const r = 42;
  const c = 2 * Math.PI * r;
  let offset = 0;

  if (total === 0) {
    return (
      <div className="admin-visits-pie-wrap">
        <svg viewBox="0 0 100 100" className="admin-visits-pie-svg">
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border-light)" strokeWidth="12" />
        </svg>
        <p className="admin-visits-pie-empty">No visits in this period</p>
      </div>
    );
  }

  return (
    <div className="admin-visits-pie-layout">
      <svg viewBox="0 0 100 100" className="admin-visits-pie-svg">
        <g transform="rotate(-90 50 50)">
          {slices.map((p, i) => {
            const len = (p.count / total) * c;
            const dash = `${len} ${c - len}`;
            const el = (
              <circle
                key={p.label}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={CHART_COLORS[i % CHART_COLORS.length]}
                strokeWidth="12"
                strokeDasharray={dash}
                strokeDashoffset={-offset}
              />
            );
            offset += len;
            return el;
          })}
        </g>
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="admin-visits-pie-total">
          {total}
        </text>
      </svg>
      <ul className="admin-visits-pie-legend">
        {points.map((p, i) => (
          <li key={p.label}>
            <span
              className="admin-visits-pie-swatch"
              style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
            />
            <span>
              {p.label} {p.sub} — {p.count}
              {total > 0 ? ` (${Math.round((p.count / total) * 100)}%)` : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
