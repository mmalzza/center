import type {
  ConversionProgressWidgetData,
} from '@/types/dashboard';

import { Widget } from '../common/Widget';
import { WidgetHeader } from '../common/WidgetHeader';
import { Trend } from '../common/Trend';

interface ConversionWidgetProps {
  data: ConversionProgressWidgetData;
}

export function ConversionWidget({
  data,
}: ConversionWidgetProps) {
  return (
    <Widget>
      <WidgetHeader widget={data} />

      <div className="flex h-[250px] flex-col items-center justify-center">
        <div className="flex items-end gap-1">
          <strong className="text-[42px] font-bold leading-none text-[#008B8B]">
            {data.conversionRate}
          </strong>

          <span className="mb-1 text-[20px] font-bold text-[#008B8B]">
            %
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <span className="text-[10px] text-gray-400">
            {data.comparisonLabel}
          </span>

          <Trend
            trend={{
              ...data.trend,
              unit: '%',
            }}
          />
        </div>

        <div className="mt-6 w-full">
          <div className="h-[22px] overflow-hidden rounded-full bg-[#F0F2F4]">
            <div
              className="h-full rounded-r-full"
              style={{
                width: `${data.conversionRate}%`,
                backgroundColor: data.colorCode,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-[11px]">
            <span
              className="font-semibold"
              style={{
                color: data.colorCode,
              }}
            >
              {data.numerator.label}{' '}
              {data.numerator.value}
              {data.numerator.unit}
            </span>

            <span className="font-semibold text-gray-500">
              {data.denominator.label}{' '}
              {data.denominator.value}
              {data.denominator.unit}
            </span>
          </div>
        </div>
      </div>
    </Widget>
  );
}