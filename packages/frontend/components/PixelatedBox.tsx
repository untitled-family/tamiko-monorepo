import { ReactNode } from "react"
import { Box } from "@chakra-ui/react"
import { useElement } from "@/hooks"
import { omit } from "lodash"

export type Props = {
  children?: ReactNode
  bg?: string
  p?: string | number
  w?: string | number
  h?: string | number
  my?: string | number
  mx?: string | number
  opacity?: string | number
}

const corners = [
  { id: 0, top: 0, left: 0 },
  { id: 1, top: 0, right: 0 },
  { id: 2, bottom: 0, left: 0 },
  { id: 3, bottom: 0, right: 0 },
]

export const PixelatedBox = ({ children, bg, p, w, h, mx, my, opacity = 0.3 }: Props) => {
  const defaultBg = useElement(600)
  const cornerColor = useElement()

  return (
    <Box
      position="relative"
      bg={bg || defaultBg}
      p={p}
      mx={mx}
      my={my}
      w={w}
      h={h}
      opacity={opacity}
    >
      {corners.map((corner) => (
        <Box
          key={corner.id}
          as="span"
          w="full"
          h="full"
          position="absolute"
          bg={cornerColor}
          width="4px"
          height="4px"
          {...omit(corner, ["id"])}
        />
      ))}
      {children}
    </Box>
  )
}
