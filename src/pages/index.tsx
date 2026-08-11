import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid/DashboardGrid';

import { user } from '@/types/user';

export default function HomePage() {
  return (
    <CenterLayout user={user}>
      <DashboardGrid>
        <h1>대시보드</h1>
      </DashboardGrid>
    </CenterLayout>
  );
}