import { useTamikoMetadata } from "@/hooks/useTamikoMetadata"
import { Image } from "@chakra-ui/react"

type Props = {
  tokenId: number | string
}

export default function TamikoImage({ tokenId }: Props) {
  const { metadata } = useTamikoMetadata(tokenId)

  if (metadata) {
    return <Image w='full' src={metadata?.image} alt={metadata?.name} />
  }

  return <div>loading...</div>
}