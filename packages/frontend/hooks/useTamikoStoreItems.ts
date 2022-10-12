import { TamikoStoreItemsHook } from "@/types/hooks"
import { TamikoStoreItem } from "@/types/metadata"
import { toastError } from "@/utils/error"
import { extractItemProperties } from "@/utils/metadata"
import { useEffect, useState } from "react"
import { useProvider } from "wagmi"
import { useContract } from "./useContract"

export const useTamikoStoreItems = (): TamikoStoreItemsHook => {
  const provider = useProvider()
  const [totalItems, setTotalItems] = useState<number>(0)
  const [items, setItems] = useState<TamikoStoreItem[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const tamikoStoreContract = useContract("TamikoStore", provider)

  const getItems = async () => {
    setLoading(true)

    try {
      const total = await tamikoStoreContract.totalItems()
      const totalNumber = total.toNumber()
      setTotalItems(totalNumber)
      const _items = []

      if (!totalNumber)
        return {
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
    isLoading,
  }
}
