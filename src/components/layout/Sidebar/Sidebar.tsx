import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { User } from '@/types/user';

import styles from './Sidebar.module.css';
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
      className={`${styles.sidebar} ${
        !isOpen ? styles.collapsed : ''
      }`}
    >
      {/* 인사말 */}
      <div className={styles.greeting}>
        {isOpen && (
          <p className={styles.greetingText}>
            안녕하세요,
            <br />
            {user.name}님!
          </p>
        )}

        <button
          type="button"
          className={styles.collapseButton}
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
      <div className={styles.quickActions}>
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`${styles.quickAction} ${ //각 버튼의 action.variant 값이 'secondary'인 경우
              action.variant === 'secondary'
                ? styles.quickActionSecondary
                : ''
            }`}
            onClick={() => router.push(action.href)} 
            aria-label={action.count !== undefined ? `${action.label} (${action.count})` : action.label}
            title={!isOpen ? action.label : undefined}
          >
            {isOpen && ( // 사이드바 상태에 따라서
              <span className={styles.quickActionLabel}>
                {action.label}

                {action.count !== undefined && (
                  <>
                    {' '}
                    <span className={styles.waitingCount}>
                      ({action.count})
                    </span>
                  </>
                )}
              </span>
            )}

            <span className={styles.quickActionIcon}>
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
      <nav className={styles.menu}>
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
                  className={`${styles.menuItem} ${
                    active ? styles.active : ''
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
                    className={styles.menuIcon}
                  />

                  {isOpen && (
                    <span className={styles.menuLabel}>
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
                      className={styles.menuArrow}
                    />
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`${styles.menuItem} ${
                    active ? styles.active : ''
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
                    className={styles.menuIcon}
                  />

                  {isOpen && (
                    <span className={styles.menuLabel}>
                      {item.label}
                    </span>
                  )}
                </Link>
              )}

              {/* 메시지 하위 메뉴 */}
              {isOpen &&
                isMessageMenu &&
                isMessageOpen && (
                  <div className={styles.subMenu}>
                    {messageItems.map((subItem) => {
                    const subActive = isActive(subItem.href);

                    return (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className={`${styles.subMenuItem} ${
                          subActive ? styles.subMenuItemActive : ''
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