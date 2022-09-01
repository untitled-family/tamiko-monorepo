import { useTokensOwned } from "@/hooks";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import AppIcon from "../AppIcon";
import TamikoImage from "./TamikoImage";

export default function GetTamikos() {
  const { address } = useAccount()
  const { tokens, isLoading } = useTokensOwned(address)

  return (
    <Box w='full'>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <SimpleGrid columns={2} gap={4}>
          {tokens.map(tokenId => (
            <AppIcon key={tokenId} name={`Tamiko #${tokenId}`} href={`/app/tamiko/${tokenId}`}>
              <TamikoImage tokenId={tokenId} />
            </AppIcon>
          ))}
        </SimpleGrid>
      )}
    </Box>

  )
}