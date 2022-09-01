import { colors } from "@/utils/foundation/colors";
import { omit } from "lodash";
import { useContext } from "react";

import { elements, ElementTheme } from "../contexts/ElementTheme";

export const useElementTheme = () => {
  const elementThemeContext = useContext(ElementTheme);

  if (!elementThemeContext) {
    throw new Error(
      "elementThemeContext must be used within the ElementThemeProvider"
    );
  }

  return [elementThemeContext.color, elementThemeContext.setColor];
};

export const useRandomElement = () => {
  const [, setColor] = useElementTheme()

  const set = (omitColors: string[]) => {
    const keys = Object.keys(omit(elements, omitColors))
    const random = keys[Math.floor(Math.random() * keys.length)]

    // @ts-ignore
    setColor(random)
  }

  return set
}

export const useElement = (
  shade: 400 | 500 | 600 | 700 = 500
) => {
  const [color] = useElementTheme();

  // @ts-ignore
  return colors[color][shade];
};
