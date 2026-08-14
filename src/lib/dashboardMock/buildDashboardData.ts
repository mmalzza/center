import dashboardData from '@/data/dashboard.json';
import type {
  DashboardApiResponse,
  DashboardGranularity,
  DashboardResponse,
  DonutChartSegment,
  RepurchaseSegmentData,
} from '@/types/dashboard';
import { formatDashDate } from '@/utils/date';

import {
  aggregateConnectionBuckets,
  aggregateConnectionWhole,
  aggregateEmployeeResponseCounts,
  aggregateExpertOrderCounts,
  aggregateOfflineDesk,
  aggregateRepurchaseCounts,
  aggregateReservationBuckets,
  aggregateSalesBuckets,
  aggregateUsage,
  repurchaseRate,
  type RepurchaseCounts,
} from './aggregate';
import { buildBuckets, enumerateDays, toDateStr } from './buckets';
import { generateDailyRecord, type DailyRecord } from './dailyRecord';
import { EMPLOYEES, EXPERTS } from './entities';
import {
  computeAbsoluteTrend,
  computePercentTrend,
  getPreviousCalendarMonth,
  getPreviousPeriod,
} from './trend';

const template = dashboardData as DashboardResponse;

interface BuildParams {
  startDate: Date;
  endDate: Date;
  granularity: DashboardGranularity;
}

// 날짜별 생성 결과를 요청 1건 내에서 재사용하기 위한 캐시 (겹치는 구간 중복 계산 방지)
function createRecordFetcher() {
  const cache = new Map<string, DailyRecord>();
  return (date: Date): DailyRecord => {
    const key = toDateStr(date);
    let record = cache.get(key);
    if (!record) {
      record = generateDailyRecord(key);
      cache.set(key, record);
    }
    return record;
  };
}

function channelTotal(counts: RepurchaseCounts, channel: 'online' | 'offline' | 'unpurchased'): number {
  return counts[channel].b2b + counts[channel].b2c;
}

function buildDonutSegments(
  segmentTemplates: DonutChartSegment[],
  values: { ONLINE: number; OFFLINE: number; UNPURCHASED: number },
  onlineTooltip?: RepurchaseCounts['onlineTooltip'],
): DonutChartSegment[] {
  const total = values.ONLINE + values.OFFLINE + values.UNPURCHASED;
  return segmentTemplates.map((segment) => {
    const count = values[segment.id as 'ONLINE' | 'OFFLINE' | 'UNPURCHASED'] ?? 0;
    const percentage = total === 0 ? 0 : Math.round((count / total) * 1000) / 10;
    const base: DonutChartSegment = { ...segment, percentage, userCount: count };

    if (segment.id === 'ONLINE' && onlineTooltip) {
      const tooltipTemplates = segment.tooltipDetails ?? [
        { label: '1개월 이내', count: 0, unit: '건' as const },
        { label: '3개월 이내', count: 0, unit: '건' as const },
        { label: '1년 이내', count: 0, unit: '건' as const },
      ];
      return {
        ...base,
        tooltipDetails: [
          { ...tooltipTemplates[0], count: onlineTooltip.within1m },
          { ...tooltipTemplates[1], count: onlineTooltip.within3m },
          { ...tooltipTemplates[2], count: onlineTooltip.within1y },
        ],
      };
    }

    return base;
  });
}

function buildRepurchaseSegment(
  templateSegment: RepurchaseSegmentData,
  currentCounts: RepurchaseCounts,
  previousCounts: RepurchaseCounts,
  channelKey: 'b2b' | 'b2c',
  onlineTooltip?: RepurchaseCounts['onlineTooltip'],
): RepurchaseSegmentData {
  const online = currentCounts.online[channelKey];
  const offline = currentCounts.offline[channelKey];
  const unpurchased = currentCounts.unpurchased[channelKey];
  const rate = repurchaseRate(online, offline, unpurchased);

  const prevOnline = previousCounts.online[channelKey];
  const prevOffline = previousCounts.offline[channelKey];
  const prevUnpurchased = previousCounts.unpurchased[channelKey];
  const previousRate = repurchaseRate(prevOnline, prevOffline, prevUnpurchased);

  return {
    summary: {
      label: templateSegment.summary.label,
      rate,
      comparisonLabel: '이전 기간 대비',
      trend: computeAbsoluteTrend(rate, previousRate),
    },
    chartData: buildDonutSegments(
      templateSegment.chartData,
      { ONLINE: online, OFFLINE: offline, UNPURCHASED: unpurchased },
      onlineTooltip,
    ),
  };
}

export function buildDashboardData({
  startDate,
  endDate,
  granularity,
}: BuildParams): DashboardApiResponse {
  const getRecord = createRecordFetcher();

  const currentDays = enumerateDays(startDate, endDate).map(getRecord);
  const previousRange = getPreviousPeriod({ start: startDate, end: endDate });
  const previousDays = enumerateDays(previousRange.start, previousRange.end).map(getRecord);
  const buckets = buildBuckets(startDate, endDate, granularity).map((bucket) => ({
    label: bucket.label,
    records: bucket.days.map(getRecord),
  }));

  const startDateStr = formatDashDate(startDate);
  const endDateStr = formatDashDate(endDate);

  // --- repurchaseRate ---
  const currentRepurchaseCounts = aggregateRepurchaseCounts(currentDays);
  const previousRepurchaseCounts = aggregateRepurchaseCounts(previousDays);

  const onlineTotal = channelTotal(currentRepurchaseCounts, 'online');
  const offlineTotal = channelTotal(currentRepurchaseCounts, 'offline');
  const unpurchasedTotal = channelTotal(currentRepurchaseCounts, 'unpurchased');
  const overallRate = repurchaseRate(onlineTotal, offlineTotal, unpurchasedTotal);

  const prevOnlineTotal = channelTotal(previousRepurchaseCounts, 'online');
  const prevOfflineTotal = channelTotal(previousRepurchaseCounts, 'offline');
  const prevUnpurchasedTotal = channelTotal(previousRepurchaseCounts, 'unpurchased');
  const previousOverallRate = repurchaseRate(prevOnlineTotal, prevOfflineTotal, prevUnpurchasedTotal);

  const repurchaseRateWidget: DashboardApiResponse['repurchaseRate'] = {
    ...template.repurchaseRate,
    startDate: startDateStr,
    endDate: endDateStr,
    summary: {
      label: template.repurchaseRate.summary.label,
      rate: overallRate,
      comparisonLabel: '이전 기간 대비',
      trend: computeAbsoluteTrend(overallRate, previousOverallRate),
    },
    chartData: buildDonutSegments(
      template.repurchaseRate.chartData,
      { ONLINE: onlineTotal, OFFLINE: offlineTotal, UNPURCHASED: unpurchasedTotal },
      currentRepurchaseCounts.onlineTooltip,
    ),
    segments: template.repurchaseRate.segments && {
      B2B: buildRepurchaseSegment(
        template.repurchaseRate.segments.B2B,
        currentRepurchaseCounts,
        previousRepurchaseCounts,
        'b2b',
      ),
      B2C: buildRepurchaseSegment(
        template.repurchaseRate.segments.B2C,
        currentRepurchaseCounts,
        previousRepurchaseCounts,
        'b2c',
      ),
    },
  };

  // --- reservationRate ---
  const reservationRateWidget: DashboardApiResponse['reservationRate'] = {
    ...template.reservationRate,
    startDate: startDateStr,
    endDate: endDateStr,
    chartData: aggregateReservationBuckets(buckets),
  };

  // --- monthlySales ---
  const monthlySalesWidget: DashboardApiResponse['monthlySales'] = {
    ...template.monthlySales,
    startDate: startDateStr,
    endDate: endDateStr,
    chartData: aggregateSalesBuckets(buckets),
  };

  // --- expertOrders ---
  const currentExpertTotals = aggregateExpertOrderCounts(currentDays);
  const previousExpertTotals = aggregateExpertOrderCounts(previousDays);
  const grandExpertTotal = Object.values(currentExpertTotals).reduce((acc, v) => acc + v, 0);

  const expertRanking = EXPERTS
    .map((expert) => {
      const orderCount = currentExpertTotals[expert.id] ?? 0;
      const previousOrderCount = previousExpertTotals[expert.id] ?? 0;
      return {
        expertName: expert.expertName,
        category: expert.category,
        orderCount,
        sharePercentage:
          grandExpertTotal === 0 ? 0 : Math.round((orderCount / grandExpertTotal) * 1000) / 10,
        trend: computePercentTrend(orderCount, previousOrderCount),
      };
    })
    .sort((a, b) => b.orderCount - a.orderCount)
    .map((item, index) => ({ rank: index + 1, ...item }));

  const expertOrdersWidget: DashboardApiResponse['expertOrders'] = {
    ...template.expertOrders,
    startDate: startDateStr,
    endDate: endDateStr,
    chartData: expertRanking,
  };

  // --- employeeResponses ---
  const currentEmployeeTotals = aggregateEmployeeResponseCounts(currentDays);
  const previousEmployeeTotals = aggregateEmployeeResponseCounts(previousDays);
  const endDateRecord = currentDays[currentDays.length - 1];

  const employeeChartData = EMPLOYEES.map((employee) => ({
    id: employee.id,
    employeeName: employee.employeeName,
    isOff: endDateRecord.employeeResponses[employee.id]?.isOff ?? false,
    responseCount: currentEmployeeTotals[employee.id] ?? 0,
    trend: computeAbsoluteTrend(
      currentEmployeeTotals[employee.id] ?? 0,
      previousEmployeeTotals[employee.id] ?? 0,
    ),
  }));

  const averageCount = Math.round(
    employeeChartData.reduce((acc, e) => acc + e.responseCount, 0) / EMPLOYEES.length,
  );

  const employeeResponsesWidget: DashboardApiResponse['employeeResponses'] = {
    ...template.employeeResponses,
    startDate: startDateStr,
    endDate: endDateStr,
    averageCount,
    chartData: employeeChartData,
  };

  // --- offlineDeskConversion ---
  const currentDesk = aggregateOfflineDesk(currentDays);
  const previousDesk = aggregateOfflineDesk(previousDays);
  const conversionRate =
    currentDesk.inquiries === 0 ? 0 : Math.round((currentDesk.reservations / currentDesk.inquiries) * 1000) / 10;
  const previousConversionRate =
    previousDesk.inquiries === 0
      ? 0
      : Math.round((previousDesk.reservations / previousDesk.inquiries) * 1000) / 10;

  const offlineDeskConversionWidget: DashboardApiResponse['offlineDeskConversion'] = {
    ...template.offlineDeskConversion,
    startDate: startDateStr,
    endDate: endDateStr,
    conversionRate,
    comparisonLabel: '이전 기간 대비',
    trend: computeAbsoluteTrend(conversionRate, previousConversionRate),
    numerator: { ...template.offlineDeskConversion.numerator, value: currentDesk.reservations },
    denominator: { ...template.offlineDeskConversion.denominator, value: currentDesk.inquiries },
  };

  // --- expertConnection ---
  const connectionBuckets = aggregateConnectionBuckets(buckets);
  const connectionWhole = aggregateConnectionWhole(currentDays);
  const wholeRate =
    connectionWhole.inbound === 0
      ? 0
      : Math.round((connectionWhole.accepted / connectionWhole.inbound) * 1000) / 10;

  const bottomSummaryTemplate = template.expertConnection.bottomSummary;
  const expertConnectionWidget: DashboardApiResponse['expertConnection'] = {
    ...template.expertConnection,
    startDate: startDateStr,
    endDate: endDateStr,
    chartData: connectionBuckets.map((bucket) => ({
      period: bucket.period,
      rate: bucket.rate,
      tooltipDetails: {
        inboundCount: bucket.inbound,
        acceptedCount: bucket.accepted,
        connectionRate: bucket.rate,
      },
    })),
    bottomSummary: [
      { ...bottomSummaryTemplate[0], value: connectionWhole.inbound },
      { ...bottomSummaryTemplate[1], value: connectionWhole.accepted },
      { ...bottomSummaryTemplate[2], value: wholeRate },
    ],
  };

  // --- topSummary: 조회 필터와 무관하게 항상 "이번 달" 고정 ---
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentMonthDays = enumerateDays(monthStart, today).map(getRecord);

  const previousCalendarMonth = getPreviousCalendarMonth(today);
  const previousMonthDays = enumerateDays(previousCalendarMonth.start, previousCalendarMonth.end).map(
    getRecord,
  );

  const sinceLaunch = enumerateDays(new Date(2024, 0, 1), today).map(getRecord);

  const currentMonthUsage = aggregateUsage(currentMonthDays);
  const previousMonthUsage = aggregateUsage(previousMonthDays);
  const accumulatedUsage = aggregateUsage(sinceLaunch);

  const currentAvgPerUser =
    currentMonthUsage.uniqueUsers === 0
      ? 0
      : Math.round((currentMonthUsage.count / currentMonthUsage.uniqueUsers) * 10) / 10;
  const previousAvgPerUser =
    previousMonthUsage.uniqueUsers === 0
      ? 0
      : Math.round((previousMonthUsage.count / previousMonthUsage.uniqueUsers) * 10) / 10;

  const topSummaryWidget: DashboardApiResponse['topSummary'] = {
    targetMonth: `${today.getMonth() + 1}월`,
    metrics: template.topSummary.metrics.map((metric) => {
      if (metric.id === 'monthly_usage') {
        return {
          ...metric,
          value: currentMonthUsage.count,
          accumulatedValue: accumulatedUsage.count,
          trend: computePercentTrend(currentMonthUsage.count, previousMonthUsage.count),
        };
      }
      if (metric.id === 'monthly_users') {
        return {
          ...metric,
          value: currentMonthUsage.uniqueUsers,
          accumulatedValue: accumulatedUsage.uniqueUsers,
          trend: computePercentTrend(currentMonthUsage.uniqueUsers, previousMonthUsage.uniqueUsers),
        };
      }
      if (metric.id === 'avg_per_user') {
        return {
          ...metric,
          value: currentAvgPerUser,
          trend: computeAbsoluteTrend(currentAvgPerUser, previousAvgPerUser),
        };
      }
      return metric;
    }),
  };

  return {
    topSummary: topSummaryWidget,
    repurchaseRate: repurchaseRateWidget,
    reservationRate: reservationRateWidget,
    monthlySales: monthlySalesWidget,
    expertOrders: expertOrdersWidget,
    employeeResponses: employeeResponsesWidget,
    offlineDeskConversion: offlineDeskConversionWidget,
    expertConnection: expertConnectionWidget,
  };
}
