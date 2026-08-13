import type {
  ExpertOrdersWidgetData,
} from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';
import { Trend } from '../common/Trend';

interface ExpertOrdersWidgetProps {
  data: ExpertOrdersWidgetData;
}

export function ExpertOrdersWidget({
  data,
}: ExpertOrdersWidgetProps) {
  const maxOrderCount = Math.max(
    ...data.chartData.map(
      (item) => item.orderCount,
    ),
  );

  return (
    <Widget className="mb-4">
      <div className="flex items-start justify-between">
        <WidgetHeader widget={data} />

        {data.hasNameMaskingToggle && (
          <label className="flex items-center gap-2 text-[10px] text-gray-500">
            성명 숨김
            <input
              type="checkbox"
              className="h-3.5 w-3.5 accent-[#008B8B]"
            />
          </label>
        )}
      </div>

      <div className="mb-5 flex gap-1.5 overflow-x-auto">
        {data.categories.map(
          (category, index) => (
            <button
              key={category.id}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] ${
                index === 0
                  ? 'bg-[#008B8B] font-semibold text-white'
                  : 'border border-gray-200 bg-white text-gray-500'
              }`}
            >
              {category.label}
            </button>
          ),
        )}
      </div>

      <div className="space-y-4">
        {data.chartData.map((expert) => (
          <div
            key={expert.rank}
            className="grid grid-cols-[30px_170px_1fr_60px_1fr_55px] items-center gap-2"
          >
            <span className="text-center text-[11px] font-semibold text-gray-500">
              {expert.rank}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-gray-700">
                {expert.expertName}
              </span>

              <span className="truncate text-[9px] text-gray-400">
                {expert.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-[35px] text-[11px] font-semibold">
                {expert.orderCount}건
              </span>

              <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#28249C]"
                  style={{
                    width: `${
                      (expert.orderCount /
                        maxOrderCount) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <span className="text-right text-[11px] font-semibold text-gray-700">
              {expert.sharePercentage}%
            </span>

            <div className="h-[4px] overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-[#1877F2]"
                style={{
                  width: `${Math.min(
                    expert.sharePercentage * 5,
                    100,
                  )}%`,
                }}
              />
            </div>

            <div className="text-right">
              <Trend
                trend={{
                  ...expert.trend,
                  unit: '%',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end gap-4 text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[#28249C]" />
          상담 건수
        </span>

        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[#1877F2]" />
          상담 비중
        </span>

        <span>▲ 전월대비 증감율</span>
      </div>
    </Widget>
  );
}