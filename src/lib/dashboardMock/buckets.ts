import type { DashboardGranularity } from '@/types/dashboard';

export interface Bucket {
  label: string;
  days: Date[];
}

const pad2 = (n: number) => String(n).padStart(2, '0');

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number): Date {
  const result = startOfDay(date);
  result.setDate(result.getDate() + amount);
  return result;
}

export function toDateStr(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

// [start, end] 구간의 날짜를 하루 단위로 나열 (양끝 포함)
export function enumerateDays(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  let cursor = startOfDay(start);
  const last = startOfDay(end);
  while (cursor.getTime() <= last.getTime()) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

function formatDot(date: Date): string {
  return `${date.getFullYear()}.${pad2(date.getMonth() + 1)}.${pad2(date.getDate())}`;
}

function dailyLabel(day: Date): string {
  return formatDot(day);
}

function weeklyLabel(days: Date[]): string {
  const first = days[0];
  const last = days[days.length - 1];
  const firstStr = formatDot(first);
  if (first.getFullYear() === last.getFullYear() && first.getMonth() === last.getMonth()) {
    return `${firstStr}~${pad2(last.getMonth() + 1)}.${pad2(last.getDate())}`;
  }
  return `${firstStr}~${formatDot(last)}`;
}

function monthlyLabel(days: Date[]): string {
  const first = days[0];
  return `${first.getFullYear()}.${pad2(first.getMonth() + 1)}`;
}

// 선택 기간을 granularity에 따라 버킷으로 나눈다. 각 버킷은 항상 1일 이상 포함하며,
// 요청 범위 밖으로 벗어나는 날짜는 포함하지 않는다(주/월 경계에 걸치는 첫/마지막 버킷은 clip됨).
export function buildBuckets(
  start: Date,
  end: Date,
  granularity: DashboardGranularity,
): Bucket[] {
  const days = enumerateDays(start, end);
  if (days.length === 0) return [];

  if (granularity === 'DAILY') {
    return days.map((day) => ({ label: dailyLabel(day), days: [day] }));
  }

  if (granularity === 'WEEKLY') {
    const buckets: Bucket[] = [];
    let current: Date[] = [];
    for (const day of days) {
      if (current.length > 0 && day.getDay() === 0) {
        buckets.push({ label: weeklyLabel(current), days: current });
        current = [];
      }
      current.push(day);
    }
    if (current.length > 0) buckets.push({ label: weeklyLabel(current), days: current });
    return buckets;
  }

  // MONTHLY
  const buckets: Bucket[] = [];
  let current: Date[] = [];
  for (const day of days) {
    if (
      current.length > 0 &&
      (day.getMonth() !== current[0].getMonth() || day.getFullYear() !== current[0].getFullYear())
    ) {
      buckets.push({ label: monthlyLabel(current), days: current });
      current = [];
    }
    current.push(day);
  }
  if (current.length > 0) buckets.push({ label: monthlyLabel(current), days: current });
  return buckets;
}
