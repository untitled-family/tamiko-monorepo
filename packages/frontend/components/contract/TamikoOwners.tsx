import { useElement, useOwner } from "@/hooks"
import { Attribute, TamikoMetadata } from "@/types/metadata"
import { trimAddress } from "@/utils/address"
import { extractAttributes } from "@/utils/metadata"
import { Box, Flex, Text } from "@chakra-ui/react"
import { transparentize } from "polished"
import { useEnsName } from "wagmi"
import { PixelatedBox } from "../PixelatedBox"

type Props = {
  metadata: TamikoMetadata | null
  tokenId: number
  isLoading: boolean
}

const Skeleton = () => {
  const darker = useElement(700)

  return (
    <Flex
      py={4}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={transparentize(0.9, darker)}
      borderLeftColor="transparent"
      borderRightColor="transparent"
    >
      <Box w="50%">
        <PixelatedBox my="4px" h="12px" w="50px" mx="auto" />
        <PixelatedBox my="4px" h="12px" w="110px" mx="auto" />
      </Box>
      <Box w="50%">
        <PixelatedBox my="4px" h="12px" w="50px" mx="auto" />
        <PixelatedBox my="4px" h="12px" w="110px" mx="auto" />
      </Box>
    </Flex>
  )
}

export const TamikoOwners = ({ metadata, tokenId, isLoading }: Props) => {
  const attributes = extractAttributes(metadata?.attributes as Attribute[], ["hatcher"])
  const hasAttributes = attributes.length

  if (!hasAttributes) return <Skeleton />

  const darker = useElement(700)
  const dark = useElement(600)
  const hatcher = hasAttributes ? attributes[0].value : "0x00"
  const { data: hatcherEns } = useEnsName({ address: hatcher })
  const hatcherName = hatcherEns || trimAddress(hatcher)
  const { owner } = useOwner(tokenId)
  const { data: ownerEns } = useEnsName({ address: owner })
  const ownerName = ownerEns || trimAddress(owner)

  return (
    <Flex
      py={4}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={transparentize(0.9, darker)}
      borderLeftColor="transparent"
      borderRightColor="transparent"
    >
      <Box w="50%">
        <Text textColor={dark}>Parent</Text>
        <Text textColor={darker}>{ownerName}</Text>
      </Box>
      <Box w="50%">
        <Text textColor={dark}>Hatcher</Text>
        <Text textColor={darker}>{hatcherName}</Text>
      </Box>
    </Flex>
  )
}
