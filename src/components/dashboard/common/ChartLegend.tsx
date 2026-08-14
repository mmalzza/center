import type { SeriesConfig } from '@/types/dashboard';

interface ChartLegendProps {
  items: SeriesConfig[];
  align?: 'left' | 'center' | 'right';
}

export function ChartLegend({
  items,
  align = 'right',
}: ChartLegendProps) {
  const alignment = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={`flex items-center gap-2 self-stretch ${alignment[align]}`}>
      {items.map((item) => (
        <span
          key={item.id}
          className="flex items-center gap-1.5 text-[12px] font-medium text-neutral-700"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: item.colorCode }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}