import { Children, useRef, useState, useEffect } from 'react';

import { DayPicker } from 'react-day-picker';
import type {
  DateRange as RdpDateRange,
  DayButtonProps,
  MonthProps,
  NextMonthButtonProps,
  PreviousMonthButtonProps,
} from 'react-day-picker';

import type { DateRange } from '@/utils/date';

interface DateRangeCalendarProps {
  start: Date;
  end: Date;
  onApply: (range: DateRange) => void;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const pad2 = (n: number) => String(n).padStart(2, '0');

function PreviousButton(props: PreviousMonthButtonProps) {
  return (
    <button
      {...props}
      type="button"
      aria-label="이전 달"
      className="flex h-7 w-7 items-center justify-center rounded text-neutral-500 hover:bg-neutral-50"
    >
      ‹
    </button>
  );
}

function NextButton(props: NextMonthButtonProps) {
  return (
    <button
      {...props}
      type="button"
      aria-label="다음 달"
      className="flex h-7 w-7 items-center justify-center rounded text-neutral-500 hover:bg-neutral-50"
    >
      ›
    </button>
  );
}

function CalendarMonth({
  className,
  children,
  calendarMonth: _calendarMonth,
  displayIndex: _displayIndex,
  ...props
}: MonthProps) {
  const [previousButton, captionLabel, nextButton, monthGrid] = Children.toArray(children);

  return (
    <div className={className} {...props}>
      <div className="mb-2 flex items-center justify-between">
        {previousButton}
        {captionLabel}
        {nextButton}
      </div>
      {monthGrid}
    </div>
  );
}

function CalendarDayButton({ day: _day, modifiers, className: _className, ...props }: DayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const stateClassName = modifiers.range_middle
    ? 'bg-primary-10 text-primary-500'
    : modifiers.selected
      ? 'bg-primary-500 text-white'
      : 'text-neutral-700 hover:bg-neutral-50';

  return (
    <button
      ref={ref}
      {...props}
      type="button"
      className={`h-7 w-7 rounded-full text-[12px] ${stateClassName}`}
    />
  );
}

export function DateRangeCalendar({
  start,
  end,
  onApply,
}: DateRangeCalendarProps) {
  const [selected, setSelected] = useState<RdpDateRange | undefined>(undefined);

  return (
    <DayPicker
      mode="range"
      min={1}
      defaultMonth={start}
      selected={selected}
      onSelect={(range) => {
        setSelected(range);

        if (range?.from && range?.to) {
          onApply({ start: range.from, end: range.to });
        }
      }}
      weekStartsOn={0}
      showOutsideDays={false}
      fixedWeeks
      navLayout="around"
      formatters={{
        formatCaption: (month) =>
          `${month.getFullYear()}.${pad2(month.getMonth() + 1)}`,
        formatWeekdayName: (weekday) => WEEKDAYS[weekday.getDay()],
      }}
      components={{
        PreviousMonthButton: PreviousButton,
        NextMonthButton: NextButton,
        Month: CalendarMonth,
        DayButton: CalendarDayButton,
      }}
      className="w-[280px] rounded-input border border-neutral-300 bg-white p-3 shadow-lg"
      classNames={{
        month_caption: 'flex-1 text-center',
        caption_label: 'text-[13px] font-semibold text-neutral-700',
        month_grid: 'w-full table-fixed',
        weekday: 'h-6 text-center text-[11px] text-neutral-300',
        day: 'text-center',
      }}
    />
  );
}
