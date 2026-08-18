import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type {
  ConnectionTooltipDetails,
  ExpertConnectionWidgetData,
} from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';

interface ExpertConnectionWidgetProps {
  data: ExpertConnectionWidgetData;
}

export function ExpertConnectionWidget({
  data,
}: ExpertConnectionWidgetProps) {
  return (
    <Widget>
      <WidgetHeader widget={data} />

      <div className="h-[280px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data.chartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
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
              domain={[50, 100]}
              ticks={[50, 60, 70, 80, 90, 100]}
              tickFormatter={(value) =>
                `${value}%`
              }
              tick={{
                fontSize: 11,
                fill: '#7E8A96',
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;

                const tooltipDetails = payload[0]?.payload?.tooltipDetails as
                  | ConnectionTooltipDetails
                  | undefined;

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
                            {entry.value ?? 0}%
                          </span>
                        </div>
                      ))}

                      {tooltipDetails && (
                        <div className="mt-1 flex flex-col gap-1 border-t border-neutral-200 pt-1">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-neutral-700">예약 인입</span>
                            <span className="font-semibold text-neutral-900">
                              {tooltipDetails.inboundCount}건
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-neutral-700">예약 수락</span>
                            <span className="font-semibold text-neutral-900">
                              {tooltipDetails.acceptedCount}건
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            />

            <Line
              type="monotone"
              dataKey="rate"
              name="연계율"
              stroke={data.colorCode}
              strokeWidth={2}
              dot={{
                r: 4,
                fill: '#fff',
                stroke: data.colorCode,
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
              }}
            >
              <LabelList
                dataKey="rate"
                position="top"
                formatter={(value) =>
                  `${value}%`
                }
                className="text-[12px] font-semibold"
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 w-full grid grid-cols-3 divide-x divide-neutral-200 border-t border-neutral-50 pt-5">
        {data.bottomSummary.map((item) => (
          <div
            key={item.label}
            className="text-center"
          >
            <p className="text-[12px] text-neutral-700">
              {item.label}
            </p>

            <strong
              className="mt-1 block text-[24px] font-bold"
              style={{
                color: data.colorCode,
              }}
            >
              {item.value}
              <span className="ml-0.5 text-[24px]">
                {item.unit}
              </span>
            </strong>
          </div>
        ))}
      </div>
    </Widget>
  );
}