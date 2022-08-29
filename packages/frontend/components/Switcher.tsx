import { colors } from "@/utils/foundation/colors";
import { Box } from "@chakra-ui/react";
import { useElementTheme } from "../hooks/useElementTheme";

export const Switcher = () => {
  const [, setColor] = useElementTheme();

  return (
    <Box left={2} top={2} position='absolute'>
      {Object.keys(colors).map((element) => (
        <div key={element}>
          <button onClick={() => setColor(element)}>{element}</button>
        </div>
      ))}
    </Box>
  );
};
