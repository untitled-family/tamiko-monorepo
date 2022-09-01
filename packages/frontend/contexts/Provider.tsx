import React, { createContext, ReactNode, useContext, useState } from 'react'

type Props = {
  children: ReactNode;
};

export interface IState {
  signer: any;
  setSigner: (signer: any) => void;
}

const initialValue: IState = {
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