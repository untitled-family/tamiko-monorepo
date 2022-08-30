import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { omit } from 'lodash'

import { useElement } from "../hooks/useElementTheme";

type Props = {
  children: ReactNode;
  isGhost?: boolean;
  onClick?: () => void;
};

const corners = [
  { id: 0, top: 0, left: 0 },
  { id: 1, top: 0, right: 0 },
  { id: 2, bottom: 0, left: 0 },
  { id: 3, bottom: 0, right: 0 }
];

export const Button = ({
  children,
  isGhost = false,
  onClick,
  ...rest
}: Props) => {
  const bgColor = useElement(700);
  const cornerColor = useElement();

  return (
    <Box
      as='button'
      bg={isGhost ? 'transparent' : bgColor}
      textColor={isGhost ? 'black.500' : 'white.500'}
      position='relative'
      p={4}
      fontSize='lg'
      textTransform='uppercase'
      w='full'
      onClick={onClick}
      {...rest}
    >
      {!isGhost &&
        corners.map((corner) => (
          <Box
            key={corner.id}
            as='span'
            w='full'
            h='full'
            position='absolute'
            bg={cornerColor}
            width='4px'
            height='4px'
            {...omit(corner, ['id'])}
          />
        ))}
      {children}
    </Box>
  );
};
