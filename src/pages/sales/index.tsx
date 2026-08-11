import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function SalesPage() {
  return (
    <CenterLayout user={user}>
      <h1>판매 페이지입니다.</h1>
    </CenterLayout>
  );
}