import type { ReactNode } from 'react';

interface WidgetProps {
  children: ReactNode;
  className?: string;
}

export function Widget({
  children,
  className = '',
}: WidgetProps) {
  return (
    <section
      className={`rounded-[14px] border border-[#E5E5E5] bg-white p-4 ${className}`}
    >
      {children}
    </section>
  );
}