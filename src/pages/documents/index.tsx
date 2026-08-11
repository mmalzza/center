import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function DocumentsPage() {
  return (
    <CenterLayout user={user}>
      <h1>문서 페이지입니다.</h1>
    </CenterLayout>
  );
}