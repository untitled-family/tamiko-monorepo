import { useContract } from "@/hooks/useContract"
import useSigner from "@/hooks/useSigner"
import { useTamikoMetadata } from "@/hooks/useTamikoMetadata"
import { toastError } from "@/utils/error";
import { useState } from "react"
import { Button } from "../Button"

type Props = {
  tokenId: number | string
}

export default function TamikoHatch({ tokenId }: Props) {
  const { properties } = useTamikoMetadata(tokenId)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [signer] = useSigner()
  const tamikoContract = useContract('Tamiko', signer)

  const hatch = async () => {
    setLoading(true)

    try {
      const tx = await tamikoContract.startHatchingProcess(tokenId)
      await tx.wait()

      setLoading(false)
    } catch (e) {
      toastError(e)
      setLoading(false)
    }
  }

  if (properties?.hatchStatus && parseInt(properties?.hatchStatus)) return <></>

  return <Button onClick={hatch} isLoading={isLoading}>Hatch</Button>
}