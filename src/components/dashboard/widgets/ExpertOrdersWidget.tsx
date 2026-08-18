import { useState } from 'react';

import type {
  ExpertOrdersWidgetData,
} from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';
import { Trend } from '../common/Trend';
import { ChartLegend } from '../common/ChartLegend';

interface ExpertOrdersWidgetProps {
  data: ExpertOrdersWidgetData;
}

function maskExpertName(name: string) {
  const [surname, ...rest] = name;

  return surname + 'ㅇ'.repeat(rest.length);
}

export function ExpertOrdersWidget({
  data,
}: ExpertOrdersWidgetProps) {
  const defaultCategoryId = data.categories[0]?.id;

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    defaultCategoryId,
  );
  const [isNameMasked, setIsNameMasked] = useState(false);

  const categoryFilteredData =
    selectedCategoryId === defaultCategoryId
      ? data.chartData
      : data.chartData.filter(
          (expert) =>
            expert.category ===
            data.categories.find(
              (category) => category.id === selectedCategoryId,
            )?.label,
        );

  const maxOrderCount = Math.max(
    1,
    ...categoryFilteredData.map(
      (item) => item.orderCount,
    ),
  );

  return (
    <Widget className="mb-4">
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="[&>div]:mb-0">
          <WidgetHeader widget={data} />
        </div>

        {data.hasNameMaskingToggle && (
          <div className="flex items-center gap-2 text-[12px] text-neutral-500">
            성명 숨김
            <button
              type="button"
              role="switch"
              aria-checked={isNameMasked}
              aria-label="성명 숨김"
              onClick={() => setIsNameMasked((prev) => !prev)}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                isNameMasked ? 'bg-primary-500' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  isNameMasked ? 'translate-x-0' : 'translate-x-4'
                }`}
              />
            </button>
          </div>
        )}
      </div>

      <div className="mb-5 flex gap-1.5 overflow-x-auto">
        {data.categories.map(
          (category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`whitespace-nowrap rounded-button px-3 py-1.5 font-semibold text-[14px] ${
                category.id === selectedCategoryId
                  ? 'bg-primary-500 font-semibold text-white'
                  : 'border border-neutral-200 bg-white text-neutral-500'
              }`}
            >
              {category.label}
            </button>
          ),
        )}
      </div>

      <div className="h-[184px] w-full space-y-4 overflow-hidden">
        {categoryFilteredData.map((expert) => (
          <div
            key={expert.rank}
            className="grid grid-cols-[30px_170px_1fr_60px_1fr_55px] items-center gap-2"
          >
            <span className="text-center text-[16px] font-semibold text-neutral-500">
              {expert.rank}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[16px] font-semibold text-neutral-900">
                {isNameMasked
                  ? maskExpertName(expert.expertName)
                  : expert.expertName}
              </span>

              <span className="truncate text-[12px] text-neutral-500">
                {expert.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-[35px] text-[13px] font-semibold text-neutral-900">
                {expert.orderCount}건
              </span>

              <div className="h-[4px] flex-1 overflow-hidden rounded-full bg-neutral-200">
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

            <span className="text-right text-[13px] font-semibold text-neutral-700">
              {expert.sharePercentage}%
            </span>

            <div className="h-[4px] overflow-hidden rounded-full bg-neutral-200">
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

      <ChartLegend items={data.seriesConfigs} align="right" />
    </Widget>
  );
}