import dashboardData from '@/data/dashboard.json';
import type { DashboardResponse } from '@/types/dashboard';

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
    <main className="min-h-screen bg-[#F7F8FA] p-5">
      <DashboardHeader data={data.header} />

      <DashboardNotice data={data.notice} />

      <DashboardFilter data={data.filter} />

      <TopSummary data={data.topSummary} />

      <div className="mb-4 grid grid-cols-2 gap-4">
        <RepurchaseWidget
          data={data.repurchaseRate}
        />

        <ReservationWidget
          data={data.reservationRate}
        />
      </div>

      <SalesWidget data={data.monthlySales} />

      <ExpertOrdersWidget
        data={data.expertOrders}
      />

      <div className="mb-4 grid grid-cols-2 gap-4">
        <EmployeeResponseWidget
          data={data.employeeResponses}
        />

        <ConversionWidget
          data={data.offlineDeskConversion}
        />
      </div>

      <ExpertConnectionWidget
        data={data.expertConnection}
      />
    </main>
  );
}