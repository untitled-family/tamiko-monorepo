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
import { useEffect } from 'react';
import { useRandomElement } from '@/hooks/useElementTheme';

export default function Home() {
  const setRandomColor = useRandomElement()
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount()

  useEffect(() => {
    if (address) {
      setRandomColor(['neutral'])
    }
  }, [address])

  return (
    <>
      <Head>
        <title>Tamiko</title>
      </Head>
      <Main>
        <div>
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
        </div>
      </Main>
      <Footer>
        {address && (
          <>
            <Link href='/mint'>
              <Button>Mint</Button></Link>
            <Link href='/app'>
              <Button isGhost>App</Button>
            </Link>
          </>
        )}
        {openConnectModal && (
          <>
            <Button onClick={openConnectModal}>connect wallet</Button>
            <Button isGhost>wtf is tamiko?</Button>
          </>

        )}

      </Footer>
    </>
  );
}
