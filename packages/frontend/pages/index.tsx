import Head from 'next/head';

import { Main } from '@/components/Main';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';

import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import Idle from '@/components/svg/Idle';
import { Text } from '@chakra-ui/react';
import Connected from '@/components/svg/Connected';

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount()

  return (
    <>
      <Head>
        <title>Tamiko</title>
      </Head>
      <Main>
        {openConnectModal ? (
          <>
            <Idle />
            <Text mt={1}>Not connected</Text>
          </>
        ) : (
          <>
            <Connected />
            <Text mt={1}>Conntected</Text>
          </>
        )}

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
