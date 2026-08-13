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

import type {
  ReservationRateWidgetData,
} from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';
import { ChartLegend } from '../common/ChartLegend';

interface ReservationWidgetProps {
  data: ReservationRateWidgetData;
}

export function ReservationWidget({
  data,
}: ReservationWidgetProps) {
  return (
    <Widget>
      <WidgetHeader widget={data} />

      <div className="h-[315px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data.chartData}
            margin={{
              top: 15,
              right: 10,
              left: -20,
              bottom: 5,
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
              tick={{
                fontSize: 9,
                fill: '#999',
              }}
              axisLine={false}
              tickLine={false}
            />

            {data.referenceLine && (
              <ReferenceLine
                y={data.referenceLine.value}
                stroke="#BDBDBD"
                strokeDasharray="4 4"
              />
            )}

            <Tooltip />

            {data.seriesConfigs.map(
              (series) => (
                <Line
                  key={series.id}
                  type="monotone"
                  dataKey={`values.${series.id}`}
                  name={series.label}
                  stroke={series.colorCode}
                  strokeWidth={2}
                  dot={{
                    r: 3,
                    fill: '#fff',
                    stroke: series.colorCode,
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 5 }}
                />
              ),
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ChartLegend
        items={data.seriesConfigs}
      />
    </Widget>
  );
}