import { colors } from "@/utils/foundation/colors"
import { omit } from "lodash"

import { elements, useElementThemeContext } from "@/contexts/ElementTheme"

/**
 * Get and set current type/elenent color stored in ElementThemeContext
 * @returns an array containing getter and setter
 */
export const useElementTheme = (): [string, (color: string) => void] => {
  const { color, setColor } = useElementThemeContext()

  return [color, setColor]
}

/**
 * Set a random element color on ElementThemeContext
 * @returns setter function that accepts an array of colors to omit
 */
export const useRandomElement = (): ((omitColors: string[]) => void) => {
  const [, setColor] = useElementTheme()

  const set = (omitColors: string[]) => {
    const keys = Object.keys(omit(elements, omitColors))
    const random = keys[Math.floor(Math.random() * keys.length)]

    setColor(random)
  }

  return set
}

/**
 * Get current hex color from a specific shade
 * @returns hex color as string
 */
export const useElement = (shade: 400 | 500 | 600 | 700 = 500): string => {
  const [color] = useElementTheme()

  return colors[color][shade]
}
