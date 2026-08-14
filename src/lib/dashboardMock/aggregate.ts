import { EMPLOYEES, EXPERTS } from './entities';
import type { DailyRecord } from './dailyRecord';

// buckets.ts의 Bucket(날짜 목록)을 실제 생성된 DailyRecord 목록으로 변환한 버킷
export interface RecordBucket {
  label: string;
  records: DailyRecord[];
}

function sum(values: number[]): number {
  return values.reduce((acc, v) => acc + v, 0);
}

export interface RepurchaseCounts {
  online: { b2b: number; b2c: number };
  offline: { b2b: number; b2c: number };
  unpurchased: { b2b: number; b2c: number };
  onlineTooltip: { within1m: number; within3m: number; within1y: number };
}

export function aggregateRepurchaseCounts(days: DailyRecord[]): RepurchaseCounts {
  return {
    online: {
      b2b: sum(days.map((d) => d.repurchase.online.b2b)),
      b2c: sum(days.map((d) => d.repurchase.online.b2c)),
    },
    offline: {
      b2b: sum(days.map((d) => d.repurchase.offline.b2b)),
      b2c: sum(days.map((d) => d.repurchase.offline.b2c)),
    },
    unpurchased: {
      b2b: sum(days.map((d) => d.repurchase.unpurchased.b2b)),
      b2c: sum(days.map((d) => d.repurchase.unpurchased.b2c)),
    },
    onlineTooltip: {
      within1m: sum(days.map((d) => d.repurchase.onlineTooltip.within1m)),
      within3m: sum(days.map((d) => d.repurchase.onlineTooltip.within3m)),
      within1y: sum(days.map((d) => d.repurchase.onlineTooltip.within1y)),
    },
  };
}

export function repurchaseRate(online: number, offline: number, unpurchased: number): number {
  const total = online + offline + unpurchased;
  if (total === 0) return 0;
  return Math.round(((online + offline) / total) * 1000) / 10;
}

export interface ReservationBucketValue {
  period: string;
  values: { total: number; existing: number; new: number };
}

export function aggregateReservationBuckets(buckets: RecordBucket[]): ReservationBucketValue[] {
  return buckets.map((bucket) => {
    const existing = sum(bucket.records.map((d) => d.reservations.existing));
    const newCount = sum(bucket.records.map((d) => d.reservations.new));
    return {
      period: bucket.label,
      values: { total: existing + newCount, existing, new: newCount },
    };
  });
}

export interface SalesBucketValue {
  period: string;
  values: { total: number; new: number; refund: number };
}

export function aggregateSalesBuckets(buckets: RecordBucket[]): SalesBucketValue[] {
  return buckets.map((bucket) => ({
    period: bucket.label,
    values: {
      total: sum(bucket.records.map((d) => d.sales.total)),
      new: sum(bucket.records.map((d) => d.sales.new)),
      refund: sum(bucket.records.map((d) => d.sales.refund)),
    },
  }));
}

export function aggregateExpertOrderCounts(days: DailyRecord[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const expert of EXPERTS) {
    totals[expert.id] = sum(days.map((d) => d.expertOrders[expert.id] ?? 0));
  }
  return totals;
}

export function aggregateEmployeeResponseCounts(days: DailyRecord[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const employee of EMPLOYEES) {
    totals[employee.id] = sum(days.map((d) => d.employeeResponses[employee.id]?.count ?? 0));
  }
  return totals;
}

export function aggregateOfflineDesk(days: DailyRecord[]): {
  inquiries: number;
  reservations: number;
} {
  return {
    inquiries: sum(days.map((d) => d.offlineDesk.inquiries)),
    reservations: sum(days.map((d) => d.offlineDesk.reservations)),
  };
}

export interface ConnectionBucketValue {
  period: string;
  inbound: number;
  accepted: number;
  rate: number;
}

export function aggregateConnectionBuckets(buckets: RecordBucket[]): ConnectionBucketValue[] {
  return buckets.map((bucket) => {
    const inbound = sum(bucket.records.map((d) => d.expertConnection.inbound));
    const accepted = sum(bucket.records.map((d) => d.expertConnection.accepted));
    const rate = inbound === 0 ? 0 : Math.round((accepted / inbound) * 1000) / 10;
    return { period: bucket.label, inbound, accepted, rate };
  });
}

export function aggregateConnectionWhole(days: DailyRecord[]): {
  inbound: number;
  accepted: number;
} {
  return {
    inbound: sum(days.map((d) => d.expertConnection.inbound)),
    accepted: sum(days.map((d) => d.expertConnection.accepted)),
  };
}

export function aggregateUsage(days: DailyRecord[]): { count: number; uniqueUsers: number } {
  return {
    count: sum(days.map((d) => d.usage.count)),
    uniqueUsers: sum(days.map((d) => d.usage.uniqueUsers)),
  };
}
