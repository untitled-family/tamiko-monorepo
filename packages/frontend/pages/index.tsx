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
import { useElementTheme } from '@/hooks';
import { elements } from '@/contexts/ElementTheme';

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount()
  const [primary, setPrimary] = useElementTheme()

  console.log('primary', primary)

  useEffect(() => {
    if (address) {
      const keys = Object.keys(elements)
      const random = keys[Math.floor(Math.random() * keys.length)]
      setPrimary(random)
    }
  }, [address])

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
