import type { TrendInfo } from '@/types/dashboard';
import type { DateRange } from '@/utils/date';

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number): Date {
  const result = startOfDay(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function daysBetween(start: Date, end: Date): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.round((startOfDay(end).getTime() - startOfDay(start).getTime()) / MS_PER_DAY) + 1;
}

// 선택된 기간 직전, 동일한 길이의 기간 (repurchaseRate/expertOrders/employeeResponses/offlineDeskConversion 공통 사용)
export function getPreviousPeriod(range: DateRange): DateRange {
  const length = daysBetween(range.start, range.end);
  const previousEnd = addDays(range.start, -1);
  const previousStart = addDays(previousEnd, -(length - 1));
  return { start: previousStart, end: previousEnd };
}

// TopSummary 전용: 캘린더 기준 전월 전체 범위
export function getPreviousCalendarMonth(monthDate: Date): DateRange {
  const prevMonthStart = new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1);
  const prevMonthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth(), 0);
  return { start: prevMonthStart, end: prevMonthEnd };
}

// 절대값 증감 (건수, %p 등 단위가 그대로인 지표)
export function computeAbsoluteTrend(current: number, previous: number): TrendInfo {
  const diff = Math.round((current - previous) * 10) / 10;
  if (diff === 0) return { direction: 'NONE', value: 0 };
  return { direction: diff > 0 ? 'UP' : 'DOWN', value: Math.abs(diff) };
}

// 퍼센트 증감률
export function computePercentTrend(current: number, previous: number): TrendInfo {
  if (previous === 0) {
    if (current === 0) return { direction: 'NONE', value: 0 };
    return { direction: 'UP', value: 100 };
  }
  const percent = Math.round(((current - previous) / previous) * 1000) / 10;
  if (percent === 0) return { direction: 'NONE', value: 0 };
  return { direction: percent > 0 ? 'UP' : 'DOWN', value: Math.abs(percent) };
}
