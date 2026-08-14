import Link from 'next/link';
import { useRouter } from 'next/router';

import { User } from '@/types/user';

interface HeaderProps {
  user: User;
}

const consoleItems = [
  {
    id: 'center',
    label: '센터콘솔',
    href: '/',
  },
  {
    id: 'admin',
    label: '어드민콘솔',
    href: '/admin',
  },
  {
    id: 'expert',
    label: '전문가콘솔',
    href: '/expert',
  },
];

export function Header({ user }: HeaderProps) {
  const router = useRouter();

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  return (
    <header className="flex h-12 w-full shrink-0 items-center gap-4 bg-[#007777] px-6 py-3">
      <div className="flex shrink-0 items-center gap-[9px]">
        <img
          src="/icons/logomark.svg"
          alt="MINDCAFE"
          className="block h-6 w-auto"
        />

        <img
          src="/icons/logotype-container.svg"
          alt="MINDCAFE"
          className="block h-6 w-auto"
        />
      </div>

      <nav className="flex items-center gap-1">
        {consoleItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex h-9 cursor-pointer items-center justify-center gap-1 rounded-xl px-3 py-2.5 text-sm font-semibold leading-[160%] text-white no-underline ${
                active ? 'bg-[#005454]' : 'bg-transparent'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src="/icons/person.svg"
            alt=""
            className="flex aspect-square h-7 w-7 shrink-0 items-center justify-center gap-2 rounded-[40px] bg-[#d4f8f8] p-0.5"
          />

          <span className="whitespace-nowrap text-base font-bold leading-[160%] text-white">
            {user.centerName}
          </span>
        </div>

        <button
          type="button"
          className="flex h-8 cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#eef0f2] bg-white px-3 py-1.5 text-sm font-bold text-[#4E5760] hover:bg-[#f5f6f7]"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}
