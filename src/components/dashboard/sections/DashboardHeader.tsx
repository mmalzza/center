import type { DashboardHeaderInfo } from '@/types/dashboard';

interface DashboardHeaderProps {
  data: DashboardHeaderInfo;
}

export function DashboardHeader({
  data,
}: DashboardHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-[20px] font-bold text-[#333]">
          {data.pageTitle}
        </h1>

        <p className="mt-1 text-[11px] text-gray-400">
          마지막 업데이트: {data.lastUpdated}
        </p>
      </div>

      <button className="rounded-lg border border-[#008B8B] bg-white px-4 py-2 text-[12px] font-semibold text-[#008B8B] transition hover:bg-[#008B8B] hover:text-white">
        ↻ 새로고침
      </button>
    </div>
  );
}