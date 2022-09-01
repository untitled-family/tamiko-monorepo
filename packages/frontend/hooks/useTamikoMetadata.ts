import { useEffect, useState } from "react"
import { useContract } from "./useContract"
import useSigner from "./useSigner"

interface Metadata {
  name: string;
  image: string;
}

export const useTamikoMetadata = (tokenId: number | string) => {
  const [signer] = useSigner()
  const [metadata, setMetadata] = useState<Metadata | null>(null)
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

      setMetadata(json)
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
    isLoading,
    error
  }
}