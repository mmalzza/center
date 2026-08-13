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

      <div className="h-[280px]">
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
              stroke="#E5E7EB"
              vertical={false}
            />

            <XAxis
              dataKey="period"
              tick={{
                fontSize: 10,
                fill: '#777',
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[50, 100]}
              ticks={[
                50,
                60,
                70,
                80,
                90,
                100,
              ]}
              tickFormatter={(value) =>
                `${value}%`
              }
              tick={{
                fontSize: 9,
                fill: '#999',
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value: number) => [
                `${value}%`,
                '연계율',
              ]}
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
                className="text-[9px] font-semibold"
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-100 pt-5">
        {data.bottomSummary.map((item) => (
          <div
            key={item.label}
            className="text-center"
          >
            <p className="text-[10px] text-gray-400">
              {item.label}
            </p>

            <strong
              className="mt-1 block text-[21px] font-bold"
              style={{
                color: data.colorCode,
              }}
            >
              {item.value}
              <span className="ml-0.5 text-[11px]">
                {item.unit}
              </span>
            </strong>
          </div>
        ))}
      </div>
    </Widget>
  );
}