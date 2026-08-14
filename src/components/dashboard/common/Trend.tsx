import type { TrendInfo, MetricUnit } from '@/types/dashboard';

interface TrendProps {
  trend: TrendInfo;
  defaultUnit?: MetricUnit;
}

export function Trend({ trend, defaultUnit = '%' }: TrendProps) {
  if (trend.direction === 'NONE') {
    return (
      <span className="text-[12px] font-medium text-neutral-300">
        —
      </span>
    );
  }

  const isUp = trend.direction === 'UP';

  return (
    <span
      className={`inline-flex h-[20px] items-center gap-[2px] p-[4px] rounded-[4px] text-[12px] font-semibold ${
        isUp
          ? 'bg-[#E0FFE1] text-[#13B981]'
          : 'bg-[#FEEAED] text-red-500'
      }`}
    >
      <img
        src={isUp ? '/icons/arrow_upward.svg' : '/icons/arrow_downward.svg'}
        alt={isUp ? '상승' : '하락'}
        className="h-3 w-3"
      />
      {trend.value}
      {trend.unit ?? defaultUnit}
    </span>
  );
}