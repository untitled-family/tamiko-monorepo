import { colors } from "@/utils/foundation/colors"
import { Box } from "@chakra-ui/react"
import { useElementTheme } from "@/hooks"

export const Switcher = () => {
  const [, setColor] = useElementTheme()

  const switchColor = (color: string) => {
    setColor(color)
  }

  return (
    <Box left={2} top={2} position="absolute" textColor="white">
      {Object.keys(colors).map((element) => (
        <div key={element}>
          <button onClick={() => switchColor(element)}>{element}</button>
        </div>
      ))}
    </Box>
  )
}
