import { colors } from "@/utils/foundation/colors";
import { Box } from "@chakra-ui/react";
import { useElementTheme } from "../hooks/useElementTheme";

import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Switcher = () => {
  const [, setColor] = useElementTheme();

  return (
    <Box left={2} top={2} position='absolute' textColor='white.500'>
      <ConnectButton />
      {Object.keys(colors).map((element) => (
        <div key={element}>
          <button onClick={() => setColor(element)}>{element}</button>
        </div>
      ))}
    </Box>
  );
};
