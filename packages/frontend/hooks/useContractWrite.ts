import { useContractWrite as wagmiUseContractWrite, usePrepareContractWrite } from "wagmi"

import contracts from "@/contracts/hardhat_contracts.json"
import { NETWORK_ID } from "@/config"

/**
 * Call state-changing method on a contract
 * @param name Contract's name
 * @param args Contract's method arguments
 * @param overrides Overrides arguments
 * @returns the Contract
 */
export const useContractWrite = (
  name: string,
  functionName: string,
  args: any,
  overrides: any
) => {
  const chainId = Number(NETWORK_ID)
  const allContracts = contracts as any
  const address = allContracts[chainId][0].contracts[name].address
  const abi = allContracts[chainId][0].contracts[name].abi

  const { config } = usePrepareContractWrite({
    addressOrName: address,
    contractInterface: abi,
    functionName,
    args,
    overrides,
  })

  return wagmiUseContractWrite(config)
}
