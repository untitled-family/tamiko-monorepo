import { toastError } from "@/utils/error";
import { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { useContract } from "./useContract";

type Owner = {
  owner: string;
  isLoading: boolean;
}

/**
 * Fetch owner address of a specific tokenId
 * @param tokenId Tamiko's tokenID 
 * @returns Object containing the owner address and loading status
 */
export const useOwner = (tokenId: number): Owner => {
  const provider = useProvider()
  const [owner, setOwner] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const tamikoContract = useContract('Tamiko', provider)

  const getOwner = async () => {
    setLoading(true)

    try {
      const o = await tamikoContract.ownerOf(tokenId)

      setOwner(o)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      toastError(e)
    }
  }

  useEffect(() => {
    if (provider) getOwner()
  }, [provider])

  return {
    owner,
    isLoading
  }
};
