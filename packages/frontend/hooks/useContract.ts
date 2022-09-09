import { useContract as wagmiUseContract } from 'wagmi';

import contracts from '@/contracts/hardhat_contracts.json';
import { NETWORK_ID } from '@/config';
import { Contract, Signer, providers } from 'ethers';

/**
 * Get Contract class from a name
 * @param name Contract's name
 * @param signer Signer or Provider used to read/write
 * @returns the Contract
 */
export const useContract = (name: string, signer: Signer | providers.Provider | null | undefined): Contract => {
  const chainId = Number(NETWORK_ID);
  const allContracts = contracts as any;
  const address = allContracts[chainId][0].contracts[name].address
  const abi = allContracts[chainId][0].contracts[name].abi

  const contract = wagmiUseContract({
    addressOrName: address,
    contractInterface: abi,
    signerOrProvider: signer,
  });

  return contract
}