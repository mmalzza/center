import type {
  EmployeeResponseWidgetData,
} from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';
import { Trend } from '../common/Trend';

interface EmployeeResponseWidgetProps {
  data: EmployeeResponseWidgetData;
}

export function EmployeeResponseWidget({
  data,
}: EmployeeResponseWidgetProps) {
  const maxResponseCount = Math.max(
    ...data.chartData.map(
      (item) => item.responseCount,
    ),
  );

  return (
    <Widget>
      <div className="flex items-start justify-between">
        <WidgetHeader widget={data} />

        {data.hasOffEmployeeToggle && (
          <label className="flex items-center gap-2 text-[10px] text-gray-500">
            휴무 직원 포함
            <input
              type="checkbox"
              defaultChecked
              className="h-3.5 w-3.5 accent-[#008B8B]"
            />
          </label>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between rounded-lg bg-[#F3F5F6] px-3 py-2.5">
        <span className="text-[10px] font-semibold text-gray-500">
          센터 평균 문의 응대
        </span>

        <strong className="text-[12px] text-[#008B8B]">
          {data.averageCount}
          {data.unit}
        </strong>
      </div>

      <div className="space-y-4">
        {data.chartData.map((employee) => (
          <div
            key={employee.id}
            className="grid grid-cols-[12px_65px_45px_1fr_45px] items-center gap-2"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                employee.isOff
                  ? 'bg-gray-300'
                  : 'bg-[#008B8B]'
              }`}
            />

            <span className="text-[11px] font-medium text-gray-700">
              {employee.employeeName}
            </span>

            <span className="text-[11px] font-semibold text-gray-700">
              {employee.responseCount}건
            </span>

            <div className="h-[5px] overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#008B8B]"
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

      <div className="mt-5 flex justify-end gap-3 text-[9px] text-gray-400">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[#008B8B]" />
          근무
        </span>

        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-gray-300" />
          휴무
        </span>
      </div>
    </Widget>
  );
}