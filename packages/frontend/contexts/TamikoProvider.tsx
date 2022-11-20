import { Tamiko, TamikoContextState } from "@/types/context"
import { TamikoMetadata, TamikoProperties, TamikoStoreItem } from "@/types/metadata"
import { createContext, ReactNode, useContext, useState } from "react"

type Props = {
  children: ReactNode
}

const initialValue: TamikoContextState = {
  tamikos: [],
  items: [],
  setTamikos: (v) => {},
  setItems: (v) => {},
}

const TamikoContext = createContext(initialValue)

const TamikoProvider = ({ children }: Props) => {
  const [tamikos, setTamikos] = useState<Tamiko[]>([])
  const [items, setItems] = useState<TamikoStoreItem[]>([])

  return (
    <TamikoContext.Provider
      value={{
        tamikos,
        setTamikos,
        items,
        setItems,
      }}
    >
      {children}
    </TamikoContext.Provider>
  )
}

export default TamikoProvider

export const useTamikoContext = () => {
  return useContext(TamikoContext)
}
