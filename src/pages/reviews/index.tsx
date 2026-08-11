import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function ReviewsPage() {
  return (
    <CenterLayout user={user}>
      <h1>후기 페이지입니다.</h1>
    </CenterLayout>
  );
}