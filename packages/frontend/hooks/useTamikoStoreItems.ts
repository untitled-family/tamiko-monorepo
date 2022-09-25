import { toastError } from "@/utils/error"
import { extractItemProperties } from "@/utils/metadata"
import { useEffect, useState } from "react"
import { useProvider } from "wagmi"
import { useContract } from "./useContract"

type TamikoStoreItems = {
  totalItems: number; // total number of items stored in the contract
  items: Item[] | []; // array of items
  refresh: () => void // Method to re-fetch from contract
  isLoading: boolean // true when fetching from the contract - default `false`
}

export type Item = {
  id: number;
  name: string;
  description: string;
  svg: string,
  price: number;
  creator: string;
}

export const useTamikoStoreItems = (): TamikoStoreItems => {
  const provider = useProvider()
  const [totalItems, setTotalItems] = useState<number>(0)
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const tamikoStoreContract = useContract('TamikoStore', provider)

  const getItems = async () => {
    setLoading(true)

    try {
      const total = await tamikoStoreContract.totalItems()
      const totalNumber = total.toNumber()
      setTotalItems(totalNumber)
      const _items = []

      if (!totalNumber) return {
        totalItems: 0,
        items: [],
        isLoading: false,
      }

      for (let index = 0; index < totalNumber; index++) {
        const item = await tamikoStoreContract.items(index)
        _items.push(extractItemProperties(item))
      }

      setItems(_items)
      setLoading(false)
    } catch (e) {
      toastError(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (provider) getItems()
  }, [])

  return {
    totalItems,
    items,
    refresh: getItems,
    isLoading
  }
}