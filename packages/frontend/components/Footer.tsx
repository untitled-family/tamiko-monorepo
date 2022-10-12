import { useElement } from "@/hooks"
import { zIndex } from "@/utils/foundation/zIndex"
import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const Footer = ({ children }: Props) => {
  const bg = useElement()

  return (
    <Box
      bg={bg}
      as="footer"
      pb={2}
      py={4}
      position="sticky"
      bottom={0}
      zIndex={zIndex("footer")}
    >
      {children}
    </Box>
  )
}
