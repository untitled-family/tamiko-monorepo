import { useContract } from "@/hooks";
import { Item } from "@/hooks/useTamikoStoreItems";
import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAccount, useProvider } from "wagmi";
import { BuyTamikoItem } from "./BuyTamikoItem";

type Props = {
  item: Item;
}

export const TamikoStoreItem = ({ item }: Props) => {
  const { address } = useAccount()
  const provider = useProvider()
  const contract = useContract('TamikoStore', provider)
  const [balance, setBalance] = useState<number>(0)

  const fetchBalance = async () => {
    const _balance = await contract.balanceOf(address, item.id)
    setBalance(_balance.toNumber())
  }

  useEffect(() => {
    if (address && provider) {
      fetchBalance()
    }
  }, [])

  return (
    <>
      <Flex border='1px solid' p={4} justifyContent='space-between'>
        <Text>Name: {item.name}</Text>
        <Text>Price: {item.price}</Text>
        <Text>Owned: {balance}</Text>
      </Flex>
      <BuyTamikoItem name={item.name} itemId={item.id} price={item.price} />
    </>
  )
}