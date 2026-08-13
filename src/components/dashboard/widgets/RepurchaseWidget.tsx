import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import type {
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

export function RepurchaseWidget({
  data,
}: RepurchaseWidgetProps) {
  const legendItems: SeriesConfig[] =
    data.chartData.map((item) => ({
      id: item.id,
      label: item.label,
      colorCode: item.colorCode,
    }));

  return (
    <Widget>
      <div className="flex items-start justify-between">
        <WidgetHeader widget={data} />

        <div className="flex gap-1">
          <button className="rounded-full bg-[#008B8B] px-3 py-1.5 text-[10px] font-semibold text-white">
            전체
          </button>

          <button className="rounded-full border border-gray-200 px-3 py-1.5 text-[10px] text-gray-500">
            B2C
          </button>

          <button className="rounded-full border border-gray-200 px-3 py-1.5 text-[10px] text-gray-500">
            B2B
          </button>
        </div>
      </div>

      <div className="flex h-[270px] items-center">
        <div className="flex w-[42%] flex-col items-center">
          <span className="text-[13px] font-bold text-gray-700">
            {data.summary.label}
          </span>

          <strong className="mt-1 text-[32px] font-bold text-[#333]">
            {data.summary.rate.toFixed(1)}%
          </strong>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[10px] text-gray-400">
              {data.summary.comparisonLabel}
            </span>

            <Trend
              trend={{
                ...data.summary.trend,
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
                data={data.chartData}
                dataKey="percentage"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={88}
                stroke="none"
              >
                {data.chartData.map((item) => (
                  <Cell
                    key={item.id}
                    fill={item.colorCode}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(
                  value: number,
                  _: string,
                  item: any,
                ) => [
                  `${value}% / ${item.payload.userCount}명`,
                  item.payload.label,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ChartLegend items={legendItems} />
    </Widget>
  );
}