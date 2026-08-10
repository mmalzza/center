import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid/DashboardGrid';

export default function HomePage() {
  return (
    <CenterLayout>
      <DashboardGrid>
        <h1>대시보드</h1>
      </DashboardGrid>
    </CenterLayout>
  );
}