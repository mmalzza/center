import type { TopSummaryBarData } from '@/types/dashboard';

import { Trend } from '../common/Trend';

interface TopSummaryProps {
  data: TopSummaryBarData;
}

export function TopSummary({
  data,
}: TopSummaryProps) {
  return (
    <section className="mb-5 grid grid-cols-3 overflow-hidden rounded-[14px] bg-[#F1F3F5]">
      {data.metrics.map((metric, index) => (
        <div
          key={metric.id}
          className={`px-6 py-5 text-center ${
            index !== 0
              ? 'border-l border-gray-200'
              : ''
          }`}
        >
          <p className="text-[11px] font-medium text-gray-500">
            {metric.label}
          </p>

          <div className="mt-1 flex items-end justify-center gap-1">
            <strong className="text-[24px] font-bold text-[#333]">
              {metric.value}
            </strong>

            <span className="mb-1 text-[12px] font-medium text-gray-500">
              {metric.unit}
            </span>
          </div>

          <div className="mt-1 flex items-center justify-center gap-1">
            <span className="text-[10px] text-gray-400">
              {metric.comparisonLabel}
            </span>

            <Trend trend={metric.trend} />
          </div>
        </div>
      ))}
    </section>
  );
}