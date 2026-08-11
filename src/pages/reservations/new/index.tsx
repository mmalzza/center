import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function ReservationsNewPage() {
  return (
    <CenterLayout user={user}>
      <h1>예약하기 페이지입니다.</h1>
    </CenterLayout>
  );
}