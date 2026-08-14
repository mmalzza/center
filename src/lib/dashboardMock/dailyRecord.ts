import { createRng, randFloat, randInt } from './rng';
import { EMPLOYEES, EXPERTS } from './entities';

export interface DailyRecord {
  date: string; // YYYY-MM-DD
  usage: { count: number; uniqueUsers: number };
  reservations: { existing: number; new: number };
  sales: { total: number; new: number; refund: number };
  repurchase: {
    online: { b2b: number; b2c: number };
    offline: { b2b: number; b2c: number };
    unpurchased: { b2b: number; b2c: number };
    // 재구매(온라인) 세부 기간 breakdown - 전체 합과 무관하게 하루치 근사치
    onlineTooltip: { within1m: number; within3m: number; within1y: number };
  };
  expertOrders: Record<string, number>;
  employeeResponses: Record<string, { count: number; isOff: boolean }>;
  offlineDesk: { inquiries: number; reservations: number };
  expertConnection: { inbound: number; accepted: number };
}

// 날짜 문자열(YYYY-MM-DD)만으로 결정되는 순수 함수 - 동일 날짜는 항상 동일 값을 반환한다.
export function generateDailyRecord(dateStr: string): DailyRecord {
  const usageRng = createRng(`${dateStr}:usage`);
  const reservationsRng = createRng(`${dateStr}:reservations`);
  const salesRng = createRng(`${dateStr}:sales`);
  const repurchaseRng = createRng(`${dateStr}:repurchase`);
  const offlineDeskRng = createRng(`${dateStr}:offlineDesk`);
  const connectionRng = createRng(`${dateStr}:expertConnection`);

  const uniqueUsers = randInt(usageRng, 3, 9);
  const usage = {
    uniqueUsers,
    count: uniqueUsers + randInt(usageRng, 0, 5),
  };

  const reservations = {
    existing: randInt(reservationsRng, 1, 4),
    new: randInt(reservationsRng, 0, 3),
  };

  const salesTotal = randInt(salesRng, 18, 34);
  const salesNew = randInt(salesRng, Math.floor(salesTotal * 0.5), Math.floor(salesTotal * 0.75));
  const salesRefund = randInt(salesRng, 0, 3);

  const repurchase = {
    online: { b2b: randInt(repurchaseRng, 1, 5), b2c: randInt(repurchaseRng, 2, 6) },
    offline: { b2b: randInt(repurchaseRng, 2, 6), b2c: randInt(repurchaseRng, 1, 4) },
    unpurchased: { b2b: randInt(repurchaseRng, 0, 3), b2c: randInt(repurchaseRng, 1, 4) },
    onlineTooltip: {
      within1m: randInt(repurchaseRng, 1, 4),
      within3m: randInt(repurchaseRng, 1, 3),
      within1y: randInt(repurchaseRng, 0, 2),
    },
  };

  const expertOrders: Record<string, number> = {};
  for (const expert of EXPERTS) {
    const rng = createRng(`${dateStr}:${expert.id}`);
    expertOrders[expert.id] = randInt(rng, 0, Math.max(1, Math.round(4 * expert.weight)));
  }

  const employeeResponses: Record<string, { count: number; isOff: boolean }> = {};
  for (const employee of EMPLOYEES) {
    const rng = createRng(`${dateStr}:${employee.id}`);
    const isOff = randFloat(rng, 0, 1, 3) < 1 / 7;
    employeeResponses[employee.id] = {
      count: isOff ? 0 : randInt(rng, 4, Math.max(5, Math.round(10 * employee.weight))),
      isOff,
    };
  }

  const inquiries = randInt(offlineDeskRng, 12, 28);
  const deskReservations = randInt(
    offlineDeskRng,
    Math.floor(inquiries * 0.55),
    Math.floor(inquiries * 0.85),
  );

  const inbound = randInt(connectionRng, 6, 16);
  const accepted = randInt(connectionRng, Math.ceil(inbound * 0.75), Math.max(Math.ceil(inbound * 0.75), Math.floor(inbound * 0.96)));

  return {
    date: dateStr,
    usage,
    reservations,
    sales: { total: salesTotal, new: salesNew, refund: salesRefund },
    repurchase,
    expertOrders,
    employeeResponses,
    offlineDesk: { inquiries, reservations: deskReservations },
    expertConnection: { inbound, accepted },
  };
}
