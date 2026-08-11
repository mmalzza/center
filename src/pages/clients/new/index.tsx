import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function ClientsNewPage() {
  return (
    <CenterLayout user={user}>
      <h1>내담자 등록하기 페이지입니다.</h1>
    </CenterLayout>
  );
}