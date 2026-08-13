import type { BaseWidget } from '@/types/dashboard';

interface WidgetHeaderProps {
  widget: Pick<
    BaseWidget,
    'title' | 'startDate' | 'endDate' | 'infoTooltipText'
  >;
}

export function WidgetHeader({
  widget,
}: WidgetHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-1">
      <h3 className="text-[15px] font-bold text-[#333]">
        {widget.title}
      </h3>

      <span className="text-[11px] font-medium text-gray-500">
        ({widget.startDate} ~ {widget.endDate})
      </span>

      <div className="group relative ml-0.5">
        <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full border border-gray-400 text-[10px] font-semibold text-gray-500">
          i
        </span>

        <div className="pointer-events-none absolute left-1/2 top-6 z-50 hidden w-[250px] -translate-x-1/2 rounded-lg bg-gray-800 px-3 py-2 text-[11px] leading-5 text-white shadow-lg group-hover:block">
          {widget.infoTooltipText}
        </div>
      </div>
    </div>
  );
}