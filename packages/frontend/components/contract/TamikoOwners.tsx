import { useElement, useOwner } from "@/hooks";
import { Metadata, Attribute } from "@/hooks/useTamikoMetadata";
import { trimAddress } from "@/utils/address";
import { extractAttributes } from "@/utils/metadata";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { transparentize } from "polished";
import { useEnsName } from "wagmi";

type Props = {
  metadata: Metadata | null,
  tokenId: number
}

export default function TamikoOwners({ metadata, tokenId }: Props) {
  const attributes = extractAttributes(metadata?.attributes as Attribute[], ['hatcher'])

  if (!attributes.length) return <></>

  const darker = useElement(700)
  const dark = useElement(600)
  // @ts-ignore
  const hatcher = attributes[0].value
  const { data: hatcherEns } = useEnsName({ address: hatcher })
  const hatcherName = hatcherEns || trimAddress(hatcher)
  const { owner } = useOwner(tokenId)
  const { data: ownerEns } = useEnsName({ address: owner })
  const ownerName = ownerEns || trimAddress(owner)

  return (
    <Flex
      py={4} borderWidth='2px'
      borderStyle='dashed'
      borderColor={transparentize(0.9, darker)}
      borderLeftColor='transparent'
      borderRightColor='transparent'
    >
      <Box w='50%'>
        <Text textColor={dark}>Parent</Text>
        <Text textColor={darker}>{ownerName}</Text>
      </Box>
      <Box w='50%'>
        <Text textColor={dark}>Hatcher</Text>
        <Text textColor={darker}>{hatcherName}</Text>
      </Box>
    </Flex>
  )
}