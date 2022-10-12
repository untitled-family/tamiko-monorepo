import { SignerType, useMainContext } from "@/contexts/Provider"

/**
 * Get and set current signer stored in MainContext
 * @returns an array containing getter and setter
 */
export const useSigner = (): [SignerType, (signer: any) => void] => {
  const { signer, setSigner } = useMainContext()

  return [signer, setSigner]
}
