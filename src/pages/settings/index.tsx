import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { user } from '@/types/user';

export default function SettingsPage() {
  return (
    <CenterLayout user={user}>
      <h1>설정 페이지입니다.</h1>
    </CenterLayout>
  );
}