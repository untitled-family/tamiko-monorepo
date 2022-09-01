import Head from 'next/head';
import AppLayout from '@/components/AppLayout';

export default function Link() {
  return (
    <>
      <Head>
        <title>Tamiko - Link</title>
      </Head>
      <AppLayout>
        This is the link
      </AppLayout>
    </>
  );
}
