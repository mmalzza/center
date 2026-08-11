import styles from './Header.module.css';
import { User } from '@/types/user';

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
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
        <button
          type="button"
          className={`${styles.consoleItem} ${styles.active}`}
        >
          센터콘솔
        </button>

        <button
          type="button"
          className={styles.consoleItem}
        >
          어드민콘솔
        </button>

        <button
          type="button"
          className={styles.consoleItem}
        >
          전문가콘솔
        </button>
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