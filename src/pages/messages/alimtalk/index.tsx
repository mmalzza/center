import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function MessageAlimtalkPage() {
  return (
    <CenterLayout user={user}>
      <h1>알림톡 페이지입니다.</h1>
    </CenterLayout>
  );
}