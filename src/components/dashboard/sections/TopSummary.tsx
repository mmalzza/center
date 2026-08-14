import type { TopSummaryBarData } from '@/types/dashboard';

import { Trend } from '../common/Trend';

interface TopSummaryProps {
  data: TopSummaryBarData;
}

export function TopSummary({ data }: TopSummaryProps) {
  return (
    <section className="mb-5 flex items-center overflow-hidden rounded-[16px] bg-neutral-50 py-5">
      {/* 1. 가장 좌측 해당 월 영역 */}
      <div className="flex min-w-[100px] items-center justify-center border-r border-neutral-200 px-6">
        <span className="text-[21px] font-bold text-neutral-900">
          {data.targetMonth}
        </span>
      </div>

      {/* 2. 요약 지표 영역 (3개 카드를 분할 렌더링) */}
      <div className="grid flex-1 grid-cols-3 divide-x divide-neutral-200">
        {data.metrics.map((metric) => (
          <div key={metric.id} className="flex flex-col items-center px-6">
            {/* 지표 라벨 */}
            <p className="text-[15px] font-semibold text-neutral-500">
              {metric.label}
            </p>

            {/* 당월 수치 */}
            <div className="mt-1 flex items-baseline gap-1">
              <strong className="text-[21px] font-bold text-neutral-900">
                {metric.value.toLocaleString()}
              </strong>
              <span className="text-[21px] font-bold text-neutral-900">
                {metric.unit}
              </span>

              {/* accumulatedValue가 존재하는 지표만 누적 정보 표시 */}
              {metric.accumulatedValue !== undefined && (
                <span className="ml-1 text-[12px] font-semibold text-neutral-500">
                  / 누적 {metric.accumulatedValue.toLocaleString()}{metric.unit}
                </span>
              )}
            </div>

            {/* 지난달 대비 증감 추이 */}
            <div className="mt-1 flex items-center gap-1.5 font-semibold text-[12px] text-neutral-500">
              <span>{metric.comparisonLabel}</span>
              <Trend trend={metric.trend} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}