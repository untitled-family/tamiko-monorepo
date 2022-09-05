import { useElement } from "@/hooks";
import { Property } from "@/hooks/useTamikoMetadata";
import { Box, Flex } from "@chakra-ui/react";
import { omit } from "lodash";
import { transparentize } from "polished";

type Props = {
  tokenId: number,
  properties: Property | null
}

type CustomBoxProps = {
  children: any,
  isPrimary?: boolean
}

const corners = [
  { id: 0, top: 0, left: 0 },
  { id: 1, top: 0, right: 0 },
  { id: 2, bottom: 0, left: 0 },
  { id: 3, bottom: 0, right: 0 }
];

const CustomBox = ({ children, isPrimary = false }: CustomBoxProps) => {
  const cornerColor = useElement()
  const dark = useElement(600)

  return (
    <Box
      px={4}
      py={1}
      position='relative'
      bg={isPrimary ? dark : transparentize(0.5, dark)}
      textColor='white'
      flex={isPrimary ? 2.5 : 1}
      mx={isPrimary ? 3 : 0}
      fontSize='sm'
    >
      {corners.map((corner) => (
        <Box
          key={corner.id}
          as='span'
          w='full'
          h='full'
          position='absolute'
          bg={cornerColor}
          width='4px'
          height='4px'
          {...omit(corner, ['id'])}
        />
      ))}
      {children}
    </Box>
  )
}

export default function TamikoInfo({ properties, tokenId }: Props) {
  const hasHatched = parseInt(properties?.hatchStatus as string) >= 2
  const type = hasHatched ? 'bug' : 'unknown'
  const level = hasHatched ? `lvl ${properties?.level}` : 'egg'
  console.log('properties', properties)

  return (
    <Flex my={6}>
      {properties && (
        <>
          <CustomBox>#{tokenId}</CustomBox>
          <CustomBox isPrimary>Type: {type}</CustomBox>
          <CustomBox>{level}</CustomBox>
        </>
      )}
    </Flex>

  )
}