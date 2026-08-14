import type { NextApiRequest, NextApiResponse } from 'next';

import type {
  DashboardApiErrorResponse,
  DashboardApiResponse,
  DashboardGranularity,
} from '@/types/dashboard';
import { buildDashboardData } from '@/lib/dashboardMock/buildDashboardData';

const LAUNCH_DATE = new Date(2024, 0, 1);
const GRANULARITIES: DashboardGranularity[] = ['DAILY', 'WEEKLY', 'MONTHLY'];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDashDate(value: string): Date | null {
  if (!DATE_PATTERN.test(value)) return null;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

function defaultStartDate(today: Date): Date {
  return new Date(today.getFullYear(), today.getMonth(), 1);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardApiResponse | DashboardApiErrorResponse>,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const today = startOfDay(new Date());
  const { startDate: startParam, endDate: endParam, granularity: granularityParam } = req.query;

  const startDate = typeof startParam === 'string' && startParam
    ? parseDashDate(startParam)
    : defaultStartDate(today);
  const endDate = typeof endParam === 'string' && endParam ? parseDashDate(endParam) : today;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'startDate/endDate 형식이 올바르지 않습니다. (YYYY-MM-DD)' });
  }

  if (startDate.getTime() > endDate.getTime()) {
    return res.status(400).json({ error: 'startDate는 endDate보다 이후일 수 없습니다.' });
  }

  const granularity = (
    typeof granularityParam === 'string' ? granularityParam : 'MONTHLY'
  ) as DashboardGranularity;

  if (!GRANULARITIES.includes(granularity)) {
    return res.status(400).json({ error: `granularity는 ${GRANULARITIES.join('/')} 중 하나여야 합니다.` });
  }

  const clampedStart = startDate.getTime() < LAUNCH_DATE.getTime() ? LAUNCH_DATE : startDate;
  const clampedEnd = endDate.getTime() > today.getTime() ? today : endDate;

  try {
    const data = buildDashboardData({ startDate: clampedStart, endDate: clampedEnd, granularity });
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: '대시보드 데이터를 생성하는 중 오류가 발생했습니다.' });
  }
}
