import { Box, keyframes } from "@chakra-ui/react"

const zz = keyframes`
  from { transform: translate(0); }
  to { transform: translateY(3px); }
`

export default function Idle() {
  return (
    <Box
      as="svg"
      mx="auto"
      width="62px"
      viewBox="0 0 19 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="tamiko-sleep">
        <path id="shadow" d="M17 24H0V26H1V27H16V26H17V24Z" fill="#5C5E6D" />
        <path id="base" d="M5 13V14H4V15H3V23H4V24H16V15H14V13H5Z" fill="#B6BDC8" />
        <path
          id="base-shade"
          d="M5 13H4V14H3V15H2V24H4V23H3V15H4V14H5V13Z"
          fill="#5C5E6D"
        />
        <path
          id="face"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 14V15H16V23H7V22H6V20H5V17H6V15H7V14H15ZM9 22V21H11V22H9ZM12 22V21H14V22H12Z"
          fill="white"
        />
        <g id="outline-and-eyes">
          <path d="M11 20H9V21H11V20Z" fill="#14181F" />
          <path d="M12 20H14V21H12V20Z" fill="#14181F" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 12V13H3V14H2V15H1V24H2V25H16V24H17V15H16V14H15V13H14V12H4ZM14 13V14H15V15H16V24H2V15H3V14H4V13H14Z"
            fill="#14181F"
          />
        </g>
        <Box as="g" animation={`${zz} infinite 2s alternate`} id="z1">
          <path d="M19 6V7H18V8H17V7H15V6H19Z" fill="#14181F" />
          <path d="M17 8V9H19V10H15V9H16V8H17Z" fill="#14181F" />
        </Box>
        <Box as="g" animation={`${zz} infinite 2s 0.2s alternate`} id="z2">
          <path d="M13 0V1H12V2H11V1H9V0H13Z" fill="#14181F" />
          <path d="M11 2V3H13V4H9V3H10V2H11Z" fill="#14181F" />
        </Box>
      </g>
    </Box>
  )
}
