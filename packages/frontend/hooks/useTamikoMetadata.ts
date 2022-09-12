import { toastError } from "@/utils/error";
import { attributesToObject, extractAttributes } from "@/utils/metadata";
import { useEffect, useState } from "react"
import { useProvider } from "wagmi";
import { useContract } from "./useContract"

export type Metadata = {
  name: string;
  image: string;
  attributes: Attribute[]
}

export type Attribute = {
  trait_type: string;
  value: string;
}

export type Property = {
  hatchStatus: string;
  level: string;
  hatchDate: string;
  lastFed: string;
}

type TamikoMetadata = {
  metadata: Metadata | null; // Raw metadata object returned by contract
  abilities: Attribute[] | []; // Set of abilities attributes: speed, power and defense
  properties: Property | null; // Set of variables that are not necessarily in metadata.attributes
  refresh: () => void; // Method to re-fetch from contract
  isLoading: boolean // true when fetching from the contract - default `false`
}

/**
 * Fetch metadata of a specific Tamiko
 * Metadata are split into categories (abilities, properties) to easily use info across specific sections
 * @param tokenId Tamiko's tokenID
 * @returns {TamikoMetadata} Object containing metadata in raw and clean format as well as refresh func to refetch
 */
export const useTamikoMetadata = (tokenId: number): TamikoMetadata => {
  const provider = useProvider()
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [abilities, setAbilities] = useState<Attribute[] | []>([])
  const [properties, setProperties] = useState<Property | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const tamikoContract = useContract('Tamiko', provider)

  const getMetadata = async () => {
    setLoading(true)

    try {
      const tokenURI = await tamikoContract.tokenURI(tokenId)

      const base64 = tokenURI.replace('data:application/json;base64,', '');
      const string = atob(base64);
      const json = JSON.parse(string);
      const abilities: (Attribute)[] = extractAttributes(json.attributes, ['speed', 'power', 'defense'])

      setMetadata(json)
      setAbilities(abilities)
      setProperties(attributesToObject(json.properties))
      setLoading(false)
    } catch (e) {
      toastError(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (provider && !isNaN(tokenId)) getMetadata()
  }, [provider, tokenId])

  useEffect(() => {
    if (isNaN(tokenId)) {
      setLoading(true)
    }
  }, [tokenId])

  return {
    metadata,
    abilities,
    properties,
    refresh: getMetadata,
    isLoading
  }
}