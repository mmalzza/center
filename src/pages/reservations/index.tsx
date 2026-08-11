import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function ReservationsPage() {
  return (
    <CenterLayout user={user}>
      <h1>예약 일정 페이지입니다.</h1>
    </CenterLayout>
  );
}