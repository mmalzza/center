import type { DashboardNoticeInfo } from '@/types/dashboard';

interface DashboardNoticeProps {
  data: DashboardNoticeInfo;
}

export function DashboardNotice({
  data,
}: DashboardNoticeProps) {
  return (
    <section className="mb-4 rounded-[14px] bg-[#D7F7F7] px-5 py-4">
      <h2 className="mb-2 text-[14px] font-bold text-[#008080]">
        💡 {data.title}
      </h2>

      <ul className="space-y-1 text-[11px] leading-5 text-[#6C8585]">
        {data.messages.map((message) => (
          <li key={message} className="flex gap-1.5">
            <span>•</span>
            <span>{message}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}