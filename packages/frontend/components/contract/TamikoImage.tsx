import { useTamikoMetadata } from "@/hooks/useTamikoMetadata"
import { Image } from "@chakra-ui/react"

type Props = {
  tokenId: number,
  hasHatched?: boolean
}

export const TamikoImage = ({ tokenId, hasHatched }: Props) => {
  const { metadata } = useTamikoMetadata(tokenId)

  if (metadata) {
    return <Image key={hasHatched ? 'hatched' : 'egg'} w='full' src={metadata?.image} alt={metadata?.name} />
  }

  return <div>loading...</div>
}