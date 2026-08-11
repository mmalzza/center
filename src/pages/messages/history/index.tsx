import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function MessageHistoryPage() {
  return (
    <CenterLayout user={user}>
      <h1>메시지 내역 페이지입니다.</h1>
    </CenterLayout>
  );
}