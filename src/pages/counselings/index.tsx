import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function CounselingsPage() {
  return (
    <CenterLayout user={user}>
      <h1>상담방 페이지입니다.</h1>
    </CenterLayout>
  );
}