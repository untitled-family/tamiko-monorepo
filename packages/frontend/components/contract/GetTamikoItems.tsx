import { useTamikoStoreItems } from "@/hooks/useTamikoStoreItems"
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react"

export const GetTamikoItems = () => {
  const { items, isLoading } = useTamikoStoreItems()

  return (
    <Box w='full' alignSelf='flex-start'>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {items.map(item => (
            <Flex justifyContent='space-between' key={item.id}>
              <Text>{item.name}</Text>
              <Text>Price: {item.price}</Text>
            </Flex>
          ))}
        </>
      )}
    </Box>
  )
}