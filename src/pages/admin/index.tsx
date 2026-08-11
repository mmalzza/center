import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function AdminPage() {
  return (
    <CenterLayout user={user}>
      <h1>어드민콘솔 페이지입니다.</h1>
    </CenterLayout>
  );
}