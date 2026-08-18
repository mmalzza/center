import { useState } from 'react';

import type {
  EmployeeResponseWidgetData,
} from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';
import { Trend } from '../common/Trend';
import { ChartLegend } from '../common/ChartLegend';

interface EmployeeResponseWidgetProps {
  data: EmployeeResponseWidgetData;
}

export function EmployeeResponseWidget({
  data,
}: EmployeeResponseWidgetProps) {
  const [includeOffEmployees, setIncludeOffEmployees] = useState(false);

  const visibleChartData = includeOffEmployees
    ? data.chartData
    : data.chartData.filter((employee) => !employee.isOff);

  const maxResponseCount = Math.max(
    1,
    ...visibleChartData.map(
      (item) => item.responseCount,
    ),
  );

  return (
    <Widget>
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="[&>div]:mb-0">
          <WidgetHeader widget={data} />
        </div>

        {data.hasOffEmployeeToggle && (
          <div className="flex items-center gap-2 text-[12px] text-neutral-500">
            휴무 직원 포함
            <button
              type="button"
              role="switch"
              aria-checked={includeOffEmployees}
              aria-label="휴무 직원 포함"
              onClick={() => setIncludeOffEmployees((prev) => !prev)}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                includeOffEmployees ? 'bg-primary-500' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  includeOffEmployees ? 'translate-x-0' : 'translate-x-4'
                }`}
              />
            </button>
          </div>
        )}
      </div>

      <div className="mb-4 flex w-full items-center justify-between rounded-input bg-neutral-50 px-3 py-2.5">
        <span className="text-[16px] font-semibold text-neutral-700">
          센터 평균 문의 응대
        </span>

        <strong className="text-[16px] text-primary-700">
          {data.averageCount}
          {data.unit}
        </strong>
      </div>

      <div className="h-[184px] w-full space-y-4 overflow-hidden">
        {visibleChartData.map((employee) => (
          <div
            key={employee.id}
            className="grid grid-cols-[12px_65px_45px_1fr_55px] items-center gap-2"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                employee.isOff
                  ? 'bg-neutral-300'
                  : 'bg-primary-500'
              }`}
            />

            <span className="text-[16px] font-semibold text-neutral-900">
              {employee.employeeName}
            </span>

            <span className="text-[13px] font-semibold text-neutral-900">
              {employee.responseCount}건
            </span>

            <div className="h-[4px] overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-primary-500"
                style={{
                  width: `${
                    (employee.responseCount /
                      maxResponseCount) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="text-right">
              <Trend
                trend={{
                  ...employee.trend,
                  unit: '건',
                }}
                defaultUnit="건"
              />
            </div>
          </div>
        ))}
      </div>

      <ChartLegend items={data.seriesConfigs} align="right" />
    </Widget>
  );
}