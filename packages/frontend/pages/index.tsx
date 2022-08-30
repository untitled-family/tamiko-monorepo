import Head from 'next/head';


import { GetGreeter, SetGreeter } from '../components/contract';
import { Main } from '@/components/Main';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';

import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';

export default function Home() {
  const { openConnectModal } = useConnectModal();

  return (
    <>
      <Head>
        <title>Tamiko</title>
      </Head>

      <Main>
        <GetGreeter />
        <SetGreeter />
      </Main>
      <Footer>
        {openConnectModal && (
          <Button onClick={openConnectModal}>connect wallet</Button>
        )}

        <Button isGhost>wtf is tamiko?</Button>
      </Footer>
    </>
  );
}
