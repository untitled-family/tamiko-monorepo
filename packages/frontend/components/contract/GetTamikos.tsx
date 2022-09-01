import { useTokensOwned } from "@/hooks";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAccount, useSigner } from "wagmi";
import AppIcon from "../AppIcon";

export default function GetTamikos() {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { getTokens, tokens, isLoading, error } = useTokensOwned(address, signer)

  const fetchTokens = async () => {
    const tokens = await getTokens()

    console.log('tokens', tokens)
  }

  useEffect(() => {
    if (signer) {
      fetchTokens()
    }
  }, [signer])

  return (
    <Box w='full'>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <SimpleGrid columns={2} gap={4}>
          {tokens.map(tokenId => (
            <AppIcon name={`#${tokenId}`} href={`/app/tamiko/${tokenId}`} />
          ))}
        </SimpleGrid>
      )}
    </Box>

  )
}