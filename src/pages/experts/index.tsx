import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function ExpertsPage() {
  return (
    <CenterLayout user={user}>
      <h1>전문가 페이지입니다.</h1>
    </CenterLayout>
  );
}