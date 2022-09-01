import { useTamikoMetadata } from "@/hooks/useTamikoMetadata"

type Props = {
  tokenId: number
}

export default function TamikoImage({ tokenId }: Props) {
  const { metadata } = useTamikoMetadata(tokenId)

  if (metadata) {
    return <img src={metadata?.image} alt={metadata?.name} />
  }

  return <div>loading...</div>
}