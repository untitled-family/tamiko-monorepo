import { useEffect, useState } from "react";
import { useContract } from "./useContract";
import useSigner from "./useSigner";

export const useTokensOwned = (address: string | undefined) => {
  const [signer] = useSigner()
  const [tokens, setTokens] = useState<number[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const tamikoContract = useContract('Tamiko', signer)

  const getTokens = async () => {
    setLoading(true)
    setError(null)
    const tokens: number[] = []

    try {
      const _totalSupply = await tamikoContract.totalSupply()
      const totalSupply = _totalSupply.toNumber()

      if (!totalSupply) return tokens

      for (let index = 0; index < totalSupply; index++) {
        const ownerOf = await tamikoContract.ownerOf(index)

        if (ownerOf === address) {
          tokens.push(index)
        }
      }

      setTokens(tokens)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setError(e)
      console.dir(e)
    }
  }

  useEffect(() => {
    if (signer) getTokens()
  }, [signer])

  return {
    tokens,
    isLoading,
    error
  }
};
