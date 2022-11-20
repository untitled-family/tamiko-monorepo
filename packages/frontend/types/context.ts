import { Dispatch, SetStateAction } from "react"
import {
  TamikoAbilities,
  TamikoMetadata,
  TamikoProperties,
  TamikoStoreItem,
} from "./metadata"

export interface Tamiko {
  id: number
  metadata: TamikoMetadata
  properties: TamikoProperties
  abilities: TamikoAbilities
}

export interface TamikoContextState {
  tamikos: Tamiko[]
  items: TamikoStoreItem[]
  setTamikos: Dispatch<SetStateAction<Tamiko[]>>
  setItems: Dispatch<SetStateAction<TamikoStoreItem[]>>
}
