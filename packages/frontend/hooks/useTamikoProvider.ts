import { useTamikoContext } from "@/contexts/TamikoProvider"
import { Tamiko } from "@/types/context"
import { TamikoStoreItem } from "@/types/metadata"

export const useTamikoProvider = () => {
  const { tamikos, items, setTamikos, setItems } = useTamikoContext()

  const updateTamiko = (tamiko: Tamiko) => {
    const filteredTamikos = tamikos.filter((o) => o.id !== tamiko.id)
    setTamikos([...filteredTamikos, tamiko])
  }

  const updateItem = (item: TamikoStoreItem) => {
    const filteredItems = items.filter((o) => o.id !== item.id)
    setItems([...filteredItems, item])
  }

  const getTamikoById = (id: number) => {
    return tamikos.find((o) => o.id === id)
  }

  const getItemById = (id: number) => {
    return items.find((o) => o.id === id)
  }

  return {
    tamikos,
    items,
    updateTamiko,
    updateItem,
    getTamikoById,
    getItemById,
  }
}
