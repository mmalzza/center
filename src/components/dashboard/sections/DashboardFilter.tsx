import { useState } from 'react';

import { useDashboardFilter } from '@/contexts/DashboardFilterContext';
import type { DashboardFilterConfig, DashboardGranularity } from '@/types/dashboard';
import { formatDotDate } from '@/utils/date';

import { DateRangeCalendar } from './DateRangeCalendar';

interface DashboardFilterProps {
  data: DashboardFilterConfig;
}

export function DashboardFilter({ data }: DashboardFilterProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { dateRange, selectedPreset, granularity, setPreset, setRange, setGranularity } =
    useDashboardFilter();

  return (
    <div className="relative mb-4 flex w-full items-center justify-between self-stretch">
      <div className="flex items-center gap-2">
        {/* 기간 프리셋 버튼 목록 */}
        <div className="flex gap-2">
          {data.presetOptions.map((option) => {
            const isActive = selectedPreset === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setPreset(option.id)}
                className={`flex items-center rounded-button px-4 py-2 text-body font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white' // 활성화
                    : 'border border-neutral-500 bg-white text-neutral-900 hover:border-primary-500 hover:text-primary-500' // 비활성화
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* 날짜 선택 달력 팝오버 트리거 */}
        <div className="relative">
          <div
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            className="flex h-9 cursor-pointer items-center rounded-input border border-neutral-500 bg-white px-3 text-body text-neutral-900 hover:border-primary-500"
          >
            맞춤 설정
          </div>

          {isCalendarOpen && (
            <div className="absolute left-0 top-11 z-50">
              <DateRangeCalendar
                start={dateRange.start}
                end={dateRange.end}
                onApply={(range) => {
                  setRange(range);
                  setIsCalendarOpen(false);
                }}
              />
            </div>
          )}
        </div>

        {/* 집계 단위 셀렉트 (일별/주별/월별) */}
        <select
          value={granularity}
          onChange={(e) => setGranularity(e.target.value as DashboardGranularity)}
          className="h-9 rounded-input border border-neutral-500 bg-white px-3 text-body text-neutral-900 outline-none"
        >
          {data.aggregationOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 우측: 선택된 날짜 표출 영역 & 조회 버튼 */}
      <div className="flex items-center gap-3">
        <span className="text-body text-neutral-900">
          조회 기간: {formatDotDate(dateRange.start)} ~ {formatDotDate(dateRange.end)}
        </span>

        <button
          onClick={() => setIsCalendarOpen(false)}
          className="flex items-center rounded-button border border-[#A2EDEE] bg-primary-10 px-[14px] py-[8px] text-body font-medium text-primary-500"
        >
          조회
        </button>
      </div>
    </div>
  );
}