import Link from 'next/link';
import { useRouter } from 'next/router';

import { User } from '@/types/user';

import styles from './Header.module.css';

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
    <header className={styles.header}>
      <div className={styles.brand}>
        <img
          src="/icons/logomark.svg"
          alt="MINDCAFE"
          className={styles.logo}
        />

        <img
          src="/icons/logotype-container.svg"
          alt="MINDCAFE"
          className={styles.logo}
        />
      </div>

      <nav className={styles.consoleNav}>
        {consoleItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.consoleItem} ${
                active ? styles.active : ''
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.userArea}>
        <div className={styles.userProfile}>
          <img
            src="/icons/person.svg"
            alt=""
            className={styles.profileIcon}
          />

          <span className={styles.userName}>
            {user.centerName}
          </span>
        </div>

        <button
          type="button"
          className={styles.logoutButton}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}