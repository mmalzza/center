import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function CallsPage() {
  return (
    <CenterLayout user={user}>
      <h1>통화 이력 페이지입니다.</h1>
    </CenterLayout>
  );
}