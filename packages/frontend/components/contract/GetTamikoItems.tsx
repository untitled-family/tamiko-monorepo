import { useTamikoStoreItems } from "@/hooks/useTamikoStoreItems"
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react"
import { TamikoStoreItem } from "./TamikoStoreItem"

export const GetTamikoItems = () => {
  const { items, isLoading } = useTamikoStoreItems()

  return (
    <Box w='full' alignSelf='flex-start'>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {items.map(item => (
            <TamikoStoreItem key={item.id} item={item} />
          ))}
        </>
      )}
    </Box>
  )
}