import Head from 'next/head';

import { GetGreeter, SetGreeter } from '../components/contract';
import { Main } from '@/components/Main';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';

import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount()

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
        {address && (
          <>
            <Link href='/mint'>
              <Button>Mint</Button></Link>
            <Link href='/app'>
              <Button>App</Button>
            </Link>
          </>
        )}
        {openConnectModal && (
          <Button onClick={openConnectModal}>connect wallet</Button>
        )}
        <Button isGhost>wtf is tamiko?</Button>
      </Footer>
    </>
  );
}
