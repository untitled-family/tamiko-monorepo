import Head from 'next/head';
import AppLayout from '@/components/AppLayout';
import GetTamikos from '@/components/contract/GetTamikos';

export default function App() {
  return (
    <>
      <Head>
        <title>Tamiko - App</title>
      </Head>
      <AppLayout>
        <GetTamikos />
      </AppLayout>
    </>
  );
}
