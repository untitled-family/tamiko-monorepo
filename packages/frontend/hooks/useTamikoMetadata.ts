import { TamikoMetadataHook } from "@/types/hooks"
import {
  Attribute,
  TamikoAbilities,
  TamikoMetadata,
  TamikoProperties,
} from "@/types/metadata"
import { toastError } from "@/utils/error"
import { attributesToObject, extractAttributes } from "@/utils/metadata"
import { useEffect, useState } from "react"
import { useProvider } from "wagmi"
import { useContract } from "./useContract"
import { useTamikoProvider } from "./useTamikoProvider"

/**
 * Fetch metadata of a specific Tamiko
 * Metadata are split into categories (abilities, properties) to easily use info across specific sections
 * @param tokenId Tamiko's tokenID
 * @returns {TamikoMetadata} Object containing metadata in raw and clean format as well as refresh func to refetch
 */
export const useTamikoMetadata = (tokenId: number): TamikoMetadataHook => {
  const provider = useProvider()
  const [isLoading, setLoading] = useState<boolean>(false)
  const tamikoContract = useContract("Tamiko", provider)
  const { updateTamiko, getTamikoById } = useTamikoProvider()
  const tamiko = getTamikoById(tokenId)

  const getMetadata = async () => {
    setLoading(true)

    try {
      const tokenURI = await tamikoContract.tokenURI(tokenId)

      const base64 = tokenURI.replace("data:application/json;base64,", "")
      const string = atob(base64)
      const json = JSON.parse(string)
      const abilities: Attribute[] = extractAttributes(json.attributes, [
        "speed",
        "power",
        "defense",
      ])

      updateTamiko({
        id: tokenId,
        metadata: {
          image: json.image,
          name: json.name,
          attributes: json.attributes,
        },
        properties: attributesToObject(json.properties) as TamikoProperties,
        abilities: attributesToObject(abilities) as TamikoAbilities,
      })

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
    metadata: tamiko ? tamiko.metadata : null,
    abilities: tamiko ? tamiko.abilities : null,
    properties: tamiko ? tamiko.properties : null,
    refresh: getMetadata,
    isLoading,
  }
}
