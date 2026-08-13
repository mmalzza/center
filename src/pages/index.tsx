import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid/DashboardGrid';

import { user } from '@/types/user';

export default function DashboardPage() {
  return (
    <CenterLayout user={user}>
      <DashboardGrid />
    </CenterLayout>
    
  );
}