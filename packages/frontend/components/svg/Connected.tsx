import { useElement } from "@/hooks"
import { Box } from "@chakra-ui/react"

export default function Connected() {
  const light = useElement(400)
  const normal = useElement()
  const dark = useElement(600)
  const darker = useElement(700)

  return (
    <Box as='svg' m='auto' width="62px" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="tamiko">
        <path id="shadow" d="M17 12H0V14H1V15H16V14H17V12Z" fill={dark} />
        <path id="base" d="M5 1V2H4V3H3V11H4V12H16V3H14V1H5Z" fill={normal} />
        <path id="base-shade" d="M5 1H4V2H3V3H2V12H4V11H3V3H4V2H5V1Z" fill={dark} />
        <path id="face" fill-rule="evenodd" clip-rule="evenodd" d="M15 2V3H16V11H7V10H6V8H5V5H6V3H7V2H15ZM9 10V9H11V10H9ZM12 10V9H14V10H12Z" fill={light} />
        <g id="outline-and-eyes">
          <path d="M11 5H9V9H11V5Z" fill={darker} />
          <path d="M12 5H14V9H12V5Z" fill={darker} />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0V1H3V2H2V3H1V12H2V13H16V12H17V3H16V2H15V1H14V0H4ZM14 1V2H15V3H16V12H2V3H3V2H4V1H14Z" fill={darker} />
        </g>
      </g>
    </Box>
  )
}