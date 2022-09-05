import { useTamikoMetadata } from "@/hooks/useTamikoMetadata";
import { Box, SimpleGrid } from "@chakra-ui/react";

type Strength = {
  tokenId: number
}

export default function TamikoInfo({ tokenId }: Strength) {
  const { properties } = useTamikoMetadata(tokenId)

  return (
    <SimpleGrid columns={3} gap={4}>
      {properties && (
        <>
          <Box>#{tokenId}</Box>
          <Box>Type: </Box>
          <Box>{parseInt(properties.hatchStatus) === 2 ? `level ${parseInt(properties.level)}` : 'egg'}</Box>
        </>
      )}
    </SimpleGrid>

  )
}