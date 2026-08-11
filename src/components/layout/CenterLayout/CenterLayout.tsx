import { ReactNode } from 'react';

import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

import { User } from '@/types/user';

import styles from './CenterLayout.module.css';

interface CenterLayoutProps {
  children: ReactNode;
  user: User;
}

export function CenterLayout({
  children,
  user,
}: CenterLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header user={user} />

      <div className={styles.body}>
        <Sidebar user={user} />

        <main className={styles.content}>
          {children} {/* 현재 페이지의 전체 콘텐츠 */}
        </main>
      </div>
    </div>
  );
}