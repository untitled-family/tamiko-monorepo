import { Property } from "@/hooks/useTamikoMetadata";
import { Box, SimpleGrid } from "@chakra-ui/react";

type Props = {
  tokenId: number,
  properties: Property | null
}

export default function TamikoInfo({ properties, tokenId }: Props) {
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