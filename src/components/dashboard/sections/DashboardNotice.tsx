import type { DashboardNoticeInfo } from '@/types/dashboard';

interface DashboardNoticeProps {
  data: DashboardNoticeInfo;
}

function renderFormattedMessage(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <span key={index} className="font-semibold text-neutral-500">
          {boldText}
        </span>
      );
    }
    return part;
  });
}

export function DashboardNotice({ data }: DashboardNoticeProps) {
  return (
    <section className="mb-4 flex min-h-[140px] w-full flex-col items-start gap-[10px] rounded-[16px] bg-primary-10 px-[32px] py-[24px]">
      <h2 className="text-[21px] font-bold leading-normal text-primary-600">
        💡 {data.title}
      </h2>

      <ul className="space-y-1 text-[17px] leading-5 text-neutral-500">
        {data.messages.map((message, index) => (
          <li key={index} className="flex gap-[6px]">
            <span>•</span>
            <span>{renderFormattedMessage(message)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}