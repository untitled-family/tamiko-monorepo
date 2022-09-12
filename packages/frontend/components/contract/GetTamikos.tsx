import { useTokensOwned } from "@/hooks";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import AppIcon from "../AppIcon";
import { TamikoImage } from "./TamikoImage";

export const GetTamikos = () => {
  const { address } = useAccount()
  const { tokens, isLoading } = useTokensOwned(address)

  return (
    <Box w='full' alignSelf='flex-start'>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {tokens.length > 0 ? (
            <SimpleGrid columns={2} gap={4}>
              {tokens.map(tokenId => (
                <AppIcon key={tokenId} name={`Tamiko #${tokenId}`} href={`/app/tamiko/${tokenId}`}>
                  <TamikoImage tokenId={tokenId} />
                </AppIcon>
              ))}
            </SimpleGrid>
          ) : (
            <Box>
              You don't own any tamiko
            </Box>
          )}

        </>
      )}
    </Box>
  )
}