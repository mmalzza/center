import styles from './Header.module.css';

export function Header() {
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
            마인드카페점
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