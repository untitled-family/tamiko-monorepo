import { Flex } from "@chakra-ui/react"
import { ReactNode } from "react"

import { useElement } from "@/hooks"

type Props = {
  children: ReactNode
}

export const PhoneWrap = ({ children }: Props) => {
  const bgColor = useElement()
  const textColor = useElement(700)

  return (
    <Flex
      minH="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textTransform="uppercase"
    >
      <Flex
        textColor={textColor}
        bg={bgColor}
        transition="background 0.69s"
        w="full"
        py={2}
        px={4}
        flexDirection="column"
        maxW={375}
        maxH={812}
        h="100svh"
        overflowY="auto"
      >
        {children}
      </Flex>
    </Flex>
  )
}
