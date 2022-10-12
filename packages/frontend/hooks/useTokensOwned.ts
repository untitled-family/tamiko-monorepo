import { toastError } from "@/utils/error"
import { Contract } from "ethers"
import { useEffect, useState } from "react"
import { useContract } from "./useContract"
import { useSigner } from "./useSigner"

interface TokensOwned {
  tokens: number[]
  isLoading: boolean
}

/**
 * Fetch tokenIds of owned by an address
 * @param address
 * @returns Object containing an array of tokenIDs as well as loading status
 */
export const useTokensOwned = (address: string | undefined): TokensOwned => {
  const [signer] = useSigner()
  const [tokens, setTokens] = useState<number[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const tamikoContract: Contract = useContract("Tamiko", signer)

  const getTokens = async () => {
    setLoading(true)
    const tokens: number[] = []

    try {
      const _totalSupply = await tamikoContract.totalSupply()
      const totalSupply = _totalSupply.toNumber()

      if (!totalSupply) return tokens

      for (let index: number = 0; index < totalSupply; index++) {
        const ownerOf = await tamikoContract.ownerOf(index)

        if (ownerOf === address) {
          tokens.push(index)
        }
      }

      setTokens(tokens)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      toastError(e)
    }
  }

  useEffect(() => {
    if (signer) getTokens()
  }, [signer])

  return {
    tokens,
    isLoading,
  }
}
