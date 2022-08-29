import { Box } from "@chakra-ui/react";
import { colors } from "@/utils/foundation/colors";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

export interface IState {
  primary: string;
  setPrimary: Dispatch<SetStateAction<string>> | undefined;
}

const initialValue: IState = {
  primary: "neutral",
  setPrimary: undefined,
};

export const ElementTheme = createContext(initialValue);

const ElementThemeProvider = ({ children }: Props) => {
  const [primary, setPrimary] = useState("neutral");

  return (
    <ElementTheme.Provider
      value={{
        primary,
        setPrimary,
      }}
    >
      <Box bg={colors[primary][700]}>{children}</Box>
    </ElementTheme.Provider >
  );
};

export default ElementThemeProvider;
