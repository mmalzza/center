import type { DashboardFilterConfig } from '@/types/dashboard';

interface DashboardFilterProps {
  data: DashboardFilterConfig;
}

export function DashboardFilter({
  data,
}: DashboardFilterProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <select
          defaultValue={data.selectedPreset}
          className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-[12px] outline-none"
        >
          {data.presetOptions.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="flex gap-1.5">
          {data.presetOptions
            .filter(
              (option) =>
                option.id !== 'THIS_MONTH',
            )
            .map((option) => (
              <button
                key={option.id}
                className="h-9 rounded-full border border-gray-300 bg-white px-3 text-[11px] font-medium text-gray-600 hover:border-[#008B8B] hover:text-[#008B8B]"
              >
                {option.label}
              </button>
            ))}
        </div>

        <div className="flex h-9 items-center rounded-lg border border-gray-300 bg-white px-3 text-[11px] text-gray-500">
          {data.startDate}
          <span className="mx-2">~</span>
          {data.endDate}
        </div>

        <select
          defaultValue={data.selectedAggregationUnit}
          className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-[11px] outline-none"
        >
          {data.aggregationOptions.map(
            (option) => (
              <option
                key={option.id}
                value={option.id}
              >
                {option.label}
              </option>
            ),
          )}
        </select>
      </div>

      <button className="rounded-full bg-[#D7F7F7] px-4 py-2 text-[11px] font-semibold text-[#008B8B]">
        조회
      </button>
    </div>
  );
}