import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type {
  MonthlySalesWidgetData,
} from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';
import { ChartLegend } from '../common/ChartLegend';

interface SalesWidgetProps {
  data: MonthlySalesWidgetData;
}

export function SalesWidget({
  data,
}: SalesWidgetProps) {
  return (
    <Widget className="mb-4">
      <WidgetHeader widget={data} />

      <div className="h-[300px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data.chartData}
            margin={{
              top: 25,
              right: 15,
              left: 0,
              bottom: 5,
            }}
            barGap={4}
          >
            <CartesianGrid
              stroke="#D2D6DB"
              vertical={false}
            />

            <XAxis
              dataKey="period"
              tick={{
                fontSize: 11,
                fill: '#7E8A96',
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 11,
                fill: '#7E8A96',
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;

                return (
                  <div className="rounded-input border border-neutral-200 bg-neutral-50 p-2.5 text-[11px] text-neutral-900 shadow-md">
                    <p className="mb-1.5 font-bold">{label}</p>
                    <div className="flex flex-col gap-1">
                      {payload.map((entry) => (
                        <div
                          key={entry.dataKey as string}
                          className="flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-neutral-700">{entry.name}</span>
                          </div>
                          <span className="font-semibold text-neutral-900">
                            {entry.value}
                            {data.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }}
            />

            {data.seriesConfigs.map(
              (series) => (
                <Bar
                  key={series.id}
                  dataKey={`values.${series.id}`}
                  name={series.label}
                  fill={series.colorCode}
                  radius={[3, 3, 0, 0]}
                  barSize={18}
                >
                  <LabelList
                    dataKey={`values.${series.id}`}
                    position="top"
                    className="text-[11px] font-semibold"
                  />
                </Bar>
              ),
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ChartLegend
        items={data.seriesConfigs}
        align="right"
      />
    </Widget>
  );
}