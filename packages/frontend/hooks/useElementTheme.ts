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

  return [elementThemeContext.primary, elementThemeContext.setPrimary];
};

export const useElement = (
  shade: 400 | 500 | 600 | 700 = 500
) => {
  const [primary] = useElementTheme();

  return colors[primary][shade];
};
