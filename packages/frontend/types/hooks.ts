import { Attribute, TamikoMetadata, TamikoProperties, TamikoStoreItem } from "./metadata"

export interface TamikoMetadataHook {
  metadata: TamikoMetadata | null // Raw metadata object returned by contract
  abilities: Attribute[] | [] // Set of abilities attributes: speed, power and defense
  properties: TamikoProperties | null // Set of variables that are not necessarily in metadata.attributes
  refresh: () => void // Method to re-fetch from contract
  isLoading: boolean // true when fetching from the contract - default `false`
}

export interface TamikoStoreItemsHook {
  totalItems: number // total number of items stored in the contract
  items: TamikoStoreItem[] | [] // array of items
  refresh: () => void // Method to re-fetch from contract
  isLoading: boolean // true when fetching from the contract - default `false`
}

export interface OwnerHook {
  owner: string
  isLoading: boolean
}

export interface PercentageCountdownHook {
  timer: number
  startTimer: () => void
}
