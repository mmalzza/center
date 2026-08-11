import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function HistorysPage() {
  return (
    <CenterLayout user={user}>
      <h1>이용 기록 페이지입니다.</h1>
    </CenterLayout>
  );
}