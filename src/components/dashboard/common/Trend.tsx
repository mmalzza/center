import type { TrendInfo } from '@/types/dashboard';

interface TrendProps {
  trend: TrendInfo;
  defaultUnit?: string;
}

export function Trend({
  trend,
  defaultUnit = '%',
}: TrendProps) {
  if (trend.direction === 'NONE') {
    return (
      <span className="text-[12px] font-medium text-gray-400">
        —
      </span>
    );
  }

  const isUp = trend.direction === 'UP';

  return (
    <span
      className={`text-[12px] font-semibold ${
        isUp ? 'text-[#13B981]' : 'text-[#FF3B57]'
      }`}
    >
      {isUp ? '▲' : '▼'}
      {trend.value}
      {trend.unit ?? defaultUnit}
    </span>
  );
}