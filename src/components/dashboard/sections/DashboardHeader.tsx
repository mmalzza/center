import type { DashboardHeaderInfo } from '@/types/dashboard';

interface DashboardHeaderProps {
  data: DashboardHeaderInfo;
  lastUpdated: string;
  onRefresh?: () => void;
}

export function DashboardHeader({
  data,
  lastUpdated,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <header className="mb-4 flex w-full items-center justify-between">
      <h1 className="text-[24px] font-bold text-neutral-900">
        {data.pageTitle}
      </h1>

      <div className="flex items-center gap-[16px]">
        <span className="text-body font-regular leading-none text-neutral-300">
          마지막 업데이트: {lastUpdated}
        </span>

        <button
          type="button"
          onClick={onRefresh}
          className="flex h-[32px] items-center justify-center gap-[4px] rounded-button border-2 border-primary-500 bg-white px-[12px] py-[6px] text-[14px] font-bold text-primary-500 transition hover:bg-neutral-50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/replay.svg"
            alt="새로고침"
            className="h-4 w-4"
          />
          <span>새로고침</span>
        </button>
      </div>
    </header>
  );
}