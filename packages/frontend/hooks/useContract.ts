import { useContract as wagmiUseContract } from 'wagmi';

import contracts from '@/contracts/hardhat_contracts.json';
import { NETWORK_ID } from '@/config';

export const useContract = (name: string, signer: any) => {
  const chainId = Number(5);
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