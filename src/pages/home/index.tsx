import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function HomesPage() {
  return (
    <CenterLayout user={user}>
      <h1>홈 페이지입니다.</h1>
    </CenterLayout>
  );
}