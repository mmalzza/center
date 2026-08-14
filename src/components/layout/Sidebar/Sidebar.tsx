import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { User } from '@/types/user';

import Link from 'next/link';

interface SidebarProps {
  user: User;
}

interface QuickAction {
  id: string;
  label: string;
  openIcon: string;
  collapsedIcon: string;
  href: string;
  variant?: 'default' | 'secondary';
  count?: number;
}

const quickActions: QuickAction[] = [
  {
    id: 'reservation',
    label: '예약하기',
    openIcon: '/icons/add.svg',
    collapsedIcon: '/icons/event_add.svg',
    href: '/reservations/new',
  },
  {
    id: 'client',
    label: '내담자 등록하기',
    openIcon: '/icons/add.svg',
    collapsedIcon: '/icons/person_add.svg',
    href: '/clients/new',
  },
  {
    id: 'waiting',
    label: '대기예약',
    openIcon: '/icons/arrow_forward_ios.svg',
    collapsedIcon: '/icons/event_upcoming.svg',
    href: '/reservations/waiting',
    variant: 'secondary',
    count: 8,
  },
];

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  hasSubMenu?: boolean;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: '홈', icon: '/icons/home.svg', href: '/home' },
  { id: 'reservations', label: '예약 일정', icon: '/icons/calendar_today.svg', href: '/reservations' },
  { id: 'counselings', label: '상담방', icon: '/icons/forum.svg', href: '/counselings' },
  { id: 'clients', label: '내담자 관리', icon: '/icons/group.svg', href: '/clients' },
  { id: 'documents', label: '문서', icon: '/icons/draft.svg', href: '/documents' },
  { id: 'message', label: '메시지', icon: '/icons/mail.svg', hasSubMenu: true },
  { id: 'calls', label: '통화 이력', icon: '/icons/call.svg', href: '/calls' },
  { id: 'experts', label: '전문가', icon: '/icons/award_star.svg', href: '/experts' },
  { id: 'products', label: '상품', icon: '/icons/hand_package.svg', href: '/products' },
  { id: 'sales', label: '판매', icon: '/icons/paid.svg', href: '/sales' },
  { id: 'reviews', label: '후기', icon: '/icons/outlined.svg', href: '/reviews' },
  { id: 'history', label: '이용 기록', icon: '/icons/history.svg', href: '/history' },
  { id: 'dashboard', label: '대시보드', icon: '/icons/bar_chart_4_bars.svg', href: '/' },
  { id: 'settings', label: '설정', icon: '/icons/settings.svg', href: '/settings' },
];

const messageItems = [
  { id: 'send', label: '문자 발송', href: '/messages/send' },
  { id: 'manage', label: '문자 관리', href: '/messages/manage' },
  { id: 'alimtalk', label: '알림톡', href: '/messages/alimtalk' },
  { id: 'history', label: '메시지 내역', href: '/messages/history' },
];

export function Sidebar({ user }: SidebarProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const isMessagePage = messageItems.some(
    (item) => router.pathname === item.href
  );

  useEffect(() => {
    if (isMessagePage) {
      setIsMessageOpen(true);
    }
  }, [isMessagePage]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMessageToggle = () => {
    setIsMessageOpen((prev) => !prev);
  };

  const isActive = (href?: string) => {
    if (!href) return false;

    return router.pathname === href;
  };

  return (
    <aside
      className={`flex h-full min-h-0 shrink-0 flex-col items-center gap-1 border-r border-[#e1e4e8] bg-[#fafbfc] p-3 [transition:width_0.2s_ease] ${
        isOpen ? 'w-[188px]' : 'w-[72px]'
      }`}
    >
      {/* 인사말 */}
      <div
        className={`flex h-16 shrink-0 items-center gap-2 self-stretch rounded-lg text-sm font-normal ${
          isOpen ? 'px-2 py-2.5' : 'justify-center p-2.5'
        }`}
      >
        {isOpen && (
          <p>
            안녕하세요,
            <br />
            {user.name}님!
          </p>
        )}

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-[#eef0f2] p-2"
          onClick={handleToggle}
          aria-label={
            isOpen
              ? '사이드바 접기'
              : '사이드바 펼치기'
          }
        >
          <img
            src="/icons/panel_righ_t.svg"
            alt=""
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* 빠른 액션 */}
      <div className="flex w-full flex-col gap-1.5 pb-2">
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`flex h-[42px] w-full cursor-pointer items-center gap-1.5 rounded-[10px] border text-sm font-bold text-[#4E5760] shadow-[0_0_8px_rgba(55,61,68,0.08)] ${
              action.variant === 'secondary'
                ? 'border-[#e1e4e8] bg-white'
                : 'border-[#70dcdc] bg-[#d4f8f8]'
            } ${isOpen ? 'py-2.5 pr-3 pl-4' : 'justify-center p-2.5'}`}
            onClick={() => router.push(action.href)}
            aria-label={action.count !== undefined ? `${action.label} (${action.count})` : action.label}
            title={!isOpen ? action.label : undefined}
          >
            {isOpen && ( // 사이드바 상태에 따라서
              <span className="flex-1 text-left leading-[160%]">
                {action.label}

                {action.count !== undefined && (
                  <>
                    {' '}
                    <span className="text-[#ff3b3b]">
                      ({action.count})
                    </span>
                  </>
                )}
              </span>
            )}

            <span className="flex h-4 w-4 shrink-0 items-center justify-center">
              <img
                src={
                  isOpen
                    ? action.openIcon
                    : action.collapsedIcon
                }
                alt=""
                width={16}
                height={16}
              />
            </span>
          </button>
        ))}
      </div>

      {/* 메뉴 */}
      <nav className="flex w-full min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const isMessageMenu = item.id === 'message';

          const active = item.href
            ? isActive(item.href)
            : false;

          return (
            <div key={item.id}>
              {isMessageMenu ? (
                <button
                  type="button"
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border-none px-2 py-2.5 no-underline hover:bg-[#f3f4f6] ${
                    active ? 'bg-[#eef0f2]' : 'bg-transparent'
                  }`}
                  title={!isOpen ? item.label : undefined}
                  aria-label={item.label}
                  aria-expanded={isMessageOpen}
                  onClick={handleMessageToggle}
                >
                  <img
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 shrink-0"
                  />

                  {isOpen && (
                    <span className="whitespace-nowrap text-sm font-bold leading-[160%] text-[#4E5760]">
                      {item.label}
                    </span>
                  )}

                  {isOpen && item.hasSubMenu && (
                    <img
                      src={
                        isMessageOpen
                          ? '/icons/arrow_drop_up.svg'
                          : '/icons/arrow_drop_down.svg'
                      }
                      alt=""
                      width={20}
                      height={20}
                      className="ml-auto h-5 w-5 shrink-0"
                    />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border-none px-2 py-2.5 no-underline hover:bg-[#f3f4f6] ${
                    active ? 'bg-[#eef0f2]' : 'bg-transparent'
                  }`}
                  title={!isOpen ? item.label : undefined}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  <img
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 shrink-0"
                  />

                  {isOpen && (
                    <span className="whitespace-nowrap text-sm font-bold leading-[160%] text-[#4E5760]">
                      {item.label}
                    </span>
                  )}
                </Link>
              )}

              {/* 메시지 하위 메뉴 */}
              {isOpen &&
                isMessageMenu &&
                isMessageOpen && (
                  <div className="flex flex-col gap-0.5 pt-0 pr-2 pb-1 pl-9">
                    {messageItems.map((subItem) => {
                    const subActive = isActive(subItem.href);

                    return (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className={`flex min-h-[36px] w-full cursor-pointer items-center rounded-md border-0 px-3 py-2 text-left text-sm font-normal text-[#4e5760] no-underline hover:bg-[#f3f4f6] ${
                          subActive ? 'bg-[#eef0f2]' : 'bg-transparent'
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    );
                  })}
                  </div>
                )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
