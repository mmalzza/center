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

      <div className="h-[300px]">
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

            <Tooltip />

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
                    className="text-[8px] font-semibold"
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