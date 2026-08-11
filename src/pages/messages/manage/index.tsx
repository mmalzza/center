import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function MessageManagePage() {
  return (
    <CenterLayout user={user}>
      <h1>문자 관리 페이지입니다.</h1>
    </CenterLayout>
  );
}