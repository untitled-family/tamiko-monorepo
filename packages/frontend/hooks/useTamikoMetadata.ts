import { attributesToObject, extractAttributes } from "@/utils/metadata";
import { useEffect, useState } from "react"
import { useContract } from "./useContract"
import useSigner from "./useSigner"

type Metadata = {
  name: string;
  image: string;
}

type Attribute = {
  trait_type: string;
  value: string;
}

type Property = {
  hatchStatus: string,
  level: string,
  hatchDate: string,
  lastFed: string
}

export const useTamikoMetadata = (tokenId: number | string) => {
  const [signer] = useSigner()
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [abilities, setAbilities] = useState<Attribute[] | null>([])
  const [properties, setProperties] = useState<Property | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const tamikoContract = useContract('Tamiko', signer)

  const getMetadata = async () => {
    setLoading(true)
    setError(null)

    try {
      const tokenURI = await tamikoContract.tokenURI(tokenId)

      const base64 = tokenURI.replace('data:application/json;base64,', '');
      const string = atob(base64);
      const json = JSON.parse(string);
      const abilities = extractAttributes(json.attributes, ['speed', 'power', 'defense'])

      setMetadata(json)
      // @ts-ignore
      setAbilities(abilities)
      // @ts-ignore
      setProperties(attributesToObject(json.properties))
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setError(e)
    }
  }

  useEffect(() => {
    if (signer) getMetadata()
  }, [signer])

  return {
    metadata,
    abilities,
    properties,
    refresh: getMetadata,
    isLoading,
    error
  }
}