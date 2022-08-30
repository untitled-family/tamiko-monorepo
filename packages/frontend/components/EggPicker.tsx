import { Box, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import Egg from "./svg/Egg";

const eggs = [0, 1, 2]

type Props = {
  onSelect: (index: number) => void;
};

export default function EggPicker({ onSelect }: Props) {
  const [selected, setSelected] = useState<number | null>(null)

  const select = (index: number) => {
    setSelected(index)
    onSelect(index)
  }

  return (
    <SimpleGrid mx='auto' w='80%' columns={3}>
      {eggs.map(egg => (
        <Box key={egg} onClick={() => select(egg)}>
          <Egg isActive={egg === selected} />
        </Box>
      ))}
    </SimpleGrid>
  )
}