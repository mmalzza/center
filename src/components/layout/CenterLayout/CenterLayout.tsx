import { ReactNode, useState } from 'react';

import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

import { User } from '@/types/user';

interface CenterLayoutProps {
  children: ReactNode;
  user: User;
}

export function CenterLayout({
  children,
  user,
}: CenterLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen overflow-hidden bg-white">
      <Header user={user} />

      <div
        className={`grid h-[calc(100vh-48px)] min-h-0 ${
          isSidebarOpen
            ? 'grid-cols-[188px_minmax(0,1fr)]'
            : 'grid-cols-[72px_minmax(0,1fr)]'
        }`}
      >
        <Sidebar
          user={user}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="min-h-0 min-w-0 overflow-y-auto overflow-x-hidden p-6">
          {children} {/* 현재 페이지의 전체 콘텐츠 */}
        </main>
      </div>
    </div>
  );
}