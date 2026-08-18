import { useState } from 'react';

import dashboardData from '@/data/dashboard.json';
import type { DashboardResponse } from '@/types/dashboard';
import { formatLastUpdated } from '@/utils/date';

import { DashboardFilterProvider, useDashboardFilter } from '@/contexts/DashboardFilterContext';

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

export function DashboardGrid() {
  return (
    <DashboardFilterProvider>
      <DashboardGridContent />
    </DashboardFilterProvider>
  );
}

function DashboardGridContent() {
  const [lastUpdated] = useState(() => formatLastUpdated(new Date()));
  const { data: apiData, isLoading, error, retry } = useDashboardFilter();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <main>
      <DashboardHeader
        data={data.header}
        lastUpdated={lastUpdated ?? ''}
        onRefresh={handleRefresh}
      />

      <DashboardNotice data={data.notice} />

      <DashboardFilter data={data.filter} />

      {error && (
        <div className="mb-4 flex items-center justify-between rounded-[16px] bg-red-50 px-6 py-4 text-body text-red-500">
          <span>대시보드 데이터를 불러오지 못했습니다. {error.message}</span>
          <button
            onClick={retry}
            className="rounded-button border border-red-500 bg-white px-4 py-2 text-body font-medium text-red-500"
          >
            다시 시도
          </button>
        </div>
      )}

      {!error && (isLoading || !apiData) && (
        <div className="mb-4 flex h-40 items-center justify-center rounded-[16px] bg-neutral-50 text-body text-neutral-500">
          불러오는 중...
        </div>
      )}

      {!error && apiData && (
        <>
          <TopSummary data={apiData.topSummary} />

          <div className="mb-4 grid grid-cols-2 gap-4">
            <RepurchaseWidget data={apiData.repurchaseRate} />

            <ReservationWidget data={apiData.reservationRate} />
          </div>

          <SalesWidget data={apiData.monthlySales} />

          <ExpertOrdersWidget data={apiData.expertOrders} />

          <div className="mb-4 grid grid-cols-2 gap-4">
            <EmployeeResponseWidget data={apiData.employeeResponses} />

            <ConversionWidget data={apiData.offlineDeskConversion} />
          </div>

          <ExpertConnectionWidget data={apiData.expertConnection} />
        </>
      )}
    </main>
  );
}