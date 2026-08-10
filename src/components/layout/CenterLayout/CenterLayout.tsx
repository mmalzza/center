import { ReactNode } from 'react';

import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

import styles from './CenterLayout.module.css';

interface CenterLayoutProps {
  children: ReactNode;
}

export function CenterLayout({ children }: CenterLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />

      <div className={styles.body}>
        <Sidebar />

        <main className={styles.content}>
          {children} {/* 현재 페이지의 전체 콘텐츠 */}
        </main>
      </div>
    </div>
  );
}