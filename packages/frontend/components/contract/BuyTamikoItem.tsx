import { useContract, useContractWrite } from "@/hooks"
import { toastError } from "@/utils/error"
import { useState } from "react"
import { useAccount, useSigner } from "wagmi"
import { Button } from "../Button"

type Props = {
  name: string,
  itemId: number,
  price: number,
  quantity?: number
}

export const BuyTamikoItem = ({ itemId, quantity = 1, name, price }: Props) => {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { data, write, isLoading } = useContractWrite(
    'TamikoStore',
    'buyItem',
    [quantity, itemId, address],
    {
      value: price
    }
  )
  const isDisabled = !address || !signer || !write

  return (
    <Button
      onClick={write}
      disabled={isDisabled}
      isLoading={isLoading}
    >Buy {name}</Button>
  )
}