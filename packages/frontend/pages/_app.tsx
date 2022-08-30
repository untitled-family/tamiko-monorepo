import * as React from 'react';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import '../styles/globals.css';
import { theme } from '../utils/theme';

import { ChakraProvider } from '@chakra-ui/react';

// Imports
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  Chain,
} from '@rainbow-me/rainbowkit';

import { useIsMounted } from '../hooks';
import ElementThemeProvider from '@/contexts/ElementTheme';
import { PhoneWrap } from '@/components/PhoneWrap';
import { Header } from '@/components/Header';
import { Switcher } from '@/components/Switcher';

// Get environment variables
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
// const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

const hardhatChain: Chain = {
  id: 31337,
  name: 'Hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Hardhat',
    symbol: 'HARD',
  },
  network: 'hardhat',
  rpcUrls: {
    default: 'http://127.0.0.1:8545',
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli, hardhatChain],
  // @ts-ignore
  [alchemyProvider({ alchemyId }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Tamiko',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = ({ Component, pageProps }: AppProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <NextHead>
          <title>Tamiko</title>
        </NextHead>
        <ChakraProvider theme={theme}>
          <ElementThemeProvider>
            <PhoneWrap>
              <Component {...pageProps} />
            </PhoneWrap>
          </ElementThemeProvider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
