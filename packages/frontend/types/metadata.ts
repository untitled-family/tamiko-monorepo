export interface Attribute {
  trait_type: string
  value: string
}

export interface TamikoMetadata {
  name: string
  image: string
  attributes: Attribute[]
}

export interface TamikoProperties {
  hatchStatus: string
  level: string
  hatchDate: string
  lastFed: string
}

export interface TamikoAbilities {
  strength: string
  speed: string
  defense: string
}

export interface TamikoStoreItem {
  id: number
  name: string
  description: string
  svg: string
  price: number
  creator: string
}
