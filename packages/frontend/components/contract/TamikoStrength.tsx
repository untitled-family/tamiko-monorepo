import { useElement } from "@/hooks";
import { Attribute } from "@/hooks/useTamikoMetadata";
import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {
  abilities: Attribute[] | null
}

export default function TamikoStrength({ abilities }: Props) {
  const light = useElement(400)
  const normal = useElement(600)

  return (
    <Box my={6}>
      {abilities && abilities.map(ability => (
        <Box key={ability.trait_type} mb={3}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>{ability.trait_type}</Text>
            <Text>{ability.value}/100</Text>
          </Flex>
          <Box position='relative' w='full' h='6px' bg={light}>
            <Box w={`${ability.value}%`} height='full' position='absolute' top={0} left={0} bg={normal} />
          </Box>
        </Box>
      ))}
    </Box>

  )
}