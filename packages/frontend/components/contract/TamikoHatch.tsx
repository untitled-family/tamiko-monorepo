import { TIMINGS } from "@/config";
import { useElement } from "@/hooks";
import { useContract } from "@/hooks/useContract"
import { usePercentageCountdown } from "@/hooks/usePercentageCountdown";
import useSigner from "@/hooks/useSigner"
import { Property } from "@/hooks/useTamikoMetadata"
import { toastError } from "@/utils/error";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import { Button } from "../Button"

type Props = {
  tokenId: number
  properties: Property | null,
  onHatch: () => void
}

export default function TamikoHatch({ properties, tokenId, onHatch }: Props) {
  const light = useElement(400)
  const normal = useElement(600)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [signer] = useSigner()
  const tamikoContract = useContract('Tamiko', signer)
  const isHatching = parseInt(properties?.hatchStatus as string) === 1
  const { timer, startTimer } = usePercentageCountdown(
    (parseInt(properties?.hatchDate as string) * 1000),
    TIMINGS.TIME_TO_HATCH,
    onHatch
  )

  useEffect(() => {
    if (properties?.hatchDate && parseInt(properties?.hatchDate as string)) {
      startTimer()
    }
  }, [properties?.hatchDate])

  const hatch = async () => {
    setLoading(true)

    try {
      const tx = await tamikoContract.startHatchingProcess(tokenId)
      await tx.wait()
      onHatch()
      setLoading(false)
    } catch (e) {
      toastError(e)
      setLoading(false)
    }
  }

  return (
    <Box my={6}>
      <Box mb={2} position='relative' w='full' h='6px' bg={light}>
        <Box w={`${timer}%`} height='full' position='absolute' top={0} left={0} bg={normal} />
      </Box>
      <Button onClick={hatch} isLoading={isLoading || isHatching} disabled={isHatching}>Begin hatching</Button>
    </Box>
  )
}