import { useState } from 'react';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';

import type {
  DonutChartSegment,
  RepurchaseWidgetData,
  SeriesConfig,
} from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';
import { Trend } from '../common/Trend';
import { ChartLegend } from '../common/ChartLegend';

interface RepurchaseWidgetProps {
  data: RepurchaseWidgetData;
}

type Segment = 'ALL' | 'B2C' | 'B2B';

const SEGMENT_OPTIONS: { id: Segment; label: string }[] = [
  { id: 'ALL', label: '전체' },
  { id: 'B2C', label: 'B2C' },
  { id: 'B2B', label: 'B2B' },
];

const RADIAN = Math.PI / 180;

function renderSliceLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  percent,
}: PieLabelRenderProps) {
  if (!percent || percent < 0.05) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fill="#fff"
      fontSize={11}
      fontWeight={700}
    >
      {`${value}%`}
    </text>
  );
}

export function RepurchaseWidget({
  data,
}: RepurchaseWidgetProps) {
  const [segment, setSegment] = useState<Segment>('ALL');

  const activeData =
    segment === 'ALL'
      ? { summary: data.summary, chartData: data.chartData }
      : data.segments?.[segment] ?? { summary: data.summary, chartData: data.chartData };

  const legendItems: SeriesConfig[] =
    activeData.chartData.map((item) => ({
      id: item.id,
      label: item.label,
      colorCode: item.colorCode,
    }));

  return (
    <Widget>
      <div className="flex w-full items-center justify-between">
        <WidgetHeader widget={data} />

        <div className="ml-auto flex gap-1">
          {SEGMENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setSegment(option.id)}
              className={
                segment === option.id
                  ? 'rounded-button bg-primary-500 px-3 py-1.5 text-body font-semibold text-white'
                  : 'rounded-button border border-neutral-500 px-3 py-1.5 text-body font-semibold text-neutral-500'
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex h-[240px] w-full items-center">
        <div className="flex w-[42%] flex-col items-center">
          <span className="text-[13px] font-bold text-neutral-700">
            {activeData.summary.label}
          </span>

          <strong className="mt-1 text-[40px] font-bold text-neutral-900">
            {activeData.summary.rate.toFixed(1)}%
          </strong>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[12px] text-neutral-500">
              {activeData.summary.comparisonLabel}
            </span>

            <Trend
              trend={{
                ...activeData.summary.trend,
                unit: '%',
              }}
            />
          </div>
        </div>

        <div className="h-[230px] w-[58%]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={activeData.chartData}
                dataKey="percentage"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={88}
                stroke="none"
                label={renderSliceLabel}
                labelLine={false}
              >
                {activeData.chartData.map((item) => (
                  <Cell
                    key={item.id}
                    fill={item.colorCode}
                  />
                ))}
              </Pie>

              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;

                  const item = payload[0].payload as DonutChartSegment;

                  return (
                    <div className="rounded-input border border-neutral-200 bg-neutral-50 p-2.5 text-[11px] text-neutral-900 shadow-md">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: item.colorCode }}
                            />
                            <span className="text-neutral-700">{item.label}</span>
                          </div>
                          <span className="font-semibold text-neutral-900">
                            {item.percentage}% / {item.userCount}명
                          </span>
                        </div>

                        {item.tooltipDetails?.map((detail) => (
                          <div
                            key={detail.label}
                            className="flex items-center justify-between gap-4 pl-3.5"
                          >
                            <span className="text-neutral-700">{detail.label}</span>
                            <span className="font-semibold text-neutral-900">
                              {detail.count}
                              {detail.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ChartLegend items={legendItems} />
    </Widget>
  );
}