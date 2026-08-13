import type { SeriesConfig } from '@/types/dashboard';

interface ChartLegendProps {
  items: SeriesConfig[];
  align?: 'left' | 'center' | 'right';
}

export function ChartLegend({
  items,
  align = 'center',
}: ChartLegendProps) {
  const alignment = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      className={`flex gap-4 ${alignment[align]}`}
    >
      {items.map((item) => (
        <span
          key={item.id}
          className="flex items-center gap-1 text-[10px] text-gray-500"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: item.colorCode,
            }}
          />

          {item.label}
        </span>
      ))}
    </div>
  );
}