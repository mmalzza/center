import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import useSWR from 'swr';

import dashboardData from '@/data/dashboard.json';
import type { DashboardApiResponse, DashboardGranularity, DashboardResponse } from '@/types/dashboard';
import type { DateRange } from '@/utils/date';
import { formatDashDate, getPresetRange } from '@/utils/date';
import { fetcher } from '@/utils/fetcher';

const staticData = dashboardData as DashboardResponse;

interface DashboardFilterContextValue {
  dateRange: DateRange;
  selectedPreset: string;
  granularity: DashboardGranularity;
  setPreset: (presetId: string) => void;
  setRange: (range: DateRange) => void;
  setGranularity: (granularity: DashboardGranularity) => void;
  data: DashboardApiResponse | undefined;
  isLoading: boolean;
  error: Error | undefined;
  retry: () => void;
}

const DashboardFilterContext = createContext<DashboardFilterContextValue | null>(null);

export function DashboardFilterProvider({ children }: { children: ReactNode }) {
  // 최초 진입 시 dashboard.json의 고정 날짜 대신 "이번 달 1일 ~ 오늘"을 기본값으로 사용한다.
  const [dateRange, setDateRange] = useState<DateRange>(() => getPresetRange('THIS_MONTH'));
  const [selectedPreset, setSelectedPreset] = useState('THIS_MONTH');
  const [granularity, setGranularity] = useState<DashboardGranularity>(
    staticData.filter.selectedAggregationUnit as DashboardGranularity,
  );

  const setPreset = (presetId: string) => {
    setDateRange(getPresetRange(presetId));
    setSelectedPreset(presetId);
  };

  const setRange = (range: DateRange) => {
    setDateRange(range);
    setSelectedPreset('');
  };

  const swrKey = `/api/dashboard?startDate=${formatDashDate(dateRange.start)}&endDate=${formatDashDate(dateRange.end)}&granularity=${granularity}`;

  const { data, error, isLoading, mutate } = useSWR<DashboardApiResponse>(swrKey, fetcher);

  const value = useMemo<DashboardFilterContextValue>(
    () => ({
      dateRange,
      selectedPreset,
      granularity,
      setPreset,
      setRange,
      setGranularity,
      data,
      isLoading,
      error,
      retry: () => {
        void mutate();
      },
    }),
    [dateRange, selectedPreset, granularity, data, isLoading, error, mutate],
  );

  return (
    <DashboardFilterContext.Provider value={value}>{children}</DashboardFilterContext.Provider>
  );
}

export function useDashboardFilter(): DashboardFilterContextValue {
  const context = useContext(DashboardFilterContext);
  if (!context) {
    throw new Error('useDashboardFilter는 DashboardFilterProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
