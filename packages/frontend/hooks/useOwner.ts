import { useEffect, useState } from "react";
import { useContract } from "./useContract";
import useSigner from "./useSigner";

export const useOwner = (tokenId: number) => {
  const [signer] = useSigner()
  const [owner, setOwner] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const tamikoContract = useContract('Tamiko', signer)

  const getOwner = async () => {
    setLoading(true)
    setError(null)

    try {
      const o = await tamikoContract.ownerOf(tokenId)

      setOwner(o)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setError(e)
      console.dir(e)
    }
  }

  useEffect(() => {
    if (signer) getOwner()
  }, [signer])

  return {
    owner,
    isLoading,
    error
  }
};
