import { useElement } from "@/hooks"
import { AspectRatio, Box, Text } from "@chakra-ui/react"
import { omit } from "lodash"
import Link from "next/link"
import { ReactNode } from "react"

type Props = {
  name: string
  href: string
  tokenId?: number
  children?: ReactNode
}

const corners = [
  { id: 0, top: 0, left: 0 },
  { id: 1, top: 0, right: 0 },
  { id: 2, bottom: 0, left: 0 },
  { id: 3, bottom: 0, right: 0 },
]

export default function AppIcon({ name, href, children }: Props) {
  const cornerColor = useElement()

  return (
    <Link href={href}>
      <Box w="full" cursor="pointer">
        <AspectRatio mx="auto" ratio={1}>
          <Box bg="white" position="relative">
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
        </AspectRatio>
        <Text mt={1} textColor="white" fontSize="xs" textAlign="center">
          {name}
        </Text>
      </Box>
    </Link>
  )
}
