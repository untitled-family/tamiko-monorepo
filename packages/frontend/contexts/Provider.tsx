import { Signer, providers } from 'ethers';
import React, { createContext, ReactNode, useContext, useState } from 'react'

type Props = {
  children: ReactNode;
};

export type SignerType = Signer | providers.Provider | null | undefined

export interface ProviderValue {
  signer: SignerType;
  setSigner: (signer: any) => void;
}

const initialValue: ProviderValue = {
  signer: null,
  setSigner: () => { },
};

const MainContext = createContext(initialValue)

const Provider = ({ children }: Props) => {
  const [signer, setSigner] = useState<any>(null)

  return (
    <MainContext.Provider value={{
      signer,
      setSigner
    }}>
      {children}
    </MainContext.Provider>
  )
}

export default Provider

export const useMainContext = () => {
  return useContext(MainContext)
}