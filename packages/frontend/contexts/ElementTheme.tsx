import { Box } from "@chakra-ui/react"
import { colors } from "@/utils/foundation/colors"
import { createContext, ReactNode, useContext, useState } from "react"
import { omit } from "lodash"

type Props = {
  children: ReactNode
}

export interface ElementThemeValues {
  color: string
  setColor: (color: string) => void
}

const initialValue: ElementThemeValues = {
  color: "neutral",
  setColor: () => {},
}

const ElementTheme = createContext(initialValue)

export const elements = omit(colors, ["white", "black"])

const ElementThemeProvider = ({ children }: Props) => {
  const [color, setColor] = useState<string>("neutral")

  return (
    <ElementTheme.Provider
      value={{
        color,
        setColor,
      }}
    >
      <Box bg={colors[color][700]}>{children}</Box>
    </ElementTheme.Provider>
  )
}

export default ElementThemeProvider

export const useElementThemeContext = () => {
  return useContext(ElementTheme)
}
