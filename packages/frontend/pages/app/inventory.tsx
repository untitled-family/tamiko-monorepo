import Head from 'next/head';
import AppLayout from '@/components/AppLayout';

export default function Inventory() {
  return (
    <>
      <Head>
        <title>Tamiko - Inventory</title>
      </Head>
      <AppLayout>
        This is the inventory
      </AppLayout>
    </>
  );
}
