import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { ReservationRateWidgetData } from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';
import { ChartLegend } from '../common/ChartLegend';

interface ReservationWidgetProps {
  data: ReservationRateWidgetData;
  className?: string;
}

export function ReservationWidget({
  data,
  className = '',
}: ReservationWidgetProps) {
  return (
    <Widget className={className}>
      <div className="flex w-full items-center justify-between">
        <WidgetHeader widget={data} />
      </div>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#D2D6DB"
              vertical={false}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="period"
              tick={{ fontSize: 11, fill: '#7E8A96' }}
              axisLine={{ stroke: '#D2D6DB' }}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 11, fill: '#7E8A96' }}
              axisLine={false}
              tickLine={false}
            />

            {data.referenceLine && (
              <ReferenceLine
                y={data.referenceLine.value}
                stroke="#7E8A96"
                strokeDasharray="4 4"
                label={{
                  value: `${data.referenceLine.label} (${data.referenceLine.value}${data.referenceLine.unit})`,
                  position: 'top',
                  fill: '#7E8A96',
                  fontSize: 10,
                  fontWeight: 600,
                }}
              />
            )}

            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;

                const sortedPayload = [...payload].sort((a, b) => {
                  const order = data.seriesConfigs.map((s) => `values.${s.id}`);
                  return (
                    order.indexOf(a.dataKey as string) -
                    order.indexOf(b.dataKey as string)
                  );
                });

                return (
                  <div className="rounded-input border border-neutral-200 bg-neutral-50 p-2.5 text-[11px] text-neutral-900 shadow-md">
                    <p className="mb-1.5 font-bold">{label}</p>
                    <div className="flex flex-col gap-1">
                      {sortedPayload.map((entry) => (
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

            {data.seriesConfigs.map((series) => (
              <Line
                key={series.id}
                type="monotone"
                dataKey={`values.${series.id}`}
                name={series.label}
                stroke={series.colorCode}
                strokeWidth={2}
                dot={{
                  r: 3,
                  fill: '#FFF',
                  stroke: series.colorCode,
                  strokeWidth: 2,
                }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ChartLegend items={data.seriesConfigs} align="right" />
    </Widget>
  );
}