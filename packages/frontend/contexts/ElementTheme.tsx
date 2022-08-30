import { Box } from "@chakra-ui/react";
import { colors } from "@/utils/foundation/colors";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { omit } from "lodash";

type Props = {
  children: ReactNode;
};

export interface IState {
  color: string;
  setColor: (color: string) => void;
}

const initialValue: IState = {
  color: "neutral",
  setColor: () => { },
};

export const ElementTheme = createContext(initialValue);

export const elements = omit(colors, ['white', 'black'])

const ElementThemeProvider = ({ children }: Props) => {
  const [color, setColor] = useState("neutral");

  return (
    <ElementTheme.Provider
      value={{
        color,
        setColor,
      }}
    >
      <Box bg={colors[color][700]}>{children}</Box>
    </ElementTheme.Provider >
  );
};

export default ElementThemeProvider;
