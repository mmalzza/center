import { useEffect, useState } from 'react';

import dashboardData from '@/data/dashboard.json';
import type { DashboardResponse } from '@/types/dashboard';
import type { DateRange } from '@/utils/date';
import { formatDashDate, formatLastUpdated, getPresetRange, parseDotDate } from '@/utils/date';

import { DashboardHeader } from '../sections/DashboardHeader';
import { DashboardNotice } from '../sections/DashboardNotice';
import { DashboardFilter } from '../sections/DashboardFilter';
import { TopSummary } from '../sections/TopSummary';

import { RepurchaseWidget } from '../widgets/RepurchaseWidget';
import { ReservationWidget } from '../widgets/ReservationWidget';
import { SalesWidget } from '../widgets/SalesWidget';
import { ExpertOrdersWidget } from '../widgets/ExpertOrdersWidget';
import { EmployeeResponseWidget } from '../widgets/EmployeeResponseWidget';
import { ConversionWidget } from '../widgets/ConversionWidget';
import { ExpertConnectionWidget } from '../widgets/ExpertConnectionWidget';

const data = dashboardData as DashboardResponse;

function withRange<T extends { startDate: string; endDate: string }>(
  widget: T,
  range: DateRange,
): T {
  return {
    ...widget,
    startDate: formatDashDate(range.start),
    endDate: formatDashDate(range.end),
  };
}

export function DashboardGrid() {
  const [dateRange, setDateRange] = useState<DateRange>(() => ({
    start: parseDotDate(data.filter.startDate),
    end: parseDotDate(data.filter.endDate),
  }));
  const [selectedPreset, setSelectedPreset] = useState(data.filter.selectedPreset);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(formatLastUpdated(new Date()));
  }, []);

  const handleRefresh = () => {
    setLastUpdated(formatLastUpdated(new Date()));
  };

  const handlePresetChange = (presetId: string) => {
    setDateRange(getPresetRange(presetId));
    setSelectedPreset(presetId);
  };

  const handleRangeApply = (range: DateRange) => {
    setDateRange(range);
    setSelectedPreset('');
  };

  return (
    <main>
      <DashboardHeader
        data={data.header}
        lastUpdated={lastUpdated ?? ''}
        onRefresh={handleRefresh}
      />

      <DashboardNotice data={data.notice} />

      <DashboardFilter
        data={data.filter}
        dateRange={dateRange}
        selectedPreset={selectedPreset}
        onPresetChange={handlePresetChange}
        onRangeApply={handleRangeApply}
      />

      <TopSummary data={data.topSummary} />

      <div className="mb-4 grid grid-cols-2 gap-4">
        <RepurchaseWidget
          data={withRange(data.repurchaseRate, dateRange)}
        />

        <ReservationWidget
          data={withRange(data.reservationRate, dateRange)}
        />
      </div>

      <SalesWidget data={withRange(data.monthlySales, dateRange)} />

      <ExpertOrdersWidget
        data={withRange(data.expertOrders, dateRange)}
      />

      <div className="mb-4 grid grid-cols-2 gap-4">
        <EmployeeResponseWidget
          data={withRange(data.employeeResponses, dateRange)}
        />

        <ConversionWidget
          data={withRange(data.offlineDeskConversion, dateRange)}
        />
      </div>

      <ExpertConnectionWidget
        data={withRange(data.expertConnection, dateRange)}
      />
    </main>
  );
}