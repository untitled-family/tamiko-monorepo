import { colors } from "@/utils/foundation/colors";
import { useContext } from "react";

import { ElementTheme } from "../contexts/ElementTheme";

export const useElementTheme = () => {
  const elementThemeContext = useContext(ElementTheme);

  if (!elementThemeContext) {
    throw new Error(
      "elementThemeContext must be used within the ElementThemeProvider"
    );
  }

  return [elementThemeContext.color, elementThemeContext.setColor];
};

export const useElement = (
  shade: 400 | 500 | 600 | 700 = 500
) => {
  const [color] = useElementTheme();

  // @ts-ignore
  return colors[color][shade];
};
