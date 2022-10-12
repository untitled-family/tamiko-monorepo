import { withSkeleton } from "@/hoc"
import { Text } from "@chakra-ui/react"

type Props = {
  tokenId: number | string | undefined
}

const TamikoNameComponent = ({ tokenId }: Props) => {
  return <Text fontSize="lg">Tamiko: #{tokenId}</Text>
}

export const TamikoName = withSkeleton(TamikoNameComponent)
