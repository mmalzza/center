export interface DateRange {
  start: Date;
  end: Date;
}

const pad2 = (n: number) => String(n).padStart(2, '0');

export function parseDotDate(value: string): Date {
  const [y, m, d] = value.split('.').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDotDate(date: Date): string {
  return `${date.getFullYear()}.${pad2(date.getMonth() + 1)}.${pad2(date.getDate())}`;
}

export function formatDashDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function formatLastUpdated(date: Date): string {
  return `${date.getFullYear()}.${pad2(date.getMonth() + 1)}.${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())} (KST)`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number): Date {
  const result = startOfDay(date);
  result.setDate(result.getDate() + amount);
  return result;
}

const TRAILING_WINDOW_DAYS: Record<string, number> = {
  DAYS_30: 30,
  DAYS_90: 90,
  DAYS_180: 180,
  DAYS_365: 365,
};

export function getPresetRange(presetId: string, today: Date = new Date()): DateRange {
  const base = startOfDay(today);

  if (presetId === 'TODAY') return { start: base, end: base };

  if (presetId === 'YESTERDAY') {
    const yesterday = addDays(base, -1);
    return { start: yesterday, end: yesterday };
  }

  if (presetId === 'THIS_MONTH') {
    return { start: new Date(base.getFullYear(), base.getMonth(), 1), end: base };
  }

  const trailingDays = TRAILING_WINDOW_DAYS[presetId];
  if (trailingDays) {
    return { start: addDays(base, -(trailingDays - 1)), end: base };
  }

  return { start: base, end: base };
}
