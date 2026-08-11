import { useState } from 'react';
import { User } from '@/types/user';

import styles from './Sidebar.module.css';

const menuItems = [
  { label: '홈', icon: '/icons/home.svg' },
  { label: '예약 일정', icon: '/icons/calendar_today.svg' },
  { label: '상담방', icon: '/icons/forum.svg' },
  { label: '내담자 관리', icon: '/icons/group.svg' },
  { label: '문서', icon: '/icons/draft.svg' },
  { label: '메시지', icon: '/icons/mail.svg', hasSubMenu: true, },
  { label: '통화 이력', icon: '/icons/call.svg' },
  { label: '전문가', icon: '/icons/award_star.svg' },
  { label: '상품', icon: '/icons/hand_package.svg' },
  { label: '판매', icon: '/icons/paid.svg' },
  { label: '후기', icon: '/icons/outlined.svg' },
  { label: '이용 기록', icon: '/icons/history.svg' },
  {
    label: '대시보드',
    icon: '/icons/bar_chart_4_bars.svg',
    active: true,
  },
  { label: '설정', icon: '/icons/settings.svg' },
];

const messageItems = [
  '문자발송',
  '문자 관리',
  '알림톡',
  '메시지 내역',
];

interface SidebarProps { user: User; }

export function Sidebar({ user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMessageToggle = () => {
    setIsMessageOpen((prev) => !prev);
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
            <br/>
            {user.name}님!
          </p>
        )}

        <button
          type="button"
          className={styles.collapseButton}
          onClick={handleToggle}
          aria-label={
            isOpen ? '사이드바 접기' : '사이드바 펼치기'
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
        <button
          type="button"
          className={styles.quickAction}
        >
          {isOpen && (
            <span className={styles.quickActionLabel}>
              예약하기
            </span>
          )}

          <span className={styles.quickActionIcon}>
            <img
              src={isOpen ? '/icons/add.svg' : '/icons/event_add.svg'}
              alt=""
              width={16}
              height={16}
            />
          </span>
        </button>

        <button
          type="button"
          className={styles.quickAction}
        >
          {isOpen && (
            <span className={styles.quickActionLabel}>
              내담자 등록하기
            </span>
          )}

          <span className={styles.quickActionIcon}>
            <img
              src={isOpen ? '/icons/add.svg' : '/icons/person_add.svg'}
              alt=""
              width={16}
              height={16}
            />
          </span>
        </button>

        <button
          type="button"
          className={`${styles.quickAction} ${styles.quickActionSecondary}`}
        >
          {isOpen && (
            <span className={styles.quickActionLabel}>
              대기예약{' '}
              <span className={styles.waitingCount}>
                (8)
              </span>
            </span>
          )}

          <span className={styles.quickActionIcon}>
            <img
              src={isOpen ? '/icons/arrow_forward_ios.svg' : '/icons/event_upcoming.svg'}
              alt=""
              width={16} 
              height={16}
            />
          </span>
        </button>
      </div>

      {/* 메뉴 */}
      <nav className={styles.menu}>
        {menuItems.map((item) => {
          const isMessageMenu = item.label === '메시지';

          return (
            <div key={item.label}>
              <button
                type="button"
                className={`${styles.menuItem} ${
                  item.active ? styles.active : ''
                }`}
                title={!isOpen ? item.label : undefined}
                onClick={
                  isMessageMenu
                    ? handleMessageToggle
                    : undefined
                }
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

              {/* 메시지 하위 메뉴 */}
              {isOpen &&
                isMessageMenu &&
                isMessageOpen && (
                  <div className={styles.subMenu}>
                    {messageItems.map((subItem) => (
                      <button
                        key={subItem}
                        type="button"
                        className={styles.subMenuItem}
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}