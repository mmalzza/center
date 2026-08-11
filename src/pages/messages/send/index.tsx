import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function MessageSendPage() {
  return (
    <CenterLayout user={user}>
      <h1>문자 발송 페이지입니다.</h1>
    </CenterLayout>
  );
}