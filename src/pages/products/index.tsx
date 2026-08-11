import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function ProductsPage() {
  return (
    <CenterLayout user={user}>
      <h1>상품 페이지입니다.</h1>
    </CenterLayout>
  );
}