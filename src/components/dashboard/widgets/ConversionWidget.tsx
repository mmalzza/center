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

      <div className="flex h-[296px] w-full flex-col items-center justify-center">
        <div className="flex items-end gap-1">
          <strong className="text-[48px] font-bold leading-none text-primary-500">
            {data.conversionRate}%
          </strong>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <span className="text-[12px] text-neutral-500">
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
          <div className="h-[22px] overflow-hidden rounded-full bg-neutral-50">
            <div
              className="h-full rounded-r-full"
              style={{
                width: `${data.conversionRate}%`,
                backgroundColor: data.colorCode,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-[16px]">
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

            <span className="font-semibold text-neutral-500">
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