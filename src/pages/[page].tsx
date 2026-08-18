import type { GetServerSideProps } from 'next';

import { CenterLayout } from '@/components/layout/CenterLayout/CenterLayout';
import { menuItems } from '@/components/layout/Sidebar/Sidebar';
import { user } from '@/types/user';

const PAGE_TITLES: Record<string, string> = Object.fromEntries(
  menuItems
    .filter((item) => item.href && item.href !== '/')
    .map((item) => [item.href!.slice(1), item.label]),
);

interface DynamicPageProps {
  title: string;
}

export const getServerSideProps: GetServerSideProps<DynamicPageProps> = async ({ params }) => {
  const page = typeof params?.page === 'string' ? params.page : '';
  const title = PAGE_TITLES[page] ?? page;

  return { props: { title } };
};

export default function DynamicPage({ title }: DynamicPageProps) {
  return (
    <CenterLayout user={user}>
      <h1>{title} 페이지입니다.</h1>
    </CenterLayout>
  );
}
