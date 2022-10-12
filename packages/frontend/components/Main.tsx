import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  isCentered?: boolean
  py?: number | string
}

export const Main = ({ children, isCentered = true, py }: Props) => {
  return (
    <Flex
      as="main"
      flex={1}
      alignItems="center"
      justifyContent="center"
      textAlign={isCentered ? "center" : "left"}
      py={py}
    >
      {children}
    </Flex>
  )
}
