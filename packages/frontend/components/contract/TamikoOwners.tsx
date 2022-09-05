import { useOwner } from "@/hooks/useOwner";
import { Metadata, Attribute } from "@/hooks/useTamikoMetadata";
import { trimAddress } from "@/utils/address";
import { extractAttributes } from "@/utils/metadata";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useEnsName } from "wagmi";

type Props = {
  metadata: Metadata | null,
  tokenId: number
}

export default function TamikoOwners({ metadata, tokenId }: Props) {
  const attributes = extractAttributes(metadata?.attributes as Attribute[], ['hatcher'])

  if (!attributes.length) return false

  const hatcher = attributes[0].value
  const { data: hatcherEns } = useEnsName({ address: hatcher })
  const hatcherName = hatcherEns || trimAddress(hatcher)
  const { owner } = useOwner(tokenId)
  const { data: ownerEns } = useEnsName({ address: owner })
  const ownerName = ownerEns || trimAddress(owner)

  return (
    <SimpleGrid columns={2} gap={4}>
      <Box>
        <Text>Parent</Text>
        <Text>{ownerName}</Text>
      </Box>
      <Box>
        <Text>Hatcher</Text>
        <Text>{hatcherName}</Text>
      </Box>
    </SimpleGrid>
  )
}