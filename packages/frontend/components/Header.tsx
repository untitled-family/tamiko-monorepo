import { useSigner } from "@/hooks";
import { useSigner as useWagmiSigner } from "wagmi";
import { Box, Flex } from "@chakra-ui/react";
import {
  useConnectModal,
  useAccountModal,
} from '@rainbow-me/rainbowkit';
import Link from "next/link";
import { useEffect } from "react";
import { useAccount, useEnsName } from "wagmi";
import { trimAddress } from '../utils/address'

export const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { address } = useAccount()
  const { data: ensName } = useEnsName({
    address,
  })
  const [, setSigner] = useSigner()
  const { data: wagmiSigner } = useWagmiSigner()

  useEffect(() => {
    setSigner(wagmiSigner)
  }, [wagmiSigner])

  return (
    <Flex as='header' alignItems='center' justifyContent='space-between'>
      <h1><Link href='/'>Tamiko</Link></h1>
      {openAccountModal ? (
        <Box as='button' textTransform='uppercase' onClick={openAccountModal}>{ensName || trimAddress(address || '0x0000000')}</Box>
      ) : (
        <Box as='button' textTransform='uppercase' onClick={openConnectModal}>Not connected</Box>
      )}

    </Flex>
  );
};
