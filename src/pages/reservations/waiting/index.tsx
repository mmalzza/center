import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function ReservationsWaitingPage() {
  return (
    <CenterLayout user={user}>
      <h1>대기예약 페이지입니다.</h1>
    </CenterLayout>
  );
}