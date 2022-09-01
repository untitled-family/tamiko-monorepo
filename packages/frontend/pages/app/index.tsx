import Head from 'next/head';
import AppLayout from '@/components/AppLayout';

export default function App() {
  return (
    <>
      <Head>
        <title>Tamiko - App</title>
      </Head>
      <AppLayout>
        This is the app
      </AppLayout>
    </>
  );
}
