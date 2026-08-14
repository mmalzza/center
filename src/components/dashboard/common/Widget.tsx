import type { ReactNode } from 'react';

interface WidgetProps {
  children: ReactNode;
  className?: string;
}

export function Widget({ children, className = '' }: WidgetProps) {
  return (
    <section
      className={`
        flex flex-col items-start gap-3 
        p-3 shrink-0 self-stretch 
        rounded-[15px] border border-neutral-200 bg-white
        ${className}
      `.trim()}
    >
      {children}
    </section>
  );
}